/* eslint-disable import/no-webpack-loader-syntax */
// @ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "!mapbox-gl";
import { useContext, useEffect, useReducer } from "react";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";
import { PlacesContext } from "../places/PlacesContext";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[]
}

const INITIAL_STATE = {
  isMapReady: false,
  map: undefined,
  markers: []
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext)
  
  useEffect(() => {
    state.markers.forEach(marker => marker.remove());

    const newMarkers: Marker[] = []

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup()
      .setHTML(`
        <div class="card" >
          <div class="card-body">
            <h6>${place.text_es}</h6>
            <p>${place.place_name_es}</p>
          </div>
        </div>
      `)

      const newMarker = new Marker()
      .setPopup(popup)
      .setLngLat([lng, lat])
      .addTo(state.map!)

      newMarkers.push(newMarker)
    }
    dispatch({
      type: "setMarkers",
      payload: newMarkers
    })

  }, [places])

  const setMap = (map: Map) => {

    const myPopup = new Popup()
    .setHTML(`
      <h4>Here</h4>
      <p>Estoy justo aquí!</p>
    `)

    new Marker()
    .setLngLat(map.getCenter())
    .setPopup(myPopup)
    .addTo(map)

    dispatch({
      type: "setMap",
      payload: map,
    });
  };

  const getRouteBtwPoints = async(start: [number, number], end: [number, number]) => {
    const response = await directionsApi.get<DirectionsResponse>(`/${start.join(",")};${end.join(",")}`)

    if(response.data.routes.length === 0) {
      alert("Recorrido no disponible")
      return
    }

    const { geometry } = response.data.routes[0];

    const {coordinates: coords} = geometry

    const bounds = new LngLatBounds(start, start)

    for (const coord of coords) {
      const [lng, lat] = coord
      bounds.extend([lng, lat])
    }

    state.map?.fitBounds(bounds, {
      padding: window.innerWidth / 5
    });

    if(state.map?.getLayer("RouteString")){
      state.map.removeLayer("RouteString");
      state.map.removeSource("RouteString");
    }

    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry :{
              type: "LineString",
              coordinates: coords
            }
          }
        ]
      }
    }

    state.map?.addSource("RouteString", sourceData)

    state.map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": "black",
        "line-width": 3
      }
    })
    
  }

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap,
        getRouteBtwPoints
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

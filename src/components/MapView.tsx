/* eslint-disable import/no-webpack-loader-syntax */
// @ts-ignore
import mapboxgl from "!mapbox-gl";
import React, { useContext, useLayoutEffect, useRef } from "react";
import { MapContext, PlacesContext } from "../context";
import { Loading } from "./";

export const MapView = () => {
  const { userLocation, isLoading } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapDiv = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if(isLoading) return

    const map = new mapboxgl.Map({
      container: mapDiv.current!, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: userLocation, // starting position [lng, lat]
      zoom: 10, // starting zoom
      projection: {name: 'globe'} // display the map as a 3D globe
    });

    setMap(map)


  }, [isLoading])

  if (isLoading){
      return (
          <Loading/>
      )
  }

  return (
    <div ref={mapDiv} style={{
      position: "fixed",
      top: 0,
      right: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.842)"
    }} >
      
    </div>
  );
};

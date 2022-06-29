import { useEffect, useReducer } from "react";
import { searchApi } from "../../apis";
import { getUserLocation } from "../../helpers";
import { Feature, PlacesResponse } from "../../interfaces/places";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isPlacesLoading: boolean;
  places: Feature[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isPlacesLoading: false,
  places: []
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation()
    .then((res: [number, number]) => {
        dispatch({type: "setUserLocation", payload: res})
    })
  }, [])

  const searchPlaces = async(query: string): Promise<Feature[]> => {
    dispatch({ type: "setLoadingPlaces" })
    if(query.length === 0) {
      dispatch({
        type: "setPlaces",
        payload: []
      })
      return []
    }
    if(!state.userLocation) throw new Error("No hay ubicación del usuario")

    const response = await searchApi.get<PlacesResponse>(`${query}.json`, {
      params: {
        proximity: state.userLocation.join(",")
      }
    })

    dispatch({
      type: "setPlaces",
      payload: response.data.features
    })
    return response.data.features
  }

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        searchPlaces
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

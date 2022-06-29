import { createContext } from "react";
import { Feature } from "../../interfaces/places";

export interface PlacesContextProps {
    isLoading: boolean;
    userLocation?: [number, number];
    isPlacesLoading: boolean;
    places: Feature[];
    searchPlaces: (query: string) => Promise<Feature[]>;
}

export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps);
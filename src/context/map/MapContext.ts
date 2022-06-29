/* eslint-disable import/no-webpack-loader-syntax */
// @ts-ignore
import { Map } from "!mapbox-gl";
import { createContext } from "react";


interface MapContextProps {
    isMapReady: boolean;
    map?: Map;

    //methods
    setMap: (map: Map) => void;
    getRouteBtwPoints: (start: [number, number], end: [number, number]) => Promise<void>
}

export const MapContext = createContext<MapContextProps>({} as MapContextProps )
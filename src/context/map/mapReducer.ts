/* eslint-disable import/no-webpack-loader-syntax */
// @ts-ignore
import { Map, Marker } from "!mapbox-gl";
import { MapState } from "./MapProvider";

type MapActions = 
| { type: "setMap", payload: Map }
| { type: "setMarkers", payload: Marker[] }

export const mapReducer = (state: MapState, action: MapActions): MapState => {
    switch (action.type) {
        case "setMap":
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            }

        case "setMarkers":
            return {
                ...state,
                markers: action.payload
            }
    
        default:
            return state
    }
}
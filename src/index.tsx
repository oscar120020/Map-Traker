/* eslint-disable import/no-webpack-loader-syntax */
// @ts-ignore
import mapboxgl from '!mapbox-gl';
import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles.css"
import { MapApp } from './MapApp';
 
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API || "";

if(!navigator.geolocation){
  alert("Tu navegador no tiene opción de geolocalización")
  throw new Error("Tu navegador no tiene opción de geolocalización")
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapApp />
  </React.StrictMode>
);


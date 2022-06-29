import React, { useContext } from "react";
import { MapContext, PlacesContext } from "../context";

export const BtnMyLocatin = () => {
  const { userLocation } = useContext(PlacesContext);
  const { isMapReady, map } = useContext(MapContext);

  const handleClick = () => {
    if (!isMapReady) throw new Error("El mapa no está listo");
    if (!userLocation) throw new Error("No hay ubicación de usuario");

    map?.flyTo({
        center: userLocation,
        zoom: 15
    })
  };

  return (
    <button
      className="btn btn-primary btn-sm"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 500,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      Mi ubicación
    </button>
  );
};

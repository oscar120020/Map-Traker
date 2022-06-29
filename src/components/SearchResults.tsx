import { useContext } from "react";
import { MapContext, PlacesContext } from "../context";
import { Feature } from "../interfaces/places";

interface Props {
  place: Feature;
  activePlace: string;
  handleActiveplace: (id: string) => void;
}

export const SearchResults = ({ place, handleActiveplace, activePlace }: Props) => {
  const { map, getRouteBtwPoints } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const handleClick = () => {
    const [lng, lat] = place.center

    map?.flyTo({
      center: [lng, lat],
      zoom: 18
    })

    handleActiveplace(place.id)
  }

  const getRoute = () => {
    if(!userLocation) return
    const [lng, lat] = place.center
    getRouteBtwPoints(userLocation, [lng, lat])
  } 

  return (
    <li onClick={handleClick} style={{cursor: "pointer"}} className={`list-group-item list-group-item-action ${activePlace === place.id ? "active": ""}`}>
      <h6>{ place.text_es }</h6>
      <p
        className={activePlace === place.id ? "": "text-muted"}
        style={{
          fontSize: "12px",
        }}
      >
        {place.place_name_es}
      </p>

      <button onClick={getRoute} className={`btn btn-sm ${activePlace === place.id ? "btn-outline-light": "btn-outline-primary"}`}>Direcciones</button>
    </li>
  );
};

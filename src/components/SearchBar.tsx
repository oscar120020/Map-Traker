import { ChangeEvent, useContext, useRef, useState } from "react";
import { PlacesContext } from "../context";
import { Feature } from "../interfaces/places";
import { SearchResults, LoadingPlaces } from "./";
import left from '../assets/left-arrow.png'
import right from '../assets/right-arrow.png'

export const SearchBar = () => {
  const { searchPlaces, isPlacesLoading, places } = useContext(PlacesContext);
  const timeAwait = useRef<NodeJS.Timer>();
  const [activePlace, setActivePlace] = useState("");
  const [hideSearchBox, setHideSearchBox] = useState(false)

  const handleActiveplace = (id: string) => {
    setActivePlace(id);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearInterval(timeAwait.current);
    timeAwait.current = setInterval(() => {
      searchPlaces(event.target.value);
      clearInterval(timeAwait.current);
    }, 400);
  };

  return (
    <div className={`search-container ${hideSearchBox ? "hide-box" : ""} `}>
      <input
        type="text"
        className="form-control"
        placeholder="search bar"
        onChange={handleChange}
      />
      {places.length > 0 && (
        <>
          {isPlacesLoading ? (
            <LoadingPlaces />
          ) : (
            <ul className="list-group mt-3 ul-box">
              {places.map((place: Feature) => (
                <SearchResults
                  key={place.id}
                  place={place}
                  handleActiveplace={handleActiveplace}
                  activePlace={activePlace}
                />
              ))}
            </ul>
          )}
        </>
      )}
      <div className="button-container" onClick={() => setHideSearchBox(!hideSearchBox)} >
        {
          hideSearchBox
          ? <img className="go-back" src={right} alt="go back" />
          : <img className="go-back" src={left} alt="go back" />
        }
      </div>
    </div>
  );
};

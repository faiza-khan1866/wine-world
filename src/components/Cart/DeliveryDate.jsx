import { useRef, useState } from "react";
import MapView from "./Map";
const DeliveryDate = () => {
  const [dDate, setDDate] = useState("1-5");
  const [distance, setDistance] = useState("Calculating Distance...");

  const inputRef = useRef();
  const inputStyle = {
    boxShadow: "inset 0 0 10px #eee !important",
    border: "2px solid #eee",
    width: "100%",
    height: "40px",
    margin: "0.5rem 0 1rem 0",
    borderRadius: "20px",
    fontWeight: "300 !important",
    outline: "none",
    padding: "10px 20px",
  };

  const autoComplete = new window.google.maps.places.Autocomplete(
    inputRef.current
  );

  autoComplete.addListener("place_changed", () => {
    const place = autoComplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      alert("this location not available");
    }
    if (place.geometry.viewport || place.geometry.location) {
      // do something
      console.log(place.geometry.location);
    }
  });

  return (
    <>
      <div className="oder-total-div mt-4" data-aos="fade-up">
        <h2> Delivery Date </h2>
        <hr />
        <div className="price-table">
          <p className="price-am">
            Date <span> {dDate} </span>
          </p>
          <p className="delivery-am">
            Distance{" "}
            <span>
              <a href="#">{distance}</a>
            </span>
          </p>
          <div className="destination-input">
            <div className="form-group">
              <label>Location</label>
              <input
                placeholder="Enter Your Location."
                ref={inputRef}
                style={inputStyle}
                className="form-control"
              />
            </div>
            <MapView />
          </div>
        </div>
      </div>
    </>
  );
};
export default DeliveryDate;

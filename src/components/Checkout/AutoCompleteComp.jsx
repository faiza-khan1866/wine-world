import React, { useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
// import Axios from "axios";
// import { Form } from "react-bootstrap";
// import { GrPowerReset } from "react-icons/gr";
import geocoder from "google-geocoder";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const containerStyle = {
  width: "100%",
  height: "400px",
};
const center = {
  lat: 24.4214603,
  lng: 54.4564142,
};

const restrictions = {
  country: "ae",
};

const optionsAutoComp = {
  strictBounds: true,
};
var geo = geocoder({
  key: process.env.REACT_APP_GOOGLE,
});

function AutoCompleteComp({
  handleInputAddressChange,
  loadingSearch,
  handleSubmit,
}) {
  const [position, setPosition] = useState(center);
  /** @type React.MutableRefObject<HTMLInputElement> */
  const distRef = useRef();
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [distPosition, setdistPosition] = useState({ lat: null, lng: null });
  const bannerLocation = useSelector((state) => state?.cart?.bannerLocation);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE,
    libraries: ["places"],
  });
  if (!isLoaded) {
    return "loading...";
  }
  const resetLoc = () => {
    let query = document.querySelector("#address_line1");
    query.value = "";
    setPosition(center);
    map.panTo(center);
    map.setZoom(12);
  };
  const checkAddress = async () => {
    if (distRef.current.value === "") {
      return;
    }
    let address = distRef.current.value;
    let Formataddress = address.replace(/\s+/g, "+").toLocaleLowerCase();
    await geo.find(address, function (err, res) {
      if (res[0]) {
        if (res[0]?.locality?.long_name !== "Abu Dhabi") {
          toast.warn("Delivery is Availabe in Abu Dabhi Region only", {
            autoClose: 3000,
            theme: "dark",
          });
          distRef.current.value = "";
          return;
        }
        setPosition(res[0]?.location);
        setdistPosition(res[0]?.location);
        handleInputAddressChange(address, res[0]?.location);
      }
      // process error object
    });
    // Axios.get(
    //   `https://maps.googleapis.com/maps/api/geocode/json?address=${Formataddress}&key=${process.env.REACT_APP_GOOGLE}`,
    //   {
    //     headers: {
    //       "Cache-Control": "public",
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Credentials": true,
    //       Vary: origin,
    //       withCredentials: true,
    //       "Access-Control-Allow-Headers": "Authorization",
    //       "Access-Control-Request-Method": "GET",
    //       Expires: "100000",
    //     },
    //   }
    // )
    //   .then((res) => {
    //     setPosition(res?.data?.results[0]?.geometry?.location);
    //     setdistPosition(res?.data?.results[0]?.geometry?.location);
    //     map.panTo(res?.data?.results[0]?.geometry?.location);
    //     map.setZoom(15);
    //   })
    //   .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="col-lg-12">
        <Autocomplete
          restrictions={restrictions}
          options={optionsAutoComp}
          onPlaceChanged={(place) => {
            checkAddress();
          }}
        >
          <div class="px-2 input-group">
            <input
              name="address_line1"
              placeholder="Enter Your Location"
              type="text"
              class="form-control"
              ref={distRef}
              defaultValue={bannerLocation?.address_line1}
            />
            <span class="input-group-text" onClick={handleSubmit}>
              {loadingSearch ? "Searching..." : "Search"}
            </span>
          </div>
        </Autocomplete>
      </div>
      {/* <div className="col-lg-12">
        <Form.Group controlId="address_line2" className="mb-3">
          <Form.Control
            type="text"
            name="address_line2"
            value={formValues?.address_line2}
            onChange={handleInputChange}
          />
        </Form.Group>
      </div> */}
    </>
  );
}

export default AutoCompleteComp;

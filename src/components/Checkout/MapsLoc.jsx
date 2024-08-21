import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import Axios from "axios";
import { Form } from "react-bootstrap";
import { GrPowerReset } from "react-icons/gr";
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
  // location: "24.453884, 54.3773438",
  // radius: "550000",
};

const optionsAutoComp = {
  strictBounds: true,
};

const options = {
  zoomControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};
var geo = geocoder({
  key: process.env.REACT_APP_GOOGLE,
});

function MapsLoc({
  handleInputAddressChange,
  handleInputChange,
  formValues,
  value,
}) {
  const [position, setPosition] = useState(center);
  /** @type React.MutableRefObject<HTMLInputElement> */
  const distRef = useRef();
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [distPosition, setdistPosition] = useState({ lat: null, lng: null });
  const [zoom, setZoom] = useState(13.1);
  const bannerLocation = useSelector((state) => state?.cart?.bannerLocation);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE,
    libraries: ["places"],
  });

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    // if (formValues?.address_line1) {
    //   return;
    // }
    if (bannerLocation?.latLong) {
      handleInputAddressChange(bannerLocation?.address_line1);
      setPosition(bannerLocation?.latLong);
      setdistPosition(bannerLocation?.latLong);
      setZoom(15);
    }
  }, [isLoaded]);

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
    handleInputAddressChange(address);
    let Formataddress = address.replace(/\s+/g, "+").toLocaleLowerCase();
    await geo.find(address, function (err, res) {
      if (res[0]) {
        if (res[0].locality.long_name !== "Abu Dhabi") {
          toast.warn("Delivery is Availabe in Abu Dabhi Region only", {
            autoClose: 3000,
            theme: "dark",
          });
          distRef.current.value = "";
          return;
        }
        setPosition(res[0]?.location);
        setdistPosition(res[0]?.location);
        map.panTo(res[0]?.location);
        map.setZoom(15);
      }
      // process error object
      console.log("🚀 ~ err:", err);
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
          <div class="mb-4">
            <label class="form-label" for="address_line1">
              Address*
            </label>
            <input
              id="address_line1"
              class="form-control"
              ref={distRef}
              value={value?.length ? value : null}
              defaultValue={bannerLocation?.address_line1}
              onChange={(e) => {
                handleInputAddressChange(e.target.value);
              }}
            />
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
      <div className="col-lg-12 mb-3">
        <div className="mapWrapper">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={zoom}
            options={options}
            onLoad={(map) => setMap(map)}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <>
              <Marker position={position} />
            </>
          </GoogleMap>
        </div>
      </div>
    </>
  );
}

export default MapsLoc;

import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { IoLocationSharp } from "react-icons/io5";
function CurrentLoc({ setAddress }) {
  const wrapperRef = useRef(null);
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [addresslist, setAddresslist] = useState([]);
  const [showList, setShowList] = useState(false);
  //

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleCurretGeoCodes = () => {
    if (addresslist.length > 0) {
      setShowList(true);
      return;
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function async(position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        getCurrentLocation(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  };
  const getCurrentLocation = (latitude, longitude) => {
    Axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE}`,
      {
        // query URL without using browser cache
        headers: {
          "Cache-Control": "public",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Vary: origin,
          "Access-Control-Allow-Headers": "Authorization",
          "Access-Control-Request-Method": "GET",
          Expires: "100000",
        },
      }
    )
      .then((res) => {
        setAddresslist(res?.data?.results);
        setShowList(true);
      })
      .catch((e) => console.log(e));
  };

  const handleAddressset = (address) => {
    setAddress(address);
    setShowList(false);
  };
  return (
    <div className="trackWrapper">
      <button
        className="btn trackBtn text-center d-flex justify-content-center align-items-center"
        onClick={handleCurretGeoCodes}
        type="button"
      >
        <IoLocationSharp />
        &nbsp;Track Me
      </button>
      <div
        ref={wrapperRef}
        className="TrackList"
        style={{ display: showList ? "block" : "none " }}
      >
        {addresslist?.map((item) => (
          <p
            onClick={() => {
              handleAddressset(item?.formatted_address);
            }}
          >
            {item?.formatted_address}
          </p>
        ))}
      </div>
    </div>
  );
}

export default CurrentLoc;

import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
// google place api
import { usePlacesWidget } from "react-google-autocomplete";

import CurrentLoc from "./CurrentLoc";
import MapsLoc from "./MapsLoc";

function Places({ formValues, handleInputAddressChange }) {
  const [address, setAddress] = useState("");
  const [addressPosition, setaddressPosition] = useState("");
  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE,
    onPlaceSelected: (place) => {
      setAddress(place.formatted_address);
    },
    options: {
      types: ["(regions)"],
      componentRestrictions: { country: "ae" },
    },
  });

  useEffect(() => {
    if (address) {
      handleInputAddressChange(address);
    }
  }, [address]);

  //   const handeAddressUpdate = (address) => {
  //     handleInputAddressChange(address);
  //     // setAddress(address);
  //   };

  return (
    <div>
      <>
        {/* <Form.Group controlId="address_line1" className="mb-4">
          <Form.Label>Address*</Form.Label>
          <Form.Control
            ref={ref}
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </Form.Group> */}
        {/* <CurrentLoc setAddress={setAddress} /> */}
      </>
      {/* <PlacesAutocomplete value={address} onChange={setAddress} debounce={2000}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="SuggestWrapper">
            <div className="InputWrapper">
              <Form.Group controlId="address_line1" className="mb-4">
                <Form.Label>Address*</Form.Label>
                <Form.Control
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input",
                  })}
                />
              </Form.Group>
            </div>
            <div className="autocomplete-dropdown-container suggestWrapperList">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                    className="SuggestionList"
                    onClick={() => handeAddressUpdate(suggestion.description)}
                  >
                    <span className="AddressDetails">
                      {suggestion.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete> */}
    </div>
  );
}

export default Places;

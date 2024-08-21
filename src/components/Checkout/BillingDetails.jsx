import React, { useState } from "react";
import { Form } from "react-bootstrap";
// import { BsGift } from "react-icons/bs";
import { MdStoreMallDirectory } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import MapsLoc from "./MapsLoc";

const BillingDetails = ({
  formValues,
  handleInputChange,
  fileRef,
  isFileUploaded,
  isFileUploadederror,
}) => {
  return (
    <>
      <div className="biling-details" data-aos="fade-up">
        {/* <h2>Billing address</h2> */}
        <Form>
          <div className="row mt-4">
            <div className="col-lg-12">
              <Form.Group controlId="notes" className="mb-4">
                <Form.Label>Order Notes (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  name="notes"
                  value={formValues?.notes}
                  onChange={handleInputChange}
                  rows={6}
                />
              </Form.Group>
            </div>

            <div className="col-lg-12">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>
                  Upload your Emirates ID for Verification
                </Form.Label>
                <Form.Control
                  ref={fileRef}
                  type="file"
                  name="emt_id"
                  id="emt_idk"
                  onChange={(e) => handleInputChange(e, true)}
                />
              </Form.Group>
              {isFileUploaded ? (
                <p className="fileUPloadmsg">File uploaded successfully</p>
              ) : isFileUploadederror ? (
                <p className="fileUPloadErrorMsg">
                  Uploading failed, try again!
                </p>
              ) : null}
            </div>

            {/* <div className="col-lg-12">
              <Form.Group controlId="gift" className="payment_card_style">
                <Form.Check
                  type="radio"
                  name="gift"
                  inline
                  label="Send a Gift"
                  value={1}
                  onChange={handleInputChange}
                  checked={formValues?.gift == 1}
                />
                <BsGift fontSize={"20px"} />
              </Form.Group>
            </div> */}
            <div className="col-lg-6">
              <Form.Group
                controlId="shipping_type"
                className="payment_card_style mb-3"
              >
                <Form.Check
                  type="radio"
                  name="shipping_type"
                  inline
                  label="Store Pick Up"
                  value="pickup"
                  onChange={handleInputChange}
                  checked={formValues?.shipping_type == "pickup"}
                />
                <MdStoreMallDirectory fontSize={"24px"} />
              </Form.Group>
              {formValues?.shipping_type == "pickup" && (
                <p className="store_location">
                  Store Location: Royal Spirit, Millennium Al Rawdah Hotel, 1778
                  Sheikh Rashid Bin Saeed Street, Al Rawdah, Abu Dhabi.{" "}
                  <a href="https://g.co/kgs/k8oRpx" target="_blank">
                    Click here
                  </a>
                </p>
              )}
            </div>
            <div className="col-lg-6">
              <Form.Group
                controlId="shipping_type"
                className="payment_card_style mb-3"
              >
                <Form.Check
                  type="radio"
                  name="shipping_type"
                  inline
                  label="Delivery"
                  value="delivery"
                  onChange={handleInputChange}
                  checked={formValues?.shipping_type == "delivery"}
                />
                <CiDeliveryTruck fontSize={"24px"} />
              </Form.Group>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};
export default BillingDetails;

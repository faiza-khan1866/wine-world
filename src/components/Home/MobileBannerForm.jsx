import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row, InputGroup } from "react-bootstrap";
import { homeBannerLocationData } from "../../appRedux/actions/cartAction";
import { useNavigate } from "react-router-dom";

const MobileBannerForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserLogIn = useSelector((state) => state.user.isUser);

  const homeBillingData = {
    shipping_type: "",
    gift: 0,
    country: "",
  };
  const [formValues, setFormValues] = useState(homeBillingData);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isUserLogIn) {
      toast.warn("Please Login to Search.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues?.country === "") {
      toast.warn("Please Enter Location.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.shipping_type === "") {
      toast.warn("Please Choose Shipping Type.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    let updatedData = { ...formValues };
    setLoading(true);
    dispatch(homeBannerLocationData(updatedData));
    setLoading(false);
    navigate("/shop/beer");
  };

  return (
    <div className="mbl_banner_form_wrape pb-5">
      <div className="container">
        <Form className="banner-form">
          <Row>
            <Col sm={12}>
              <Form.Group controlId="shipping_type" className="mb-2">
                {/* <Form.Check
                    type="radio"
                    name="gift"
                    inline
                    label="Send a Gift"
                    value={1}
                    onChange={handleInputChange}
                    checked={formValues?.gift == 1}
                  /> */}
                <Form.Check
                  type="radio"
                  name="shipping_type"
                  inline
                  label="Store Pick Up"
                  value="pickup"
                  onChange={handleInputChange}
                  checked={formValues?.shipping_type == "pickup"}
                />
                <Form.Check
                  type="radio"
                  name="shipping_type"
                  inline
                  label="Delivery"
                  value="delivery"
                  onChange={handleInputChange}
                  checked={formValues?.shipping_type == "delivery"}
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <InputGroup>
                <Form.Control
                  as="select"
                  name="country"
                  value={formValues?.country}
                  onChange={handleInputChange}
                >
                  <option value="">Enter Your Location</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                </Form.Control>
                <InputGroup.Text
                  onClick={handleSubmit}
                  disabled={loading ? true : false}
                >
                  {loading ? "Searching..." : "Search"}
                </InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default MobileBannerForm;

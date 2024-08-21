import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Modal, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  createAddAddressData,
  fetchSingleAddressData,
} from "../../http/apiService";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AddAddress = (props) => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.User_Data.user_id);
  const auth_token = useSelector((state) => state.user.User_Data.auth_token);

  const initailObject = {
    user_id: userId,
    full_name: "",
    mobile: "",
    country: "",
    state: "",
    city: "",
    postal_code: "",
    address_line1: "",
    address_line2: "",
    address_type: "",
  };

  const [formValues, setFormValues] = useState(initailObject);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddressDetailData = async () => {
      try {
        let header = {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        };
        const { data } = await fetchSingleAddressData(props?.addressID, header);
        setFormValues(data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    if (props?.addressID && props?.addressID != null) {
      fetchAddressDetailData();
    }
  }, [props?.addressID]);

  const handleInputChange = (e) => {
    if (e.target.name == "mobile") {
      // Regular expression to match only numbers
      const numberPattern = /^\d*$/;
      if (numberPattern.test(e.target.value)) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
      }
    } else {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  const fetchAddAddressFormData = async (updatedData) => {
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      const response = await createAddAddressData(updatedData, header);
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast.success(response.data, {
          autoClose: 3000,
          theme: "dark",
        });
        setFormValues({ ...initailObject });
        props.onHide();
        navigate("/account");
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
      setLoading(false);
      toast.error("Something Went Wrong!", {
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValues.full_name === "") {
      toast.warn("Please Enter Full Name.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.mobile === "") {
      toast.warn("Please Enter Phone Number.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.country === "") {
      toast.warn("Please Select Emirate.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.city === "") {
      toast.warn("Please Enter Area.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.postal_code === "") {
      toast.warn("Please Enter Postal Code.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.address_line1 === "") {
      toast.warn("Please Enter Address.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.address_type === "") {
      toast.warn("Please Choose Address Type.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    let updatedData = { ...formValues };
    setLoading(true);
    fetchAddAddressFormData(updatedData);
  };
  return (
    <>
      <Modal
        {...props}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="add_address_modal"
      >
        <Modal.Body className="add_addres_pop_up_wrape">
          <div className="add_address_content">
            <p className="text-end p-1 m-0">
              <MdClose
                fontSize="24px"
                className="closeIcon"
                onClick={props.onHide}
              />
            </p>
            <Container>
              <h2>
                Add address
              </h2>
              <Form>
                <Row>
                  <Col sm={6}>
                    <Form.Group controlId="full_name" className="mb-4">
                      <Form.Label>Full Name*</Form.Label>
                      <Form.Control
                        type="text"
                        name="full_name"
                        value={formValues.full_name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="mobile" className="mb-4">
                      <Form.Label>Phone Number*</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobile"
                        value={formValues.mobile}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group controlId="country" className="mb-4">
                      <Form.Label>Emirates*</Form.Label>
                      <Form.Control
                        as="select"
                        name="country"
                        value={formValues?.country}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          Select Emirates
                        </option>
                        <option value="Abu Dhabi">Abu Dhabi</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="city" className="mb-4">
                      <Form.Label>Area*</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formValues.city}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="postal_code" className="mb-4">
                      <Form.Label>Postal Code / Zipcode*</Form.Label>
                      <Form.Control
                        type="text"
                        name="postal_code"
                        value={formValues.postal_code}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group controlId="address_line1" className="mb-4">
                      <Form.Label>Address*</Form.Label>
                      <Form.Control
                        type="text"
                        name="address_line1"
                        value={formValues.address_line1}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group controlId="address_line2" className="mb-4">
                      <Form.Control
                        type="text"
                        name="address_line2"
                        value={formValues.address_line2}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group controlId="address_type" className="mb-4">
                      <Form.Label style={{ display: "block" }}>
                        Address Type*
                      </Form.Label>
                      <Form.Check
                        type="radio"
                        name="address_type"
                        inline
                        label="Billing"
                        value="Billing"
                        onChange={handleInputChange}
                        checked={formValues.address_type == "Billing"}
                      />
                      <Form.Check
                        type="radio"
                        name="address_type"
                        inline
                        label="Shipping"
                        value="Shipping"
                        onChange={handleInputChange}
                        checked={formValues.address_type == "Shipping"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  className="btn_style"
                  onClick={handleSubmit}
                  disabled={loading ? true : false}
                >
                  {loading ? "Sending..." : "Save"}
                </Button>
              </Form>
            </Container>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddAddress;

import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import MapsLoc from "./MapsLoc";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logOut } from "../../appRedux/actions/userAction";
import {
  addUserAddress,
  fetchAddressDetails,
  UpdateAddress,
} from "../../http/apiService";

function AddressForm({
  fetchUserAddress,
  setshowAddAddressForm,
  ListViewScroll,
  isEdit,
  editAddressId,
  AddresssaveBtn,
  addressSaveError,
}) {
  const bannerLocation = useSelector((state) => state?.cart?.bannerLocation);
  const userData = useSelector((state) => state.user.User_Details);
  const auth_token = useSelector((state) => state.user.User_Data.auth_token);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const billingDetails = {
    user_id: userData?.id,
    full_name: userData?.full_name,
    email: userData?.email,
    mobile: userData?.mobile,
    country: bannerLocation?.country ? bannerLocation?.country : "",
    city: "",
    state: "",
    zip_code: "",
    address_line1: bannerLocation?.address_line1
      ? bannerLocation?.address_line1
      : "",
    address_line2: "",
    address_type: "Billing",
  };
  const [formValues, setFormValues] = useState(billingDetails);

  const AddUserAddress = async (payload) => {
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      const response = await addUserAddress(payload, header);
      toast.success("Address Saved", {
        autoClose: 3000,
        theme: "dark",
      });
      return response;
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };
  const EditAddressData = async (payload) => {
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      const response = await UpdateAddress(payload, header);
      await fetchUserAddress();
      // EditAddressData();
      toast.success("Updated Successfully!", {
        autoClose: 3000,
        theme: "dark",
      });
      return response;
    } catch (error) {
      console.error("Error fetching Data:", error);
      toast.error("Something Went Wrong!", {
        autoClose: 3000,
        theme: "dark",
      });
    }
  };
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
  const handleInputAddressChange = (value) => {
    setFormValues({
      ...formValues,
      address_line1: value,
    });
  };
  const formValidation = () => {
    if (formValues?.userData === "") {
      toast.warn("Please Login Again", {
        autoClose: 3000,
        theme: "dark",
      });
      dispatch(logOut());
      navigate("/");
      return false;
    } else if (formValues?.full_name === "") {
      toast.warn("Please Enter Full Name.", {
        autoClose: 3000,
        theme: "dark",
      });
      return false;
    } else if (formValues?.email == "") {
      toast.warn("Please Enter Email.", {
        autoClose: 3000,
        theme: "dark",
      });
      return false;
    } else if (!/^[A-Z0-9._%+-]/i.test(formValues?.email)) {
      toast.warn("Please Enter valid email address. e.g. abc@example.com", {
        autoClose: 3000,
        theme: "dark",
      });
      return false;
    } else if (formValues?.mobile === "") {
      toast.warn("Please Enter Mobile Number.", {
        autoClose: 3000,
        theme: "dark",
      });
      return false;
    } else if (formValues?.country === "") {
      toast.warn("Please Choose Country.", {
        autoClose: 3000,
        theme: "dark",
      });
      return false;
    } else if (formValues?.city === "") {
      toast.warn("Please Choose City.", {
        autoClose: 3000,
        theme: "dark",
      });
      return false;
    } else if (formValues?.zip_code === "") {
      toast.warn("Please Choose Zip Code.", {
        autoClose: 3000,
        theme: "dark",
      });
      return false;
    } else if (formValues?.address_line1 === "") {
      toast.warn("Please Enter Address.", {
        autoClose: 3000,
        theme: "dark",
      });
      return false;
    } else if (formValues?.address_line2 === "") {
      toast.warn("Please Enter Additional Address Details.", {
        autoClose: 3000,
        theme: "dark",
      });
      return false;
    } else if (formValues.shipping_type === "") {
      toast.warn("Please Choose Shipping Type.", {
        autoClose: 3000,
        theme: "dark",
      });
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = await formValidation();
    if (!validation) {
      return;
    }
    let payload = {
      id: formValues?.id,
      user_id: formValues?.user_id,
      address_type: formValues?.address_type,
      billing_address: {
        full_name: formValues?.full_name,
        email: formValues?.email,
        mobile: formValues?.mobile,
        country: formValues?.country,
        city: formValues?.city,
        state: formValues?.state,
        zip_code: formValues?.zip_code,
        address_line1: formValues?.address_line1,
        address_line2: formValues?.address_line2,
      },
    };
    if (isEdit) {
      const response = await EditAddressData(payload);
      return;
    }
    const response = await AddUserAddress(payload);
    setshowAddAddressForm(false);
    ListViewScroll();
    await fetchUserAddress();
  };
  const getAddressDetails = async (id) => {
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      const response = await fetchAddressDetails(id, header);
      if (response.status === 200 || response.status === 201) {
        let data = { ...response?.data };
        let payload = {
          id: data?.id,
          user_id: data?.user_id,
          full_name: data?.full_name,
          email: data?.email,
          mobile: data?.mobile,
          country: data?.city,
          city: data?.country,
          state: data?.state,
          zip_code: data.postal_code,
          address_line1: data?.address_line1,
          address_line2: data?.address_line2,
          address_type: data?.address_type,
        };
        setFormValues(structuredClone(payload));
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
      toast.error("Something Went Wrong!", {
        autoClose: 3000,
        theme: "dark",
      });
    }
  };
  useEffect(() => {
    if (isEdit) {
      getAddressDetails(editAddressId);
    }
  }, [isEdit]);
  return (
    <div className="biling-details" data-aos="fade-up">
      <h2>Add Shipping Address</h2>
      <Form>
        <div className="row mt-4">
          <div className="col-lg-6">
            <Form.Group controlId="full_name" className="mb-4">
              <Form.Label>Full Name*</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={formValues?.full_name}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-lg-6">
            <Form.Group controlId="email" className="mb-4">
              <Form.Label>Email*</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues?.email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-lg-6">
            <Form.Group controlId="mobile" className="mb-4">
              <Form.Label>Mobile*</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={formValues?.mobile}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-lg-6">
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
          </div>
          <div className="col-lg-6">
            <Form.Group controlId="city" className="mb-4">
              <Form.Label>Area*</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formValues?.city}
                onChange={handleInputChange}
              />
              {/* <Form.Control
                  as="select"
                  name="city"
                  value={formValues?.city}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select Area
                  </option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Umm Al Quwain">Umm Al Quwain</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                  <option value="Fujairah">Fujairah</option>
                  <option value="Ajman">Ajman</option>
                </Form.Control> */}
            </Form.Group>
          </div>
          <div className="col-lg-6">
            <Form.Group controlId="zip_code" className="mb-4">
              <Form.Label>Postal Code / Zipcode*</Form.Label>
              <Form.Control
                type="text"
                name="zip_code"
                value={formValues?.zip_code}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          {/* <Form.Group controlId="address_line1" className="mb-4">
                <Form.Label>Address * </Form.Label>
                <Form.Control
                  type="text"
                  name="address_line1"
                  value={formValues?.address_line1}
                  onChange={handleInputChange}
                />
              </Form.Group> */}
          <MapsLoc
            handleInputAddressChange={handleInputAddressChange}
            formValues={formValues}
            handleInputChange={handleInputChange}
            value={formValues?.address_line1}
          />
          <div className="col-lg-12">
            <Form.Group controlId="address_line2" className="mb-3">
              <Form.Label>Additional Address Details*</Form.Label>
              <Form.Control
                type="text"
                name="address_line2"
                value={formValues?.address_line2}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-lg-12 text-center">
            <button
              ref={AddresssaveBtn}
              className={`btn paybn topscrollPdsSaveBtn mt-3  ${
                addressSaveError ? "saveBtnAnim" : null
              }`}
              onClick={handleSubmit}
              disabled={loading ? true : false}
            >
              {loading ? "Sending..." : "Save"}{" "}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default AddressForm;

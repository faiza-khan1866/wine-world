import React, { useState } from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  VerifyUser,
  verifyAccountPopUp,
} from "../../appRedux/actions/userAction";
import { registerPopUp } from "../../appRedux/actions/userAction";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CorporateRegisterForm = ({ setUserType, userType, isEdit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [mobileValue, setMobileValue] = useState("");
  const UserData = useSelector((state) => state.user.User_Verification);
  const dispatch = useDispatch();

  const initialFormData = {
    user_type: userType,
    full_name: "",
    email: "",
    password: "",
    mobile: "",
    company_name: "",
    designation: "",
    landline: "",
  };

  const [registeredData, setRegisteredData] = useState(
    structuredClone(initialFormData)
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useState(() => {
    if (isEdit) {
      setRegisteredData(structuredClone(UserData));
      setMobileValue(UserData?.mobile);
    }
  }, [isEdit]);

  const handleFields = (e) => {
    const UpdatedFormData = { ...registeredData };
    UpdatedFormData[e.target.name] = e.target.value;
    setRegisteredData(UpdatedFormData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!registeredData.user_type) {
      toast.warn("Please Choose User Type.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    if (!registeredData.full_name) {
      toast.warn("Please Enter Full Name.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    if (!registeredData.email) {
      toast.warn("Please Enter Email Address.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(registeredData.email)
    ) {
      toast.warn("Invalid Email Address.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    if (!registeredData.password) {
      toast.warn("Please Enter password.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (registeredData.password.length < 8) {
      toast.warn("Password Should be 8 Character Long.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    if (!mobileValue) {
      toast.warn("Please Enter Mobile No.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    if (!registeredData.company_name) {
      toast.warn("Please Enter Company Name.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    if (!registeredData.designation) {
      toast.warn("Please Enter Designation.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    if (!registeredData.landline) {
      toast.warn("Please Enter Landline.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    let phoneData = mobileValue
      .replace(/\s+/g, "")
      .replace(/%/g, "")
      .replace(/--/g, "")
      .replace(/\+/g, "");
    dispatch(VerifyUser({ ...registeredData, mobile: `+${phoneData}` }));
    dispatch(verifyAccountPopUp(true));
    dispatch(registerPopUp(false));
  };

  return (
    <>
      <Form>
        <Row>
          <Col sm={12}>
            <Form.Group controlId="user_type" className="mb-4">
              <Form.Label style={{ display: "block" }}>User Type*</Form.Label>
              <Form.Check
                type="radio"
                name="user_type"
                inline
                label="User"
                value="user"
                onChange={() => setUserType("user")}
                checked={registeredData?.user_type == "user"}
              />
              <Form.Check
                type="radio"
                name="user_type"
                inline
                label="Corporate"
                value="corporate"
                onChange={() => setUserType("corporate")}
                checked={registeredData?.user_type == "corporate"}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-4" controlId="full_name">
              <Form.Label>Full Name*</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={registeredData?.full_name}
                onChange={handleFields}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-4" controlId="email">
              <Form.Label>Email Address*</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={registeredData?.email}
                onChange={handleFields}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Password*</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={registeredData?.password}
                  onChange={handleFields}
                  style={{ borderRight: "0" }}
                  required
                />
                <InputGroup.Text>
                  {showPassword ? (
                    <AiOutlineEye
                      fontSize="20px"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      fontSize="20px"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-4" controlId="mobile">
              <Form.Label>Mobile Number*</Form.Label>
              <PhoneInput
                country="ae"
                value={mobileValue}
                onChange={setMobileValue}
                enableSearch={true}
                disableSearchIcon={true}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-4" controlId="company_name">
              <Form.Label>Company Name*</Form.Label>
              <Form.Control
                type="text"
                name="company_name"
                value={registeredData?.company_name}
                onChange={handleFields}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-4" controlId="designation">
              <Form.Label>Designation*</Form.Label>
              <Form.Control
                type="text"
                name="designation"
                value={registeredData?.designation}
                onChange={handleFields}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-4" controlId="landline">
              <Form.Label>Landline*</Form.Label>
              <Form.Control
                type="text"
                name="landline"
                value={registeredData?.landline}
                onChange={handleFields}
              />
            </Form.Group>
          </Col>
        </Row>
        <button
          className="btn btn_style1"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          SIgn Up
        </button>
      </Form>
    </>
  );
};
export default CorporateRegisterForm;

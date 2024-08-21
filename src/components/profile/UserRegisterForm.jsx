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

const UserRegisterForm = ({ setUserType, isEdit, userType }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [mobileValue, setMobileValue] = useState("");
  const UserData = useSelector((state) => state.user.User_Verification);
  const dispatch = useDispatch();

  const initialFormData = {
    full_name: "",
    email: "",
    password: "",
    mobile: "",
    landmark: "",
    current_location: "",
    nationality: "",
    anniversary_date: "",
    user_type: userType,
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
    if (!registeredData.landmark) {
      toast.warn("Please Enter landmark.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    if (!registeredData.current_location) {
      toast.warn("Please Enter Current Location.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    if (!registeredData.nationality) {
      toast.warn("Please Enter Nationality.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    if (!registeredData.dob) {
      toast.warn("Please Select D.O.B.", {
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

  // Calculate the maximum date value (years after 2002)
  const currentDate = new Date();
  currentDate?.setFullYear(currentDate?.getFullYear() - 21); // Allow users who are at least 21 years old
  const maxDate = currentDate?.toISOString()?.split("T")[0]; // Convert to YYYY-MM-DD format

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
              <Form.Label>Name*</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={registeredData?.full_name}
                onChange={handleFields}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-4" controlId="email">
              <Form.Label>Email*</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={registeredData?.email}
                onChange={handleFields}
                required
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
              <Form.Label>Mobile*</Form.Label>
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
            <Form.Group className="mb-4" controlId="current_location">
              <Form.Label>Location Address*</Form.Label>
              <Form.Control
                type="text"
                name="current_location"
                value={registeredData?.current_location}
                onChange={handleFields}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-4" controlId="landmark">
              <Form.Label>Landmark*</Form.Label>
              <Form.Control
                type="text"
                name="landmark"
                value={registeredData?.landmark}
                onChange={handleFields}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-4" controlId="dob">
              <Form.Label>D.O.B*</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={registeredData?.dob}
                onChange={handleFields}
                required
                max={maxDate}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-4" controlId="nationality">
              <Form.Label>Nationality*</Form.Label>
              <Form.Control
                type="text"
                name="nationality"
                value={registeredData?.nationality}
                onChange={handleFields}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-4" controlId="anniversary_date">
              <Form.Label>Anniversary Date</Form.Label>
              <Form.Control
                type="date"
                name="anniversary_date"
                value={registeredData?.anniversary_date}
                onChange={handleFields}
              />
            </Form.Group>
          </Col>
        </Row>
        <p className="sign_up_note">
          If you fill this addition Details you will get free gifts on your
          Birthday & Anniversary
        </p>
        <button
          className="btn btn_style1"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Sign Up
        </button>
      </Form>
    </>
  );
};
export default UserRegisterForm;

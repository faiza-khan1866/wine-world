import React from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FacebookLogin from "react-facebook-login";
import { toast } from "react-toastify";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import {
  googleLogIn,
  logIn,
  facebookLogIn,
} from "../../appRedux/actions/userAction";
import { userLogin } from "../../http/apiService";

const SocialLoginComponent = ({ lg, hideLoginPopUp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Helper function to calculate age from date of birth
  function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  // login api for google

  const fetchLoginFormData = async (updatedData, googleResponse) => {
    try {
      const response = await userLogin(updatedData);
      if (response.status === 200 || response.status === 201) {
        if (response.data.error) {
          toast.error(response.data.error, {
            autoClose: 3000,
            theme: "dark",
          });
          return;
        } else {
          dispatch(
            logIn({
              auth_token: response?.headers?.x_auth_token,
              user_id: response?.data?.user?.id,
              user_type: response?.data?.user?.user_type,
            })
          );
          dispatch(
            googleLogIn({
              access_token: googleResponse?.access_token,
              full_name: googleResponse?.name,
              email: googleResponse?.email,
              profile: googleResponse?.picture,
            })
          );
          toast.success("Logged In Successfully!", {
            autoClose: 3000,
            theme: "dark",
          });
          navigate("/account");
          hideLoginPopUp();
        }
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  const handleGoogleLoginSuccess = (res) => {
    // Check if the user's age is under 21
    const userAge = calculateAge(res.data.dateOfBirth); // You'll need to implement calculateAge

    if (userAge < 21) {
      // Display an error message or handle the under-21 case as needed
      toast.error("You must be at least 21 years old to log in.", {
        autoClose: 3000,
        theme: "dark",
      });
      // You can choose to return or perform other actions to handle the under-21 case
      return;
    }
    let googleResponse = res?.data;
    let updatedData = {
      user_type: "user",
      full_name: res?.data?.name,
      email: res?.data?.email,
      profile: res?.data?.picture,
      is_social: true,
    };
    fetchLoginFormData(updatedData, googleResponse);
  };

  const handleGoogleLoginFailed = (error) => {
    toast.error("Oops, Something went wrong please try again later!", {
      autoClose: 3000,
      theme: "dark",
    });
  };

  // login api for facebook

  const fetchFacebookLoginFormData = async (updatedData, facebookResponse) => {
    try {
      const response = await userLogin(updatedData);
      if (response.status === 200 || response.status === 201) {
        if (response.data.error) {
          toast.error(response.data.error, {
            autoClose: 3000,
            theme: "dark",
          });
          return;
        } else {
          dispatch(
            logIn({
              auth_token: response?.headers?.x_auth_token,
              user_id: response?.data?.user?.id,
              user_type: response?.data?.user?.user_type,
            })
          );
          dispatch(
            facebookLogIn({
              access_token: facebookResponse?.accessToken,
              full_name: facebookResponse?.name,
              email: facebookResponse?.email,
              profile: facebookResponse?.picture?.data?.url,
            })
          );
          toast.success("Logged In Successfully!", {
            autoClose: 3000,
            theme: "dark",
          });
          navigate("/account");
          hideLoginPopUp();
        }
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  const responseFacebook = (response) => {
    let facebookResponse = response;
    let updatedData = {
      user_type: "user",
      full_name: response?.name,
      email: response?.email,
      profile: response?.picture?.data?.url,
      is_social: true,
    };
    fetchFacebookLoginFormData(updatedData, facebookResponse);
  };

  const failedResponseFacebook = (error) => {
    toast.error("Oops, Something went wrong please try again later!", {
      autoClose: 3000,
      theme: "dark",
    });
  };

  return (
    <div>
      <Row>
        <Col sm={12} lg={lg}>
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            onFailure={failedResponseFacebook}
            cssClass="my-facebook-button-class"
            icon="fa-facebook"
            scope="public_profile,email,user_age_range"
          />
        </Col>
        <Col sm={12} lg={lg}>
          <LoginSocialGoogle
            client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onResolve={handleGoogleLoginSuccess}
            onReject={handleGoogleLoginFailed}
            scope="https://www.googleapis.com/auth/userinfo.email"
          >
            <GoogleLoginButton className="google-btn-class" />
          </LoginSocialGoogle>
        </Col>
      </Row>
    </div>
  );
};

export default SocialLoginComponent;

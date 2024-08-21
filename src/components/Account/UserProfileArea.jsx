import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUpdateProfileData } from "../../http/apiService";
import profileicon from "../../images/icons/profileicon.png";

const UserProfileArea = ({ auth_token, userId }) => {
  const navigate = useNavigate();
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  const [uploadFile, setUploadFile] = useState([]);
  let userData = useSelector((state) => state.user.User_Details);
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    let downloadFile = [...event.target.files];
    let updatedFiles = downloadFile.map((x) => ({
      image: x,
    }));
    setUploadFile(updatedFiles);
  };

  const initailObject = {
    user_id: userId,
    full_name: userData?.full_name,
    email: userData?.email,
    mobile: userData?.mobile,
    current_location: userData?.current_location,
    landmark: userData?.landmark,
    nationality: userData?.nationality,
    anniversary_date: userData?.anniversary_date,
    dob: userData?.dob,
    profile: userData?.profile,
  };
  const [formValues, setFormValues] = useState(initailObject);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const fetchUpdateProfileFormData = async (imagesFormData) => {
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
          "Content-Type": `multipart/form-data; boundary=${imagesFormData._boundary}`,
        },
      };
      const response = await createUpdateProfileData(imagesFormData, header);
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast.success(response.data.message, {
          autoClose: 3000,
          theme: "dark",
        });
        navigate("/account");
        setFormValues({ ...initailObject });
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
      toast.warn("Please enter a full name before updating profile.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.email === "") {
      toast.warn("Please enter a email id before updating profile.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.mobile === "") {
      toast.warn("Please enter a mobile before updating profile.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.current_location === "") {
      toast.warn("Please enter a location address before updating profile.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.landmark === "") {
      toast.warn("Please enter a landmark before updating profile.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.nationality === "") {
      toast.warn("Please enter a nationality before updating profile.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.dob === "") {
      toast.warn("Please enter a D.O.B before updating profile.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    // Check if uploadFile is empty or not
    if (uploadFile.length === 0) {
      let imagesFormData = { ...formValues };
      // If uploadFile is empty, just append the profile from userData
      setFormValues({
        ...formValues,
        profile: userData?.profile,
      });
      setLoading(true);
      fetchUpdateProfileFormData(imagesFormData);
    } else {
      // If uploadFile is not empty, append the new uploaded image
      let updatedData = { ...formValues };
      let imagesFormData = new FormData();
      uploadFile.forEach((x) => {
        imagesFormData.append("profile[]", x?.image);
      });
      imagesFormData.append("data", JSON.stringify(updatedData));
      setLoading(true);
      fetchUpdateProfileFormData(imagesFormData);
    }
  };

  // Calculate the maximum date value (years after 2002)
  const currentDate = new Date();
  currentDate?.setFullYear(currentDate?.getFullYear() - 21); // Allow users who are at least 21 years old
  const maxDate = currentDate?.toISOString()?.split("T")[0]; // Convert to YYYY-MM-DD format

  return (
    <>
      <div className="row">
        <div className="col-lg-4 mb-3">
          <div
            className="profile_detail text-center"
            data-aos="fade-up"
            onClick={handleClick}
          >
            <figure>
              {userData?.profile?.includes("https://") ? (
                <img
                  src={userData?.profile ? userData?.profile : profileicon}
                  alt="user"
                />
              ) : (
                <img
                  src={
                    userData?.profile
                      ? "https://royal-spirit.b-cdn.net/profile/" +
                        userData?.profile
                      : profileicon
                  }
                  alt="wine"
                />
              )}
            </figure>
            <div className="edit_icon_style">
              <MdEdit />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
              name="profile"
            />
            {uploadFile?.length > 0 &&
              uploadFile?.map((x, i) => (
                <p key={i} className="mt-2 mb-0">
                  {x?.image?.name}
                </p>
              ))}
          </div>
        </div>
        <div className="col-lg-8">
          <Form>
            <div className="row">
              <div className="col-lg-6">
                <Form.Group className="mb-4" controlId="full_name">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="full_name"
                    value={formValues.full_name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group className="mb-4" controlId="mobile">
                  <Form.Label>Your Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={formValues.mobile}
                    readOnly
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group className="mb-4" controlId="current_location">
                  <Form.Label>Your Location Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="current_location"
                    value={formValues?.current_location}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group className="mb-4" controlId="landmark">
                  <Form.Label>Your Landmark</Form.Label>
                  <Form.Control
                    type="text"
                    name="landmark"
                    value={formValues?.landmark}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group className="mb-4" controlId="dob">
                  <Form.Label>Your D.O.B</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formValues?.dob}
                    onChange={handleInputChange}
                    max={maxDate}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group className="mb-4" controlId="nationality">
                  <Form.Label>Your Nationality</Form.Label>
                  <Form.Control
                    type="text"
                    name="nationality"
                    value={formValues?.nationality}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group className="mb-4" controlId="anniversary_date">
                  <Form.Label>Your Anniversary Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="anniversary_date"
                    value={formValues?.anniversary_date}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label>Your Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formValues?.email}
                    readOnly
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <button
                  type="button"
                  className="btn btn_style"
                  data-aos="fade-up"
                  onClick={handleSubmit}
                  disabled={loading ? true : false}
                >
                  {loading ? "Sending..." : "Save Changes"}
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UserProfileArea;

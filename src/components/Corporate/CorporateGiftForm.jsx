import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import { Row, Col, Container, Form } from "react-bootstrap";
import { MdOutlineFileUpload } from "react-icons/md";
import corporatebgImg from "../../images/bgimages/corporateformbg.png";
import uploadIcon from "../../images/icons/uploadIcon.png";
import { toast } from "react-toastify";
import { createCorporateOrderFormData } from "../../http/apiService";

const initailObject = {
  full_name: "",
  email: "",
  mobile: "",
  job_title: "",
  company_name: "",
  event_type: "",
  message: "",
  corporate_images: [],
};
const CorporateGiftForm = () => {
  const isUserLogIn = useSelector((state) => state.user.isUser);
  const user_type = useSelector((state) => state.user.User_Data.user_type);
  const [formValues, setFormValues] = useState(initailObject);
  const [loading, setLoading] = useState(false);
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  const [uploadFile, setUploadFie] = useState([]);
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
    setUploadFie(updatedFiles);
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

  const fetchOrderFormData = async (imagesFormData) => {
    try {
      let header = {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${imagesFormData._boundary}`,
        },
      };
      const response = await createCorporateOrderFormData(
        imagesFormData,
        header
      );
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast.success("Data has been Submitted Successfully!", {
          autoClose: 3000,
          theme: "dark",
        });
        setFormValues({ ...initailObject });
        setUploadFie([]);
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

    if (!isUserLogIn) {
      toast.warn("Please Login as a Corporate User to Order.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (user_type !== "corporate") {
      toast.warn("Please Login as a Corporate User to Order.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    if (formValues.full_name === "") {
      toast.warn("Please Enter Full Name.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    if (formValues?.email === "") {
      toast.warn("Please Enter Email.", {
        autoClose: 3000,
        theme: "dark",
      });
      return false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues?.email)
    ) {
      toast.warn("Invalid email address.", {
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
    } else if (formValues.job_title === "") {
      toast.warn("Please Enter Job Title.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.company_name === "") {
      toast.warn("Please Enter Company Name.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.event_type === "") {
      toast.warn("Please Enter Event Type.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.message === "") {
      toast.warn("Please Enter Message.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (uploadFile?.length == 0) {
      toast.warn(
        "Please upload a copy of your valid Trade license, Vat Certificate & EID (Emirate ID)",
        {
          autoClose: 3000,
          theme: "dark",
        }
      );
      return;
    } else if (uploadFile?.length !== 3) {
      toast.warn(
        "Please upload a copy of your valid Trade license, Vat Certificate & EID (Emirate ID)",
        {
          autoClose: 3000,
          theme: "dark",
        }
      );
      return;
    }

    let updatedData = { ...formValues };
    let imagesFormData = new FormData();
    uploadFile.forEach((x) => {
      imagesFormData.append("corporate_images[]", x?.image);
    });

    imagesFormData.append("data", JSON.stringify(updatedData));
    setLoading(true);
    fetchOrderFormData(imagesFormData);
  };
  useEffect(() => {
    Aos.init({
      offset: 100,
      easing: "ease",
      delay: 0,
      once: true,
      duration: 800,
    });
  });
  return (
    <>
      <div
        className="join-club"
        style={{
          background: `url(${corporatebgImg}) no-repeat center center`,
          backgroundSize: "cover",
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col sm={12} md={10} lg={8}>
              <h2 className="text-center" data-aos="fade-down">
                A corporate collaboration <br /> like no other
              </h2>
              <p className="text-center" data-aos="fade-down">
                Join hands with Royal Spirit for preferential pricing, bespoke
                offerings, and a treasure trove of fine liquors for your events.
                Contact us now!
              </p>
              <Form data-aos="fade-up">
                <Row className="mt-4">
                  <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-4" controlId="fullName">
                      <Form.Control
                        type="text"
                        placeholder="Full Name"
                        name="full_name"
                        value={formValues.full_name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-4" controlId="email">
                      <Form.Control
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-4" controlId="mobile">
                      <Form.Control
                        type="text"
                        placeholder="Mobile Number"
                        name="mobile"
                        value={formValues.mobile}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-4" controlId="jobTitle">
                      <Form.Control
                        type="text"
                        placeholder="Job Title"
                        name="job_title"
                        value={formValues.job_title}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-4" controlId="companyName">
                      <Form.Control
                        type="text"
                        placeholder="Company Name"
                        name="company_name"
                        value={formValues.company_name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-4" controlId="eventType">
                      <Form.Control
                        type="text"
                        placeholder="Event Type"
                        name="event_type"
                        value={formValues.event_type}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group className="mb-4" controlId="message">
                      <Form.Control
                        type="text"
                        placeholder="Message"
                        name="message"
                        value={formValues.message}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="upload_doc_wrape mb-4">
                  <Row>
                    <Col sm={4}>
                      <h3 className="mb-3">
                        <span>1</span> Trade license copy
                      </h3>
                    </Col>
                    <Col sm={4}>
                      <h3 className="mb-3">
                        <span>2</span> Vat Certificate
                      </h3>
                    </Col>
                    <Col sm={4}>
                      <h3 className="mb-3">
                        <span>3</span> EID (Emirate ID)
                      </h3>
                    </Col>
                  </Row>
                  <hr />
                  <div className="upload_doc">
                    <img src={uploadIcon} alt="upload icon" />
                    <p className="sign_up_note">
                      Please upload a copy of your valid trade license in PNG ,
                      JPEG or PDF format , Not longer than 3 mb.
                    </p>
                    <button
                      className="btn btn_style1 px-5 borderRadius_1"
                      style={{ width: "auto" }}
                      type="button"
                      onClick={handleClick}
                    >
                      <MdOutlineFileUpload fontSize={"20px"} /> Upload
                    </button>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      ref={hiddenFileInput}
                      onChange={handleChange}
                      style={{ display: "none" }}
                      name="property_images"
                    />
                    {uploadFile?.length > 0 && (
                      <>
                        <p className="mt-3 mb-2">Files:</p>
                        <ul className="list-unstyled">
                          {uploadFile?.map((x, i) => (
                            <li key={i}>{x?.image?.name}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  className="join-btn borderRadius_1"
                  onClick={handleSubmit}
                  disabled={loading ? true : false}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
                <p className="note_text">
                  If you'd like to create a customized order as a gift for
                  someone special, please don't hesitate to contact us at{" "}
                  <a href="mailto:info@royalspirit.ae">info@royalspirit.ae.</a>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default CorporateGiftForm;

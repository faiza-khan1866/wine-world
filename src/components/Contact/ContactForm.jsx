import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { createContactData } from "../../http/apiService";

const initailObject = {
  name: "",
  email: "",
  mobile: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [formValues, setFormValues] = useState(initailObject);
  const [loading, setLoading] = useState(false);

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

  const fetchContactFormData = async (updatedData) => {
    try {
      const response = await createContactData(updatedData);
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast.success("Data has been Submitted Successfully!", {
          autoClose: 3000,
          theme: "dark",
        });
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

    if (formValues.name === "") {
      toast.warn("Please Enter Name.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    if (!formValues?.email) {
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
    } else if (formValues.subject === "") {
      toast.warn("Please Enter Subject.", {
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
    }

    let updatedData = { ...formValues };
    setLoading(true);
    fetchContactFormData(updatedData);
  };
  return (
    <>
      <Form>
        <div className="row mt-4">
          <div className="col-lg-6">
            <Form.Group controlId="name" className="mb-4">
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
            </Form.Group>
          </div>
          <div className="col-lg-6">
            <Form.Group controlId="email" className="mb-4">
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </Form.Group>
          </div>
          <div className="col-lg-6">
            <Form.Group controlId="mobile" className="mb-4">
              <Form.Control
                type="text"
                name="mobile"
                value={formValues.mobile}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
            </Form.Group>
          </div>
          <div className="col-lg-6">
            <Form.Group controlId="subject" className="mb-4">
              <Form.Control
                type="text"
                name="subject"
                value={formValues.subject}
                onChange={handleInputChange}
                placeholder="Subject"
              />
            </Form.Group>
          </div>
          <div className="col-lg-12">
            <Form.Group controlId="message" className="mb-4">
              <Form.Control
                as="textarea"
                name="message"
                value={formValues.message}
                onChange={handleInputChange}
                rows={6}
                style={{ resize: "none" }}
                placeholder="Your message"
              />
            </Form.Group>
          </div>
          <div className="col-lg-12">
            <Button
              className="btn subimt-message"
              onClick={handleSubmit}
              disabled={loading ? true : false}
            >
              {loading ? "Sending..." : "Submit"}
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};
export default ContactForm;

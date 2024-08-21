import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import { createJoinClubData } from "../../http/apiService";

const initailObject = {
  first_name: "",
  last_name: "",
  email: "",
  mobile: "",
};

const JoinClub = () => {
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

  const fetchJoinClubFormData = async (updatedData) => {
    try {
      const response = await createJoinClubData(updatedData);
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

    if (formValues.first_name === "") {
      toast.warn("Please Enter First Name.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.last_name === "") {
      toast.warn("Please Enter Last Name.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues?.email === "") {
      toast.warn("Please Enter Email.", {
        autoClose: 3000,
        theme: "dark",
      });
      return false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues?.email)
    ) {
      toast.warn("Please Enter Valid Email. e.g. abc@example.com", {
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
    }

    let updatedData = { ...formValues };
    setLoading(true);
    fetchJoinClubFormData(updatedData);
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
      <div className="join-club" id="subscribePlatinumForm">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-12" data-aos="fade-up">
              <h2 className="text-center">
                The Royal Spirit platinum club awaits
              </h2>
              <p className="join-club-discount text-center">
                Step into exclusivity. Enjoy up to <b>50% discounts</b> and a
                world of unmatched benefits.
              </p>
              <form data-aos="fade-up">
                <div className="row mt-4">
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control mb-4"
                      placeholder="First Name"
                      name="first_name"
                      value={formValues.first_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control mb-4"
                      placeholder="Last Name"
                      name="last_name"
                      value={formValues.last_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control mb-4"
                        placeholder="Email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control mb-4"
                      placeholder="Mobile Number"
                      name="mobile"
                      value={formValues.mobile}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-lg-12 text-center">
                    <button
                      type="button"
                      className="join-btn"
                      onClick={handleSubmit}
                      disabled={loading ? true : false}
                    >
                      {loading ? "Sending..." : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default JoinClub;

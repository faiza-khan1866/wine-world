import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { createProductReviewData } from "../../http/apiService";
import CoustomerReview from "./CoustomerReview";
import { Tab, Tabs } from "react-bootstrap";
import Aos from "aos";
import "aos/dist/aos.css";

const ProductsComment = ({ productDetail }) => {
  const initailObject = {
    user_id: 1,
    product_id: null,
    name: "",
    email: "",
    message: "",
  };

  const [formValues, setFormValues] = useState(initailObject);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const fetchProductReviewFormData = async (updatedData) => {
    try {
      const response = await createProductReviewData(updatedData);
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast.success("Review has been Submitted Successfully!", {
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

    if (formValues?.name === "") {
      toast.warn("Please Enter Name.", {
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
      toast.warn("Invalid email address. e.g abc@example.com", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues?.message === "") {
      toast.warn("Please Enter Review.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    let updatedData = {
      ...formValues,
      product_id: productDetail?.id,
    };
    setLoading(true);
    fetchProductReviewFormData(updatedData);
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
      <div className="bottom-details">
        <Tabs
          defaultActiveKey="description"
          transition={false}
          id="info-tab-example"
        >
          <Tab eventKey="description" title="Description">
            <div className="comon-description-products">
              <p
                dangerouslySetInnerHTML={{
                  __html: productDetail?.long_description,
                }}
              />
            </div>
          </Tab>
          <Tab eventKey="details" title="Shipping Details">
            <div className="comon-description-products">
              <p
                dangerouslySetInnerHTML={{
                  __html: productDetail?.details,
                }}
              />
            </div>
          </Tab>
          {/* <Tab eventKey="reviews" title="Reviews">
            {productDetail?.reviews?.length > 0 && (
              <CoustomerReview reviews={productDetail?.reviews} />
            )}

            <div className="review-form col-lg-8 mt-3">
              <h2>
                Leave a comment
              </h2>
              <form>
                <div className="row mt-3">
                  <div className="col-lg-6">
                    <div className="from-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="from-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="from-group">
                      <textarea
                        className="form-control"
                        name="message"
                        value={formValues.message}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button
                      onClick={handleSubmit}
                      className="btn submit"
                      disabled={loading ? true : false}
                    >
                      {loading ? "Sending...." : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Tab> */}
        </Tabs>
      </div>
    </>
  );
};
export default ProductsComment;

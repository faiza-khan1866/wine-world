import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import { createBlogCommentsData } from "../../http/apiService";
import {
  FaUser,
  FaRegCalendarAlt,
  FaRegComment,
  FaShareAlt,
} from "react-icons/fa";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import blog from "../../images/about/aboutpuresec.png";
import CommentSection from "./CommentSection";

const BlogDetailsLeft = ({ blogData }) => {
  const initailObject = {
    blog_id: null,
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
  const fetchBlogCommentsFormData = async (updatedData) => {
    try {
      const response = await createBlogCommentsData(updatedData);
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
      toast.warn("Please Enter Comment.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    let updatedData = {
      ...formValues,
      blog_id: blogData?.id,
    };
    setLoading(true);
    fetchBlogCommentsFormData(updatedData);
  };
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
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
      <div className="blogleft-sec">
        <figure className="mb-0 post-img" data-aos="fade-up">
          <img
            src={
              blogData?.featured_img
                ? process.env.REACT_APP_IMAGE_BASE_URL + blogData?.featured_img
                : blog
            }
            alt="blogdetails"
          />
        </figure>
        <div
          className="d-lg-flex mt-3 justify-content-between align-items-center"
          data-aos="fade-up"
        >
          <ul className="list-unstyled d-flex mb-0">
            <li className="d-flex align-items-center">
              <FaUser /> {blogData?.created_by}
            </li>
            <li className="d-flex align-items-center">
              <FaRegCalendarAlt />{" "}
              {new Date(blogData?.created_at)?.toLocaleDateString(
                "en-US",
                options
              )}
            </li>
            {blogData?.comments?.length > 0 && (
              <li className="d-flex align-items-center">
                <FaRegComment />{" "}
                <span>{blogData?.comments?.length} Comments</span>
              </li>
            )}
          </ul>
          <ul
            className="list-unstyled share-links mt-3 d-flex align-items-center"
            data-aos="fade-up"
          >
            <li className="d-flex align-items-center ml-0">
              <FaShareAlt /> Share:
            </li>
            <li className="m-0">
              <FacebookShareButton
                url={`https://royalspirit.ae/blog/${blogData?.route}`}
                quote={blogData?.title}
                hashtag="#RoyalSpirit"
              >
                <FacebookIcon
                  size={30}
                  round={true}
                  bgStyle={{ fill: "#ccc" }}
                  iconFillColor="#444"
                />
              </FacebookShareButton>
              <TwitterShareButton
                url={`https://royalspirit.ae/blog/${blogData?.route}`}
                title={blogData?.title}
                hashtags={["RoyalSpirit", "Blog"]}
              >
                <TwitterIcon
                  size={30}
                  round={true}
                  bgStyle={{ fill: "#ccc" }}
                  iconFillColor="#444"
                />
              </TwitterShareButton>
              <LinkedinShareButton
                url={`https://royalspirit.ae/blog/${blogData?.route}`}
                title={blogData?.title}
                summary={blogData?.short_description}
              >
                <LinkedinIcon
                  size={30}
                  round={true}
                  bgStyle={{ fill: "#ccc" }}
                  iconFillColor="#444"
                />
              </LinkedinShareButton>
              <WhatsappShareButton
                url={`https://royalspirit.ae/blog/${blogData?.route}`}
                title={blogData?.title}
              >
                <WhatsappIcon
                  size={30}
                  round={true}
                  bgStyle={{ fill: "#ccc" }}
                  iconFillColor="#444"
                />
              </WhatsappShareButton>
            </li>
          </ul>
        </div>
        <hr />

        <div className="blog-para-details" data-aos="fade-up">
          <h2>{blogData?.title}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: blogData?.description,
            }}
          />
        </div>
        <hr />
        {blogData?.comments?.length > 0 && (
          <CommentSection commentsList={blogData?.comments} />
        )}

        <div className="leave-commnet-sec " data-aos="fade-down">
          <h2 className="mb-3">Leave a comment</h2>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
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
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Message"
                  name="message"
                  value={formValues.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-12">
              <button
                onClick={handleSubmit}
                className="btn post-bn"
                disabled={loading ? true : false}
              >
                {loading ? "Sending...." : "Post Comment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BlogDetailsLeft;

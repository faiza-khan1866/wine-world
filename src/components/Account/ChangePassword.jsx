import React, { useState } from "react";
import { Form, Button, Modal, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { createChangePasswordData } from "../../http/apiService";
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import { logOut } from "../../appRedux/actions/userAction";
import { useNavigate } from "react-router-dom";

const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userId = useSelector((state) => state.user.User_Data.user_id);
  let auth_token = useSelector((state) => state.user.User_Data.auth_token);

  const initailObject = {
    user_id: userId,
    password: "",
    change_password: "",
    confirm_password: "",
  };
  const [formValues, setFormValues] = useState(initailObject);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const fetchChangePasswordFormData = async (updatedData) => {
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      const response = await createChangePasswordData(updatedData, header);
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        if (response.data.original.error) {
          toast.error(response.data.original.error, {
            autoClose: 3000,
            theme: "dark",
          });
        } else {
          toast.success(response.data.message, {
            autoClose: 3000,
            theme: "dark",
          });
          setFormValues({ ...initailObject });
          navigate("/");
          dispatch(logOut());
          props.onHide();
        }
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

    if (formValues.password === "") {
      toast.warn("Please enter a Current password before submission.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.change_password === "") {
      toast.warn("Please enter a New password before submission.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.change_password === formValues.password) {
      toast.warn("Current Password and New password cannot be same.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues.confirm_password === "") {
      toast.warn("Please enter a Confirm password before submission.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues?.change_password !== formValues?.confirm_password) {
      toast.warn("New Password and Confirm Password does not match.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (formValues?.change_password.length < 8) {
      toast.warn("Password must be at least 8 characters.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    let updatedData = { ...formValues };
    setLoading(true);
    fetchChangePasswordFormData(updatedData);
  };

  return (
    <>
      <Modal
        {...props}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="change_pass_modal"
      >
        <Modal.Body className="change_pass_pop_up_wrape">
          <div className="change_pass_content">
            <p className="text-end p-1 m-0">
              <MdClose
                fontSize="24px"
                className="closeIcon"
                onClick={props.onHide}
              />
            </p>
            <Container>
              <h2>Change password</h2>
              <Form>
                <Form.Group controlId="password" className="mb-4">
                  <Form.Label>
                    Current password (leave blank to leave unchanged) *
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="change_password" className="mb-4">
                  <Form.Label>
                    New password (leave blank to leave unchanged) *
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="change_password"
                    value={formValues.change_password}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="confirm_password" className="mb-4">
                  <Form.Label>Confirm new password *</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm_password"
                    value={formValues.confirm_password}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button
                  className="btn_style"
                  onClick={handleSubmit}
                  disabled={loading ? true : false}
                >
                  {loading ? "Sending..." : "Save Changes"}
                </Button>
              </Form>
            </Container>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ChangePassword;

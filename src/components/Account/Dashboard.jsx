import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import user from "../../images/icons/user.png";
import order from "../../images/icons/order.png";
import ResetPassword from "../../images/icons/reset-password.png";
import ChangePassword from "./ChangePassword";
import { logOut, userInfo } from "../../appRedux/actions/userAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../http/apiService";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let auth_token = useSelector((state) => state.user.User_Data.auth_token);
  let user_type = useSelector((state) => state.user.User_Data.user_type);
  let userData = useSelector((state) => state.user.User_Details);

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  useEffect(() => {
    let header = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };
    const fetchDashboardData = async () => {
      try {
        const { data } = await fetchUserData(header);
        dispatch(userInfo(data));
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogOut = () => {
    toast.success("Logout Successfully!", {
      autoClose: 3000,
      theme: "dark",
    });
    dispatch(logOut());
    navigate("/");
  };

  return (
    <>
      <div className="dashboard-sec py-5">
        <div className="container">
          <h2 data-aos="fade-up">Your account</h2>
          <div className="row row-cols-1 row-cols-lg-3">
            <div className="col mb-3">
              <div
                className="dashboard_detail text-center"
                onClick={() => navigate("/account/profile")}
                data-aos="fade-up"
              >
                <figure>
                  {userData?.profile?.includes("https://") ? (
                    <img
                      className="userIocn_img"
                      src={userData?.profile ? userData?.profile : user}
                      alt="user"
                    />
                  ) : (
                    <img
                      className="userIocn_img"
                      src={
                        userData?.profile
                          ? "https://royal-spirit.b-cdn.net/profile/" +
                            userData?.profile
                          : user
                      }
                      alt="wine"
                    />
                  )}
                  {/* <img src={user} alt="wine" /> */}
                </figure>
                <h5 className="mt-3">My Profile</h5>
              </div>
              <button className="btn btn_logout" onClick={handleLogOut}>
                Logout
              </button>
            </div>
            {user_type !== "corporate" && (
              <div className="col mb-3">
                <div
                  className="dashboard_detail text-center "
                  onClick={() => navigate("/account/orders")}
                  data-aos="fade-up"
                >
                  <figure className="userIocn">
                    <img src={order} alt="wine" />
                  </figure>
                  <h5 className="mt-3">Orders History</h5>
                </div>
              </div>
            )}

            <div className="col">
              <div
                className="dashboard_detail text-center "
                onClick={() => setShowChangePasswordModal(true)}
                data-aos="fade-up"
              >
                <figure className="userIocn">
                  <img src={ResetPassword} alt="wine" />
                </figure>
                <h5 className="mt-3">Change Password</h5>
              </div>
              <ChangePassword
                show={showChangePasswordModal}
                onHide={() => setShowChangePasswordModal(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;

import React, { useState, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import addressicon from "../../images/icons/address.png";
import {
  fetchAddressesData,
  deleteAddressData,
  setDefaultAddressData,
} from "../../http/apiService";
import { useSelector } from "react-redux";
import AddAddress from "./AddAddress";
import UserProfileArea from "./UserProfileArea";
import CorporateProfileArea from "./CorporateProfileArea";

const ProfileArea = () => {
  let userId = useSelector((state) => state.user.User_Data.user_id);
  let auth_token = useSelector((state) => state.user.User_Data.auth_token);
  let user_type = useSelector((state) => state.user.User_Data.user_type);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCurrentIndex, setIsCurrentIndex] = useState(0);
  const [addressData, setAddressData] = useState([]);
  const [addressID, setAddressID] = useState(null);

  const handleMouseEnter = (index) => {
    setIsOpen(true);
    setIsCurrentIndex(index);
  };

  const handleMouseLeave = (index) => {
    setIsOpen(false);
    setIsCurrentIndex(index);
  };

  const fetchAddressesListData = async () => {
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      const { data } = await fetchAddressesData(userId, header);
      setAddressData(data);
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  useEffect(() => {
    fetchAddressesListData();
  }, []);

  const handleDeleteAddressData = async (id) => {
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      const response = await deleteAddressData(id, header);
      if (response.status === 200 || response.status === 201) {
        toast.success("Address has been deleted Successfully!", {
          autoClose: 3000,
          theme: "dark",
        });
        fetchAddressesListData();
        setIsOpen(!isOpen);
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  const handleDefaultAddress = async (id) => {
    try {
      let formdata = {
        user_id: userId,
      };
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      const response = await setDefaultAddressData(id, formdata, header);
      if (response.status === 200 || response.status === 201) {
        toast.success("Address has been Set to Default Successfully!", {
          autoClose: 3000,
          theme: "dark",
        });
        fetchAddressesListData();
        setIsOpen(!isOpen);
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };
  return (
    <>
      <div className="profile-sec py-5" data-aos="fade-up">
        <div className="container">
          <h2>Your account</h2>
          {user_type == "corporate" ? (
            <CorporateProfileArea auth_token={auth_token} userId={userId} />
          ) : (
            <UserProfileArea auth_token={auth_token} userId={userId} />
          )}

          {user_type !== "corporate" && (
            <div className="address-sec pt-3 r">
              <h2>Your address</h2>
              <div className="row row-cols-1 row-cols-lg-3">
                <div className="col mb-3">
                  <div
                    className="address_detail text-center d-flex justify-content-center align-items-center flex-column"
                    onClick={() => setShowAddAddressModal(true)}
                  >
                    <div>
                      <figure className="userIocn">
                        <img src={addressicon} alt="wine" />
                      </figure>
                      <h5 className="mt-3">Add New</h5>
                    </div>
                  </div>
                  <AddAddress
                    show={showAddAddressModal}
                    addressID={addressID}
                    onHide={() => setShowAddAddressModal(false)}
                  />
                </div>
                {addressData?.map((x, i) => (
                  <div className="col mb-3" key={i}>
                    <div className="address_info" data-aos="fade-up">
                      <div className="address_header">
                        <span
                          className={`address_badge ${
                            x?.default == 1 ? "active" : ""
                          }`}
                        >
                          {x?.address_type}
                        </span>
                        <div className="dots_wrape">
                          <BiDotsVerticalRounded
                            fontSize={"26px"}
                            className={`dotsStyle ${
                              isOpen && isCurrentIndex == i ? "active" : ""
                            }`}
                            onMouseEnter={() => handleMouseEnter(i)}
                          />
                          {isOpen && isCurrentIndex == i && (
                            <ul
                              className={`menu-items  ${
                                isOpen && isCurrentIndex == i ? "active" : ""
                              }`}
                              onMouseLeave={() => handleMouseLeave(i)}
                            >
                              <li
                                onClick={() => {
                                  setShowAddAddressModal(true);
                                  setAddressID(x?.id);
                                }}
                              >
                                <BiEditAlt fontSize={"18px"} />
                                <span>Edit</span>
                              </li>
                              <li
                                onClick={() => handleDeleteAddressData(x?.id)}
                              >
                                <MdOutlineDelete fontSize={"18px"} />
                                <span>Delete</span>
                              </li>
                              <li onClick={() => handleDefaultAddress(x?.id)}>
                                <FaRegAddressCard fontSize={"18px"} />
                                <span>Set Default</span>
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>
                      <h3 className="mt-3">{x?.full_name}</h3>
                      <p className="my-2">{x?.mobile}</p>
                      <p className="m-0">
                        {x?.address_line1} {x?.address_line2} {x?.city},{" "}
                        {x?.country}, {x?.state} {x?.postal_code}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ProfileArea;

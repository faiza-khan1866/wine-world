import React, { useState, useEffect, useMemo, useRef } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { BsCart3 } from "react-icons/bs";
import { toast } from "react-toastify";
import useCart from "../../Hooks/useCart";
import BillingDetails from "./BillingDetails";
import CheckoutPayRight from "./CheckoutPayRight";
import {
  createCheckoutData,
  DeleteAddress,
  deleteAddressData,
  getUserAddresses,
  UpdateAddress,
  uploadCheckId,
} from "../../http/apiService";
import { useSelector } from "react-redux";
import { BsGift } from "react-icons/bs";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { set } from "lodash";
import { FaAngleRight } from "react-icons/fa";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";

const CheckoutBody = ({
  userId,
  authToken,
  indexvisit,
  indexpage,
  activepage,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { CartItemsSum, GetCartData, clearCart, isCart } = useCart();
  const AddressListref = useRef(null);
  const AddresssaveBtn = useRef(null);

  let CartItems = GetCartData();
  const IsCartt = isCart();
  const fileRef = useRef();
  let SubTotalCart = useMemo(() => CartItemsSum(), [CartItems]);
  const coupanCodeValue = useSelector((state) => state?.cart?.coupanCodeValue);
  const shippingCHarges = useSelector((state) => state?.cart?.shippingCharges);
  const Amount = SubTotalCart - Number(coupanCodeValue);
  const bannerLocation = useSelector((state) => state?.cart?.bannerLocation);
  const userData = useSelector((state) => state.user.User_Details);
  const searchParams = new URLSearchParams(location?.search);
  const status = searchParams?.get("status");
  const [file, setfile] = useState(null);
  const [isFileUploaded, setisFileUploaded] = useState(false);
  const [isFileUploadederror, setisFileUploadedError] = useState(false);
  const [UserAddressData, setUserAddressData] = useState(null);
  const [showAddAddressForm, setshowAddAddressForm] = useState(true);
  const [isAddressLoading, setIsAddressLoading] = useState(true);
  const [isEdit, setisEdit] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [addressSaveError, setaddressSaveError] = useState(false);

  const billingDetails = {
    billing_address_id: "",
    notes: "",
    shipping_type: bannerLocation?.shipping_type
      ? bannerLocation?.shipping_type
      : "delivery",
    gift: bannerLocation?.gift ? bannerLocation?.gift : 0,
    payment_type: "cod",
  };
  const [formValues, setFormValues] = useState(billingDetails);
  const [loading, setLoading] = useState(false);
  const [total_amount, settotal_amount] = useState(null);
  const [shipping_amount, setshipping_amount] = useState(null);
  useEffect(() => {
    if (status == "success") {
      Swal.fire({
        icon: "success",
        title: "Thank you!",
        text: "Your Order is confirmed!",
        showConfirmButton: false,
        timer: 3000,
      });
      clearCart();
      navigate("/cart");
    } else if (status == "failed") {
      Swal.fire({
        icon: "error",
        title: "Please try again later!",
        text: "Your transaction was unsuccessful!",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }, [window?.location?.search]);

  useEffect(() => {
    setTimeout(() => {
      if (addressSaveError) {
        setaddressSaveError(false);
      }
    }, 3000);
  }, [addressSaveError]);

  let product = [];
  CartItems?.map((acc) => {
    product.push({
      product_id: acc?.id,
      product_variation_id: acc?.price_variation?.[0]?.variation_id,
      product_value_id: acc?.price_variation?.[0]?.variation_value_id,
      price:
        acc?.price_variation?.[0]?.discount_price !== 0
          ? acc?.price_variation?.[0]?.discount_price
          : acc?.price_variation?.[0]?.offer_price !== 0
          ? acc?.price_variation?.[0]?.offer_price
          : acc?.price_variation?.[0]?.price,
      qty: acc?.qty,
      // z_id: acc?.price_variation?.[0]?.z_id,
    });
  });

  const ListViewScroll = () => {
    AddressListref?.current?.scrollIntoView();
  };
  const SaveBtnViewScroll = () => {
    AddresssaveBtn?.current?.scrollIntoView();
  };
  const fetchUserAddress = async () => {
    setIsAddressLoading(true);
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await getUserAddresses(userId, header);
      if (response.status === 200 || response.status === 201) {
        if (!response?.data?.length) {
          setIsAddressLoading(false);
          setshowAddAddressForm(true);
          setUserAddressData([]);
          return;
        }
        setUserAddressData(response?.data);
        setFormValues({
          ...formValues,
          billing_address_id: response?.data[0]?.id,
        });
        setshowAddAddressForm(false);
        setIsAddressLoading(false);
      }
    } catch (error) {
      setIsAddressLoading(false);
      setshowAddAddressForm(true);

      console.error("Error fetching Data:", error);
    }
  };
  let shipping_charges = 15;
  const countShipping = () => {
    const total_amountCount =
      formValues?.shipping_type == "pickup"
        ? Amount
        : Amount < 100
        ? Amount + shipping_charges
        : Amount;

    let shipping_amountCount =
      formValues?.shipping_type == "pickup"
        ? "Free"
        : Amount < 100
        ? shipping_charges
        : "Free";
    settotal_amount(total_amountCount);
    setshipping_amount(shipping_amountCount);
  };
  useEffect(() => {
    fetchUserAddress();
  }, []);
  useEffect(() => {
    countShipping();
  }, [Amount, formValues?.shipping_type]);

  const handleInputChange = (e, file = false) => {
    if (file) {
      setfile(e.target.files[0]);
    }
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

  const fetchCheckoutFormData = async (updatedData) => {
    let paymentType = updatedData?.payment_type;
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await createCheckoutData(updatedData, header);
      if (response.status === 200 || response.status === 201) {
        // if (paymentType == "network") {
        setLoading(false);
        setTimeout(() => {
          setFormValues(structuredClone(...billingDetails));
        }, 2000);
        setfile(null);
        window.location.replace(response?.data);
        // } else {
        //   setLoading(false);
        //   setFormValues({ ...billingDetails });
        //   setfile(null);
        //   window.location.replace(response?.data);
        // }
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
  const DeleteAddressData = async (id) => {
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await deleteAddressData(id, header);
      await fetchUserAddress();
      toast.success("Deleted Successfully!", {
        autoClose: 3000,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error fetching Data:", error);
      toast.error("Something Went Wrong!", {
        autoClose: 3000,
        theme: "dark",
      });
    }
  };
  const EditAddressData = async (id = null) => {
    if (id == null) {
      setisEdit(false);
      setEditAddressId(null);
      setshowAddAddressForm(false);
      return;
    }
    setisEdit(true);
    setEditAddressId(id);
    setshowAddAddressForm(true);
  };
  const uploadCheckoutFormID = async (updatedData) => {
    setisFileUploadedError(false);
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await uploadCheckId(updatedData, header);
      if (response.status === 200 || response.status === 201) {
        setfile(null);
        fileRef.current.value = "";
        setisFileUploaded(true);
      }
      return true;
    } catch (error) {
      setisFileUploadedError(true);
      fileRef.current.value = "";
      setfile(null);
      toast.error("File Upload Failed!", {
        autoClose: 3000,
        theme: "dark",
      });
      console.error("Error upload ID:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      user_id: userId,
      eid: file?.name,
      billing_address_id: formValues?.billing_address_id,
      isMobile: 0,
      payment_type: formValues?.payment_type,
      amount: SubTotalCart,
      discounted_amount: coupanCodeValue,
      shipping_charges:
        formValues?.shipping_type == "pickup"
          ? 0
          : Amount < 100
          ? shipping_charges
          : 0,
      total_amount: total_amount?.toFixed(2),
      notes: formValues?.notes,
      shipping_type: formValues?.shipping_type,
      gift: formValues?.gift,
      product: product,
    };
    if (showAddAddressForm) {
      toast.warn("save the address first", {
        autoClose: 3000,
        theme: "dark",
        toastId: "submit_action",
      });
      setaddressSaveError(true);
      SaveBtnViewScroll();
      // AddresssaveBtn?.current?.click();
      return;
    }
    if (!UserAddressData?.length) {
      toast.warn("Add an Address", {
        autoClose: 3000,
        theme: "dark",
        toastId: "submit_action",
      });
      ListViewScroll();
      setshowAddAddressForm(true);
      return;
    }
    if (!updatedData.billing_address_id) {
      toast.warn("Please Select an saved address", {
        autoClose: 3000,
        theme: "dark",
        toastId: "submit_action",
      });
      return;
    }

    const formData = new FormData();
    formData.append("eid", file);
    // formData.append("fileName", updatedData?.emt_id?.name);
    if (!file) {
      toast.warn("Please Upload Your Emirate ID", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    setLoading(true);
    const checkFileUpload = await uploadCheckoutFormID(formData);
    if (!checkFileUpload) {
      return;
    }
    fetchCheckoutFormData(updatedData);
    // setfile(null)
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
      {isAddressLoading ? (
        <div style={{ minHeight: "80vh" }}>Loading..</div>
      ) : IsCartt ? (
        <div className="checkout-body-div mt-5">
          <div className="container">
            <div className="page-breakcrumb">
              <ul className="list-unstyled d-flex justify-content-start align-items-start">
                <li>
                  <NavLink to={indexvisit}> {indexpage} </NavLink>
                </li>
                <li>
                  <FaAngleRight />
                </li>
                <li
                  className="active"
                  dangerouslySetInnerHTML={{ __html: activepage }}
                />
              </ul>
            </div>
            {total_amount <= 75 && (
              <div className="order_note">
                <p>
                  <BsGift fontSize={"18px"} /> The minimum amount for free home
                  delivery is AED 100. Add some more great deals to your cart to
                  continue!.*Applicable only for online order not store pickup.
                </p>
              </div>
            )}
            <div className="row topscrollPds" ref={AddressListref}>
              <div className="col-lg-8 ">
                {showAddAddressForm ? (
                  <>
                    <div className="left-checkout">
                      <button
                        className="btn CancelAddresBtn mt-3"
                        onClick={() => {
                          if (
                            UserAddressData?.length == 0 ||
                            !UserAddressData
                          ) {
                            toast.warn("Please add your address", {
                              autoClose: 3000,
                              theme: "dark",
                            });
                            setaddressSaveError(true);
                            SaveBtnViewScroll();

                            return;
                          }
                          setshowAddAddressForm(false);
                          ListViewScroll();
                          EditAddressData();
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                    <br />
                  </>
                ) : (
                  <>
                    <div className="left-checkout addressListFOrm">
                      <div className="adresListContainer">
                        <AddressList
                          formValues={formValues}
                          handleInputChange={handleInputChange}
                          AddressData={UserAddressData}
                          isAddressLoading={isAddressLoading}
                          DeleteAddressData={DeleteAddressData}
                          EditAddressData={EditAddressData}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="left-checkout d-flex justify-content-center align-content-center">
                      <button
                        className="btn paybn mt-3"
                        onClick={() => {
                          setshowAddAddressForm(true);
                          ListViewScroll();
                        }}
                      >
                        Add New Address
                      </button>
                    </div>
                    <br />
                  </>
                )}
                {showAddAddressForm ? (
                  <>
                    <div className="left-checkout">
                      <AddressForm
                        fetchUserAddress={fetchUserAddress}
                        setshowAddAddressForm={setshowAddAddressForm}
                        ListViewScroll={ListViewScroll}
                        isEdit={isEdit}
                        editAddressId={editAddressId}
                        EditAddressData={EditAddressData}
                        AddresssaveBtn={AddresssaveBtn}
                        addressSaveError={addressSaveError}
                      />
                    </div>
                    <br />
                  </>
                ) : null}
                {showAddAddressForm ? null : (
                  <div className="left-checkout">
                    <BillingDetails
                      formValues={formValues}
                      handleInputChange={handleInputChange}
                      fileRef={fileRef}
                      isFileUploaded={isFileUploaded}
                      isFileUploadederror={isFileUploadederror}
                    />
                  </div>
                )}
              </div>
              <div className="col-lg-4">
                <CheckoutPayRight
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  shippingType={formValues?.shipping_type}
                  CartItems={CartItems}
                  SubTotalCart={SubTotalCart}
                  loading={loading}
                  totalAmount={total_amount}
                  shipping_amount={shipping_amount}
                  coupanValue={coupanCodeValue}
                  IsCartt={IsCartt}
                  showAddAddressForm={showAddAddressForm}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty_cart text-center py-5">
          <BsCart3 className="empty_cat_icon" />
          <h2 className="m-0">Your cart is currently empty.!</h2>
        </div>
      )}
    </>
  );
};
export default CheckoutBody;

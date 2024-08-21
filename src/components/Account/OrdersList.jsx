import React, { useEffect, useState } from "react";
import { fetchOrdersData } from "../../http/apiService";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import DataLoader from "../Loader/DataLoader";
// import { TfiReload } from "react-icons/tfi";
import ViewOrder from "./ViewOrder";
import TrackOrder from "./TrackOrder";

const OrdersList = () => {
  let userId = useSelector((state) => state.user.User_Data.user_id);
  let auth_token = useSelector((state) => state.user.User_Data.auth_token);
  const [showViewOrderModal, setShowViewOrderModal] = useState(false);
  const [showTrackOrderModal, setShowTrackOrderModal] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderNum, setOrderNum] = useState("");

  useEffect(() => {
    const fetchOrdersListData = async () => {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      try {
        setIsloading(true); // Show the loader
        const { data } = await fetchOrdersData(userId, header);
        setOrderList(data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsloading(false); // Hide the loader
      }
    };

    fetchOrdersListData();
  }, []);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      <div className="order_wrape py-5">
        <div className="container">
          <h2 className="title" data-aos="fade-up">
            Orders history
          </h2>
          {isloading ? (
            <DataLoader />
          ) : (
            <>
              {orderList?.length === 0 ? (
                <p className="text-center m-0" data-aos="fade-up">
                  No order has been made yet!
                </p>
              ) : (
                <div className="order_item_wrape">
                  {orderList?.map((x) => (
                    <div className="order_item" key={x?.id} data-aos="fade-up">
                      <div className="img_wrape">
                        <div>
                          {x?.order_details?.map((item) => (
                            <img
                              key={item?.id}
                              src={
                                process.env.REACT_APP_IMAGE_BASE_URL +
                                item?.products?.featured_img
                              }
                              alt="User"
                              className="img-fluid"
                            />
                          ))}
                        </div>

                        <div className="btn_wrape">
                          {x?.status === "ORDERDELIVERED" ? (
                            <Button
                              onClick={() => {
                                setShowViewOrderModal(true);
                                setOrderId(x?.id);
                              }}
                              className="btn_submit"
                            >
                              View Order
                            </Button>
                          ) : x?.status === "ORDERDISPATCHED" ||
                            x?.status === "PENDING" ? (
                            <>
                              <Button
                                onClick={() => {
                                  setShowTrackOrderModal(true);
                                  setOrderNum(x?.order_number);
                                }}
                                className="btn_submit"
                              >
                                Track Order
                              </Button>
                              <Button
                                onClick={() => {
                                  setShowViewOrderModal(true);
                                  setOrderId(x?.id);
                                }}
                                className="btn_order"
                              >
                                View Order
                              </Button>
                            </>
                          ) : x?.status === "ORDERPLACED" ? (
                            <>
                              <Button
                                onClick={() => {
                                  setShowViewOrderModal(true);
                                  setOrderId(x?.id);
                                }}
                                className="btn_submit"
                              >
                                View Order
                              </Button>
                              {/* <Button
                                // onClick={() =>
                                //   navigate(`/account/order/${x?.id}`)
                                // }
                                className="btn_order text-danger"
                              >
                                Cancel Order
                              </Button> */}
                            </>
                          ) : (
                            ""
                          )}
                          {/* <Button
                            // onClick={() => navigate(`/account/order/${x?.id}`)}
                            className="btn_order"
                          >
                            <TfiReload /> Re-Order
                          </Button> */}
                        </div>
                      </div>
                      <div className="order_detail">
                        <div className="order_number">
                          Products <br />
                          {x?.order_details?.map((item, index) => (
                            <span key={index}>
                              {index + 1}){" "}
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: item?.products?.name,
                                }}
                              />{" "}
                              <b>x {item?.qty}</b>{" "}
                              {index === x?.order_details?.length - 1 ? (
                                ""
                              ) : (
                                <br />
                              )}
                            </span>
                          ))}
                        </div>
                        <div className="order_number">
                          Order Number <br />
                          <span>{x?.order_number}</span>
                        </div>
                        <div className="order_number">
                          Shipped Date <br />
                          <span>
                            {new Date(x?.created_at)?.toLocaleDateString(
                              "en-US",
                              options
                            )}
                          </span>
                        </div>
                        <div className="order_number">
                          Total <br />
                          <span>AED {x?.total_amount}</span>
                        </div>
                        <div className="order_number">
                          Status <br />
                          {x?.status === "ORDERPLACED" ? (
                            <span className="text-info">Order Placed</span>
                          ) : x?.status === "ORDERDISPATCHED" ? (
                            <span className="text-info">Order Dispatched</span>
                          ) : x?.status === "ORDERDELIVERED" ? (
                            <span className="text-success">
                              Order Delivered
                            </span>
                          ) : x?.status === "PENDING" ? (
                            <span className="text-warning">Order Pending</span>
                          ) : (
                            // <span className="text-danger">Order Canceled</span>
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {orderId && (
            <ViewOrder
              orderId={orderId}
              show={showViewOrderModal}
              onHide={() => setShowViewOrderModal(false)}
            />
          )}
          {orderNum && (
            <TrackOrder
              orderNum={orderNum}
              show={showTrackOrderModal}
              onHide={() => setShowTrackOrderModal(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default OrdersList;

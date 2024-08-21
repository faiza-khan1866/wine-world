import React, { useEffect, useState } from "react";
import { fetchTrackOrderData } from "../../http/apiService";
import { Modal, Container } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { useSelector } from "react-redux";
import DataLoader from "../Loader/DataLoader";

const TrackOrder = (props) => {
  const { orderNum } = props;
  let auth_token = useSelector((state) => state.user.User_Data.auth_token);
  const [trackingprocess, setTrackingprocess] = useState();
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchOrderTrackData = async () => {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      try {
        setIsloading(true); // Show the loader
        const { data } = await fetchTrackOrderData(orderNum, header);
        setTrackingprocess(data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsloading(false); // Hide the loader
      }
    };

    fetchOrderTrackData();
  }, [orderNum]);

  return (
    <>
      <Modal
        {...props}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="track_order_modal"
      >
        <Modal.Body className="track_order_pop_up_wrape">
          <div className="track_order_content">
            <p className="text-end p-1 m-0">
              <MdClose
                fontSize="24px"
                className="closeIcon"
                onClick={props.onHide}
              />
            </p>
            <Container>
              <h2 className="text-center">
                Tracking order no - {orderNum}
              </h2>
              {isloading ? (
                <DataLoader />
              ) : (
                <div className="order_tracking">
                  {trackingprocess === "ORDERPLACED" && (
                    <div className="order_placed_note">
                      <p>Order Placed, Your Order will be updated Soon!</p>
                    </div>
                  )}
                  {trackingprocess === "ORDERCANCELLED" && (
                    <div className="order_placed_note">
                      <p className="text-danger">
                        No Record Found Please Try Again!
                      </p>
                    </div>
                  )}
                  <div className="steps">
                    <div
                      className={`step completed ${
                        trackingprocess === "ORDERCONFIRMED"
                          ? "completed"
                          : trackingprocess === "ORDERDISPATCHED"
                          ? "completed"
                          : trackingprocess === "ORDERDELIVERED"
                          ? "completed"
                          : ""
                      }`}
                    >
                      <div className="step-icon-wrap">
                        <div className="step-icon">
                          <MdOutlineShoppingCart fontSize="30px" />
                        </div>
                      </div>
                      <h4 className="step-title">Order Confirmed</h4>
                    </div>
                    <div
                      className={`step  ${
                        trackingprocess === "ORDERDISPATCHED"
                          ? "completed"
                          : trackingprocess === "ORDERDELIVERED"
                          ? "completed"
                          : ""
                      }`}
                    >
                      <div className="step-icon-wrap">
                        <div className="step-icon">
                          <TbTruckDelivery fontSize="30px" />
                        </div>
                      </div>
                      <h4 className="step-title">Product Dispatched</h4>
                    </div>
                    <div
                      className={`step ${
                        trackingprocess === "ORDERDELIVERED" ? "completed" : ""
                      }`}
                    >
                      <div className="step-icon-wrap">
                        <div className="step-icon">
                          <AiOutlineHome fontSize="30px" />
                        </div>
                      </div>
                      <h4 className="step-title">Product Delivered</h4>
                    </div>
                  </div>
                </div>
              )}
            </Container>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default TrackOrder;

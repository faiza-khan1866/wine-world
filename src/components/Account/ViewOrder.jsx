import React, { useEffect, useState } from "react";
import { fetchOrderDetailsData } from "../../http/apiService";
import { Row, Col, Modal, Container } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import DataLoader from "../Loader/DataLoader";

const ViewOrder = (props) => {
  const { orderId } = props;
  let auth_token = useSelector((state) => state.user.User_Data.auth_token);
  const [singleOrderDetails, setSingleOrderDetails] = useState();
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchSingleOrderData = async () => {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      try {
        setIsloading(true); // Show the loader
        const { data } = await fetchOrderDetailsData(orderId, header);
        setSingleOrderDetails(data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsloading(false); // Hide the loader
      }
    };

    fetchSingleOrderData();
  }, [orderId]);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      <Modal
        {...props}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="view_order_modal"
      >
        <Modal.Body className="view_order_pop_up_wrape">
          <div className="view_order_content">
            <p className="text-end p-1 m-0">
              <MdClose
                fontSize="24px"
                className="closeIcon"
                onClick={props.onHide}
              />
            </p>
            <Container>
              <h2>Order details</h2>
              {isloading ? (
                <DataLoader />
              ) : (
                <Row>
                  <Col sm={4}>
                    <h5>Order Number</h5>
                  </Col>
                  <Col sm={8}>
                    <p>{singleOrderDetails?.order_number}</p>
                  </Col>
                  <Col sm={4}>
                    <h5>Shipped Date</h5>
                  </Col>
                  <Col sm={8}>
                    <p>
                      {new Date(
                        singleOrderDetails?.created_at
                      )?.toLocaleDateString("en-US", options)}
                    </p>
                  </Col>
                  <Col sm={4}>
                    <h5>Total Amount</h5>
                  </Col>
                  <Col sm={8}>
                    <p>AED {singleOrderDetails?.total_amount}</p>
                  </Col>
                  <Col sm={4}>
                    <h5>Order Status</h5>
                  </Col>
                  <Col sm={8}>
                    <p>
                      {singleOrderDetails?.status === "ORDERPLACED" ? (
                        <span className="text-info">Order Placed</span>
                      ) : singleOrderDetails?.status === "ORDERDISPATCHED" ? (
                        <span className="text-info">Order Dispatched</span>
                      ) : singleOrderDetails?.status === "ORDERDELIVERED" ? (
                        <span className="text-success">Order Delivered</span>
                      ) : singleOrderDetails?.status === "PENDING" ? (
                        <span className="text-warning">Order Pending</span>
                      ) : (
                        // <span className="text-danger">Order Canceled</span>
                        ""
                      )}
                    </p>
                  </Col>
                  <Col sm={12}>
                    <h3 className="mt-3">User details</h3>
                  </Col>
                  <Col sm={4}>
                    <h5>Full Name</h5>
                  </Col>
                  <Col sm={8}>
                    <p>{singleOrderDetails?.user?.full_name}</p>
                  </Col>
                  <Col sm={4}>
                    <h5>Email</h5>
                  </Col>
                  <Col sm={8}>
                    <p>{singleOrderDetails?.user?.email}</p>
                  </Col>
                  <Col sm={12}>
                    <h3 className="mt-3">Billing address</h3>
                  </Col>
                  <Col sm={4}>
                    <h5>Full Name</h5>
                  </Col>
                  <Col sm={8}>
                    <p>{singleOrderDetails?.billing_address?.full_name}</p>
                  </Col>
                  <Col sm={4}>
                    <h5>Phone Number</h5>
                  </Col>
                  <Col sm={8}>
                    <p>{singleOrderDetails?.billing_address?.mobile}</p>
                  </Col>
                  <Col sm={4}>
                    <h5>Address</h5>
                  </Col>
                  <Col sm={8}>
                    <p>
                      {singleOrderDetails?.billing_address?.address_line1}{" "}
                      {singleOrderDetails?.billing_address?.address_line2},{" "}
                      {singleOrderDetails?.billing_address?.city},{" "}
                      {singleOrderDetails?.billing_address?.country},{" "}
                      {singleOrderDetails?.billing_address?.postal_code}
                    </p>
                  </Col>
                  <Col sm={12}>
                    <h3 className="mt-3">Products</h3>
                  </Col>
                  {singleOrderDetails?.order_details?.map((item) => (
                    <Col sm={3}>
                      <figure>
                        <img
                          src={
                            process.env.REACT_APP_IMAGE_BASE_URL +
                            item?.products?.featured_img
                          }
                          alt="prod img"
                        />
                      </figure>
                      <h5
                        dangerouslySetInnerHTML={{
                          __html: item?.products?.name,
                        }}
                      />
                      <p>Quantity: {item?.qty}</p>
                    </Col>
                  ))}
                </Row>
              )}
            </Container>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ViewOrder;

import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { fetchAddressDetails } from "../../http/apiService";
import { toast } from "react-toastify";

function AdressDetailPop(props) {
  const auth_token = useSelector((state) => state.user.User_Data.auth_token);
  const [AdrsDetail, setAdrsDetail] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const getAddressDetails = async (id) => {
    setIsloading(true);
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      const response = await fetchAddressDetails(id, header);
      if (response.status === 200 || response.status === 201) {
        setAdrsDetail(response?.data);
        setIsloading(false);
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
      toast.error("Something Went Wrong!", {
        autoClose: 3000,
        theme: "dark",
      });
      setIsloading(false);
    }
  };
  useEffect(() => {
    if (props?.AdrsDetail) {
      getAddressDetails(props?.AdrsDetail);
    }
  }, [props?.AdrsDetail]);
  return (
    <>
      <Modal
        show={props?.show}
        onHide={props?.handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        {isLoading ? (
          <>
            <Modal.Body>
              <div className="row">
                <div className="col col-md-3">
                  <strong>Loading... </strong>{" "}
                </div>
              </div>
            </Modal.Body>
          </>
        ) : (
          <>
            <Modal.Body>
              <div className="row g-2">
                <div className="col col-md-3">
                  <strong>Name: </strong>{" "}
                </div>
                <div className="col col-md-3">{AdrsDetail?.full_name}</div>
                <div className="col-6 col-md-3">
                  <strong>City: </strong>{" "}
                </div>
                <div className="col-6 col-md-3">{AdrsDetail?.city}</div>
              </div>
              <div className="row g-2">
                <div className="col col-md-3">
                  <strong>Phone: </strong>{" "}
                </div>
                <div className="col col-md-3">{AdrsDetail?.mobile}</div>
                <div className="col-6 col-md-3">
                  <strong>Country: </strong>{" "}
                </div>
                <div className="col-6 col-md-3">{AdrsDetail?.country}</div>
              </div>
              <div className="row g-2  mt-2">
                <div className="col-6 col-md-3">
                  <strong>Post Code: </strong>{" "}
                </div>
                <div className="col-6 col-md-3">{AdrsDetail?.postal_code}</div>
              </div>
              <div className="row mt-2 g-2">
                <div className="col-12">
                  <strong>Address Line 1:</strong>
                </div>
                <div className="col-12">{AdrsDetail?.address_line1}</div>
                <div className="col-12">
                  <strong>Address Line 2:</strong>
                </div>
                <div className="col-12">{AdrsDetail?.address_line2}</div>
              </div>
            </Modal.Body>
          </>
        )}
        <Modal.Footer>
          <button className="btn paybn" onClick={props?.handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdressDetailPop;

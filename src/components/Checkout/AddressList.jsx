import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AdressDetailPop from "./AdressDetailPop";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
function AddressList({
  handleInputChange,
  formValues,
  AddressData,
  isAddressLoading,
  DeleteAddressData,
  EditAddressData,
}) {
  const [showAdrsDetail, setshowAdrsDetail] = useState(null);
  const [AdrsDetail, setAdrsDetail] = useState(null);
  const [ShowAdrsDetail, setShowAdrsDetail] = useState(false);
  const [ShowAction, setShowAction] = useState(false);
  const [showActionIndex, setShowActionIndex] = useState(null);

  const handleClose = () => {
    setAdrsDetail(null);
    setShowAdrsDetail(false);
  };
  const handleShow = (Addressdata) => {
    setAdrsDetail(Addressdata);
    setShowAdrsDetail(true);
  };

  return (
    <div className="biling-details" data-aos="fade-up">
      <h2>Shipping Address</h2>
      <div className="row">
        {AddressData?.length > 0
          ? AddressData?.map((item, i) => (
              <>
                <div
                  className="col-12 col-md-6 mb-2"
                  style={
                    i % 2 == 0
                      ? { borderRight: "1px solid black", marginTop: "10px" }
                      : null
                  }
                >
                  <div
                    className="ActionContainer"
                    onMouseEnter={() => {
                      setShowAction(true);
                      setShowActionIndex(i);
                    }}
                    onMouseLeave={() => {
                      setShowAction(false);
                      setShowActionIndex(null);
                    }}
                    onClick={() => {
                      setShowAction(!ShowAction);
                      setShowActionIndex(!showActionIndex == null ? null : i);
                    }}
                  >
                    <div className="DotsIcon">
                      <HiDotsVertical size={20} />
                    </div>
                    {ShowAction && showActionIndex == i ? (
                      <div className="ActionList">
                        <div
                          className="actionList-item"
                          onClick={() => handleShow(item?.id)}
                        >
                          <FaEye size={14} />
                          View
                        </div>
                        <div
                          className="actionList-item"
                          onClick={() => EditAddressData(item?.id)}
                        >
                          <FaEdit size={14} />
                          Edit
                        </div>
                        <div
                          className="actionList-item"
                          onClick={() => DeleteAddressData(item?.id)}
                        >
                          <FaRegTrashAlt size={14} />
                          Delete
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="addressDetail">
                    <Form.Group
                      controlId={item?.id}
                      className="AddressStyle mb-3"
                    >
                      <Form.Check
                        type="radio"
                        name="billing_address_id"
                        // label={`${item?.address_line1} `}
                        value={item?.id}
                        onChange={handleInputChange}
                        checked={formValues?.billing_address_id == item?.id}
                      />
                    </Form.Group>
                    <label for={item?.id}>
                      <span>{item?.full_name}</span>

                      <br />

                      <p style={{ marginBottom: 0 }}>
                        {item?.address_line1},{item?.city}, {"  "}
                        {item?.country} <br />
                        {item?.mobile}
                      </p>
                    </label>
                  </div>
                </div>
              </>
            ))
          : isAddressLoading
          ? "Loading..."
          : "No Address Found!"}
      </div>
      <AdressDetailPop
        handleClose={handleClose}
        handleShow={handleShow}
        show={ShowAdrsDetail}
        AdrsDetail={AdrsDetail}
      />
    </div>
  );
}

export default AddressList;

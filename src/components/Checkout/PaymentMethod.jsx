import React from "react";
import { Form } from "react-bootstrap";
import { BsCreditCard } from "react-icons/bs";
import { SiApplepay, SiSamsungpay } from "react-icons/si";

const PaymentMethod = ({ paymentMethod, handleInputChange }) => {
  return (
    <div className="payment_sec" data-aos="fade-up">
      <h2> Payment Method </h2>
      <Form>
        <Form.Group controlId="apple_pay" className="payment_card_style">
          <Form.Check
            type="radio"
            name="payment_type"
            label="Apple Pay"
            value="apple_pay"
            onChange={handleInputChange}
            checked={paymentMethod == "apple_pay"}
          />
          <SiApplepay fontSize={"24px"} />
        </Form.Group>
        <Form.Group controlId="samsung_pay" className="payment_card_style">
          <Form.Check
            type="radio"
            name="payment_type"
            label="Samsung Pay"
            value="samsung_pay"
            onChange={handleInputChange}
            checked={paymentMethod == "samsung_pay"}
          />
          <SiSamsungpay fontSize={"24px"} />
        </Form.Group>
        <Form.Group controlId="network" className="payment_card_style">
          <Form.Check
            type="radio"
            name="payment_type"
            label="Debit/Credit Card"
            value="network"
            onChange={handleInputChange}
            checked={paymentMethod == "network"}
          />
          <BsCreditCard fontSize={"24px"} />
        </Form.Group>
      </Form>
    </div>
  );
};

export default PaymentMethod;

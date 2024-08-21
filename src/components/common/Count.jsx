import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import useCart from "../../Hooks/useCart";
import { toast } from "react-toastify";

const Count = ({ item, isInnerProduct, count, setCount, stock }) => {
  const { updateCart } = useCart();

  const incrementCount = (item) => {
    if (!isInnerProduct) {
      if (parseInt(item?.qty) < stock) {
        updateCart(item?.cart_id, parseInt(item?.qty) + 1);
      } else {
        toast.warn(`Cannot exceed the stock limit of ${stock}`, {
          autoClose: 3000,
          theme: "dark",
        });
      }
    } else {
      if (count < stock) {
        setCount(count + 1);
      } else {
        toast.warn(`Cannot exceed the stock limit of ${stock}`, {
          autoClose: 3000,
          theme: "dark",
        });
      }
    }
  };
  const decrementCount = (item) => {
    if (!isInnerProduct) {
      if (item?.qty > 1) {
        updateCart(item?.cart_id, parseInt(item?.qty) - 1);
      }
    } else if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <div className="mt-2">
        <div className="count_wrape d-flex justify-content-between align-items-center">
          <FaMinus
            onClick={() => decrementCount(item)}
            className="quant_icon"
          />
          <span>{!isInnerProduct ? item?.qty : count}</span>
          <FaPlus onClick={() => incrementCount(item)} className="quant_icon" />
        </div>
      </div>
    </>
  );
};
export default Count;

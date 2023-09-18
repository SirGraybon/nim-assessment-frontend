import { useNavigate } from "react-router";
import React, { useState } from "react";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [validator, setValidator] = useState({});
  const navigate = useNavigate();

  const placeOrder = async () => {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone,
        address,
        items: order
      })
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      return navigate(`/order-confirmation/${data.id}`);
    }

    return navigate(`/`);
  };
  const validateForm = () => {
    const errorLog = {};
    if (!name) {
      errorLog.name = "Please provide your name.";
    }
    if (phone.length < 10) {
      errorLog.phone = "Please provide a valid phone number.";
    }
    if (!address) {
      errorLog.address = "Please provide a valid delivery address.";
    }
    setValidator(errorLog);
    console.log(phone);

    const valid = Object.keys(errorLog).length < 1;
    console.log(valid);
    if (valid) {
      placeOrder();
    }
  };
  
  const formatPhone = (value) => {
    if (!value) setPhone(value);
    const numbersOnly = value.replace(/[^0\d]/g, "");
    console.log(value[10])
    console.log(numbersOnly.length);
    
    if (numbersOnly.length < 4) return (numbersOnly);
    
    if (numbersOnly.length < 7)
    return (`(${numbersOnly.slice(0, 3)}) ${numbersOnly.slice(3)}`);
  return (
    `(${numbersOnly.slice(0, 3)}) ${numbersOnly.slice(
      3,
      6
      )}-${numbersOnly.slice(6,10)}`
      );
    };

    const handleChange = (e) => {
      const formattedPhone = formatPhone(e.target.value)
      setPhone(formattedPhone)
  
    };
  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
              />
              {validator.name && (
                <div className={styles.invalid}> {validator.name} </div>
              )}
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tel">
              Phone
              <input
                pattern="[0-9]"
                type="phone"
                value={phone}
                onChange={(e) => {
                  e.preventDefault();

                  handleChange(e);
                }}
                id="phone"
              />
              {validator.phone && (
                <div className={styles.invalid}> {validator.phone} </div>
              )}
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="phone"
                id="address"
              />
              {validator.address && (
                <div className={styles.invalid}> {validator.address} </div>
              )}{" "}
            </label>
          </div>
        </form>

        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              validateForm();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;

import styles from "./styles/OrderConfirmation.module.css";

function OrderConfirmation(props) {
  const { order } = props;
  const { name, id, address, items, phone } = order;

  const subTotal =
    items && items.reduce((total, current) => total + current.item.price, 0);
  const tax = subTotal * 1.13 - subTotal;
  const serviceFee = 1.0;
  const deliveryFee = 5.0;
  // const total = subTotal && subTotal + tax + serviceFee + deliveryFee;

  return (
    <div className="page">
      <div className={styles.orderConfirmationComponent}>
        <div className={styles.title}>Thanks for your order!</div>
        <div className={styles.receipt}>
          {items &&
            items.map((item) => (
              <div className={styles.item} key={item.item.name}>
                <div className={styles.itemName}>{item.quantity}</div>
                <div className={styles.itemDescription}>
                  <div className={styles.itemName}>{item.item.name}</div>
                  <div>{item.item.description}</div>
                </div>
                <div className={styles.itemAttribute}>
                  ${item.item.price}.00
                </div>
              </div>
            ))}
          <div className={styles.totals}>
            <div className={styles.totalsLine}>
              <div>Sub Total</div>

              <div>${subTotal}.00</div>
            </div>

            <div className={styles.totalsLine}>
              <div>Tax</div>

              <div>${tax.toFixed(2)}</div>
            </div>
            <div className={styles.totalsLine}>
              <div>service fee</div>

              <div>${serviceFee}.00</div>
            </div>
            <div className={styles.totalsLine}>
              <div>delivery</div>

              <div>${deliveryFee}.00</div>
            </div>
            <div className={styles.totalsLine}>
              <div>Total</div>

              {/* <div>${total.toFixed(2)}</div> */}
            </div>
          </div>
          <div className={styles.customerData}>
            <p>Your order number: {id} </p>
            <p>
              {name} | {phone}
            </p>
            <p>{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;

import styles from "./styles/OrderConfirmation.module.css";

function OrderConfirmation(props) {
  const { name, orderId, address, items } = props;
  const firstName = name.split(" ");
  const totalPrice =
    items && items.reduce((total, current) => total + current.item.price, 0);

  return (
    <div className="page">
      <div className={styles.orderConfirmationComponent}>
        <div className={styles.title}>Thanks for your order, {firstName[0]}!</div>
        <p>{name}</p>
        <p>{address}</p>
        <p>Order Number: {orderId} </p>
        {items &&
          items.map((item) => (
            <div className={styles.item}>
              <div>{item.quantity}</div>
              <div className={styles.itemDescription}>
                <div>{item.item.name}</div>
                <div>{item.item.description}</div>
              </div>
              <div>${item.item.price}.00</div>
            </div>
          ))}
        <div className={styles.item}>
          <div>Sub Total</div>
          <div className={styles.dottedLine}> </div>
          
          <div>${totalPrice}.00</div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;

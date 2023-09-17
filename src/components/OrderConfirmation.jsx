// import styles from "./styles/OrderConfirmation.module.css"

function OrderConfirmation(props) {
  const { name, orderId, address, items } = props;

  return (
    <div>
      <h1>Thank you for your order!</h1>
      <p>Order Number: {orderId} </p>
      <p>{name}</p>
      <p>{address}</p>
      <td>
        {items &&
          items.map((item) => (
            <tr>
              <td>{item.item.name}</td>
              <td>{item.item.price}</td>
              <td>{item.item.description}</td>
            </tr>
          ))}
      </td>
    </div>
  );
}

export default OrderConfirmation;

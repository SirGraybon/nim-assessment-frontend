import { useEffect, useState } from "react";
import { useParams } from "react-router";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
  const [order, setOrder] = useState({ name: "test" });
  const { id } = useParams();

  const getOrder = async () => {
    const response = await fetch(`/api/orders/${id}`);
    const orderData = await response.json();

    setOrder(orderData);
  };

  useEffect(() => {
    getOrder();
  }, []);

  return <OrderConfirmation order={order} />;
}
export default ConfirmationPage;

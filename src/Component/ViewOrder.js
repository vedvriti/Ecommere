import React, { Component } from "react";
import axios from "axios";

class GetOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [] 
    };
    this.fetchOrders = this.fetchOrders.bind(this);
  }

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders() {
    axios
      .get("https://localhost:7185/api/order/orders/1")
      .then((res) => {
        const orders = res.data.$values; 
        this.setState({ orders });
        console.log(orders); 
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  render() {
    return (
      <div style={styles.container}>
        <div>
          <h2 style={styles.title}>Orders</h2>
          <ul style={styles.list}>
            {this.state.orders.map((order) => (
              <li key={order.orderId} style={styles.listItem}>
                <strong>Order ID:</strong> {order.orderId} <br />
                <strong>Customer Name:</strong> {order.customerName} <br />
                <strong>Total Amount After Discount:</strong> {order.totalAmountAfterDiscount} <br />
                <strong>Order Date:</strong> {order.orderDate} <br />
                <strong>Shipping Address:</strong> {order.shippingAddress} <br />
                <br />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

// Define styles as an object
const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
    textTransform: "uppercase",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderLeft: "6px solid #2196F3", 
  },
};

export default GetOrder;

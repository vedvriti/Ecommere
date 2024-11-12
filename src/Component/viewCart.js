
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetItemsFromCart = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("https://localhost:7185/api/Cart/items")
      .then((res) => {
        const productsData = res.data.$values.map(item => ({
          ...item,
          totalPrice: item.quantity * item.price // Calculate total price for each item
        }));
        setProducts(productsData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const handlePlaceOrder = () => {
    navigate('/checkout');
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`https://localhost:7185/api/Cart/delete-item/${productId}`);

      if (response.status === 200) {
        fetchProducts();
      } else {
        console.error("Failed to delete item. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const response = await axios.put(`https://localhost:7185/api/Cart/update-item/${productId}?quantity=${newQuantity}`);

      if (response.status === 200) {
        fetchProducts();
      } else {
        console.error("Failed to update quantity. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div>
        <h2>Products:</h2>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Product</th>
              <th style={styles.tableHeader}>Quantity</th>
              <th style={styles.tableHeader}>Price</th>
              <th style={styles.tableHeader}>Total Price</th>
              <th style={styles.tableHeader}>Actions</th>
              <th style={styles.tableHeader}>Increment</th>
              <th style={styles.tableHeader}>Decrement</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.cartItemId}>
                <td style={styles.tableCell}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={item.productImage}
                      alt={`Product ${item.productId}`}
                      style={{
                        width: "80px",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <h3>{item.description}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </td>
                <td style={styles.tableCell}>{item.quantity}</td>
                <td style={styles.tableCell}>{item.price}</td>
                <td style={styles.tableCell}>{item.totalPrice}</td>
                <td style={styles.tableCell}>
                  <button
                    onClick={() => handleDelete(item.productId)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
                <td style={styles.tableCell}>
                  <button
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                    style={styles.quantityButton}
                  >
                    +
                  </button>
                </td>
                <td style={styles.tableCell}>
                  <button
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                    style={styles.quantityButton}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <button
          onClick={handlePlaceOrder}
          style={styles.placeOrderButton}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
  },
  tableHeader: {
    border: "1px solid #dddddd",
    padding: "8px",
    textAlign: "left",
  },
  tableCell: {
    border: "1px solid #dddddd",
    padding: "8px",
    textAlign: "left",
  },
  placeOrderButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginRight: "10px",
  },
  deleteButton: {
    padding: "8px 16px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    marginRight: "5px",
  },
  quantityButton: {
    padding: "8px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    marginRight: "5px",
  },
};

export default GetItemsFromCart;



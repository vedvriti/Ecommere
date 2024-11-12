import React, { Component } from "react";
import axios from "axios";
import './Product.css';

class GetProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts() {
    axios
      .get("https://localhost:7185/api/Product")
      .then((res) => {
        const products = res.data.$values;
        this.setState({ products });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }
  handleSubmit = async (productId) => {
    try {
      const response = await axios.post(
        `https://localhost:7185/api/Cart/add-item`,
        { customerId :1, productId: productId, quantity : 5}
      );
      console.log("Post Created", response.data);
      alert("Item has been added to your cart , view your Shopping Bag!")
    } catch (error) {
      console.log(error);
    }
  };
 

  render() {
    return (
      <div className="product-list">
        {this.state.products.map((product) => (
          <div key={product.productId} className="product-card">
            <img
              src={product.productImage}
              alt={product.name}
              className="product-image"
              width="150"
              height="150"
            />
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">{product.price}</p>{" "}
              {/* Assuming price is in cents */}
              <button className="add-to-cart-button" onClick={() => this.handleSubmit(product.productId)}> Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default GetProducts;

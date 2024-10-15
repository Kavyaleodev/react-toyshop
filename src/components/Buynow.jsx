import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CloseButton } from 'react-bootstrap'; // Import Bootstrap CloseButton
import './BuyNow.css'; 

const BuyNow = () => {
  const { productId } = useParams(); 
  const navigate = useNavigate(); // Use navigate to redirect to other pages
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({
    product_id: productId,  
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    mobile_number: ''
  });

  // Fetch the product data using the productId
  useEffect(() => {
    fetch(`http://localhost:4000/product?product_name=${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data[0])) // Assuming the product is returned as an array
      .catch((error) => console.error('Error fetching product:', error));
  }, [productId]);

  // Handle form submission for purchasing
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData) // Send the form data
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Purchase successful:', data);
        alert('Purchase completed successfully!');
      })
      .catch((error) => console.error('Error processing purchase:', error));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle closing the BuyNow page
  const handleClose = () => {
    navigate('/'); // Navigate back to the home page
  };

  return (
    <div className="buy-now-container">
      <div className="close-button-container">
        <CloseButton onClick={handleClose} aria-label="Close" />
      </div>

      <h2>Buy Now</h2>
      <h3>{product.product_name}</h3>
      <p>Price: ${product.price}</p>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} required />
        <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} required />
        <input type="text" name="mobile_number" placeholder="Mobile Number" value={formData.mobile_number} onChange={handleInputChange} required />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default BuyNow;

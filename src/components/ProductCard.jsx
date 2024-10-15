// components/ProductCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'; // Import the CSS file

const ProductCard = ({ item, handleAddToCart }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate(`/BuyNow/${item.product_id}`);
  };

  return (
    
    <Card className="product-card" style={{ width: '18rem', marginBottom: '20px' }}>
      <Card.Img variant="top" src={item.image_url} />
      <Card.Body>
        <Card.Title>{item.product_name}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <div className='buy-cart'>
        <Button variant="primary" onClick={handleBuyNow}>
          Buy now
        </Button>
        <Button
          variant="primary"
          style={{ marginLeft: '10px' }}
          onClick={() => handleAddToCart(item)}
        >
          Add to cart
        </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

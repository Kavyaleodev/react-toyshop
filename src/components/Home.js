import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Home = ({ data }) => {
  return (
    <div className='toy'>
      {data.map(item => (
        <Card key={item.product_id} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={item.image_url} />
          <Card.Body>
            <Card.Title>{item.product_name}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
            <Button variant="primary">Buy now</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Home;

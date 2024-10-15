import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Form, Button, Modal } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login.jsx';
import BuyNow from './components/Buynow.jsx';
import ImageSlider from './components/ImageSlider';
import ProductCard from './components/ProductCard'; 
import VideoComponent from "./components/Video.jsx";
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import SortByAge from './components/SortByAge.jsx';
import ShopByChar from './components/ShopByChar.jsx';
import SearchSharpIcon from '@mui/icons-material/SearchSharp'; // Import the search icon

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchActive, setSearchActive] = useState(false); 

  // Fetch product data
  useEffect(() => {
    fetch('http://localhost:4000/data')
      .then(response => response.json())
      .then(data => {
        setData(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setData([]);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchActive(true);
    fetch(`http://localhost:4000/product?product_name=${searchQuery.toLowerCase()}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Product not found');
        }
        return response.json();
      })
      .then(product => {
        setFilteredData(product);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setFilteredData([]);
      });
  };

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    alert(`${item.product_name} has been added to the cart!`);
  };

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  const productsToDisplay = filteredData.length > 0 ? filteredData : data;

  // Define the Barbie product within MainContent
  const barbieProduct = {
    product_id: 101,
    product_name: "Barbie Dreamhouse",
    description: "Discover endless storytelling with Barbie® Dreamhouse™",
    image_url: "/images/barbie_logo.png"
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Toy Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ marginRight: '10px' }}>Home</Nav.Link>
          </Nav>
          <Form inline onSubmit={handleSearch} className="d-flex">
  <Form.Control
    type="text"
    placeholder="Search Toys . . ."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="mr-sm-2"
    style={{ marginTop: '20px', marginLeft: '0px', marginRight: '10px', marginBottom: '0px', width: '260%', padding: '8px' }}
  />
  <Button type="submit" variant="outline-success" style={{ border: 'none', background: 'none' }}>
    <SearchSharpIcon style={{ fontSize: '30px', color: 'white' }} />
  </Button>
  <LoginButton />
  <Button
    variant="light"
    onClick={handleShowCart}
    style={{ marginLeft: '10px' }}
  >
    Cart ({cartItems.length})
  </Button>
  <a href="mailto:kavyalakshmi395@gmail.com">
    <button className="cta2" type="button" style={{ marginLeft: '10px' }}>Contact</button>
  </a>
</Form>

        </Container>
      </Navbar>

      <MainContent
        productsToDisplay={productsToDisplay}
        cartItems={cartItems}
        handleAddToCart={handleAddToCart}
        showCart={showCart}
        handleCloseCart={handleCloseCart}
        handleShowCart={handleShowCart}
        barbieProduct={barbieProduct}
        searchActive={searchActive}
      />
    </Router>
  );
}

function MainContent({ productsToDisplay, cartItems, handleAddToCart, showCart, handleCloseCart, searchActive, barbieProduct }) {
  const location = useLocation();

  return (
    <>
      <div className="App">
        {!searchActive && !['/Login', '/BuyNow'].includes(location.pathname) && <ImageSlider />}
      </div>

      <Modal show={showCart} onHide={handleCloseCart}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <h5>{item.product_name}</h5>
                <p>{item.description}</p>
                <hr />
              </div>
            ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCart}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Routes>
        <Route path="/" element={
          <div className='toy'>
            {productsToDisplay.length === 0 ? (
              <p>No products found.</p>
            ) : (
              productsToDisplay.map(item => (
                <ProductCard 
                  key={item.product_id} 
                  item={item} 
                  handleAddToCart={handleAddToCart} 
                />
              ))
            )}

            <div className='video-container'>
              <div><VideoComponent /></div>
              <div>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={barbieProduct.image_url} className="card-image" />
                  <Card.Body>
                    <Card.Title>{barbieProduct.product_name}</Card.Title>
                    <Card.Text style={{ paddingTop: '20px', fontSize: '14px', textAlign: 'justify', fontWeight: 'normal' }}>
                      {barbieProduct.description}
                    </Card.Text>
                    <BuyNowButton productId={barbieProduct.product_id} />
                  </Card.Body>
                </Card>
              </div>
            </div>


            <div className='shopby'>
            <SortByAge />
            <ShopByChar />
            </div>

            
          </div>
        } />
        <Route path="/Login" element={<Login />} />
        <Route path="/BuyNow/:productId" element={<BuyNow />} />
      </Routes>
    </>
  );
}

function BuyNowButton({ productId }) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate(`/BuyNow/${productId}`);
  };

  return (
    <Button variant="primary" onClick={handleBuyNow}>
      Buy now
    </Button>
  );
}

function LoginButton() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/Login');
  };

  return (
    <Button
      variant="outline-light"
      onClick={handleLogin}
      style={{ marginLeft: '10px' }}
    >
      Login
    </Button>
  );
}

export default App;

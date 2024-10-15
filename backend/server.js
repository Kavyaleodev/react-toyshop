const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 4000;  
const SECRET_KEY = 'your_jwt_secret';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "toyshop"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database!");
});


app.post('/buy', (req, res) => {
  const { product_id, name, address, city, state, pincode, mobile_number } = req.body;

  // SQL query to insert the purchase into the database
  const query = 'INSERT INTO purchases (product_id, name, address, city, state, pincode, mobile_number) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [product_id, name, address, city, state, pincode, mobile_number], (err, results) => {
    if (err) {
      console.error('Error inserting purchase data:', err);
      return res.status(500).json({ message: 'Error saving purchase data' });
    }
    res.json({ message: 'Purchase completed successfully!', purchaseId: results.insertId });
  });
});
app.get('/purchases', (req, res) => {
  const query = 'SELECT * FROM purchases';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching purchases:', err);
      return res.status(500).json({ message: 'Error fetching purchases' });
    }
    res.json(results);
  });
});




// API Endpoint to get a product by name
app.get('/product', (req, res) => {
  const { product_name } = req.query; 
  const query='SELECT * FROM stocks WHERE LOWER(product_name) = LOWER(?)';
  db.query(query, [product_name], (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Error fetching data');
    }

    if (result.length === 0) {
      return res.status(404).send('Product not found');  // Handle case when no product is found
    }

    res.json(result); 
  });
});

// API Endpoint to get cart items for a user
app.get('/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  
  db.query('SELECT * FROM cart WHERE user_id = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error fetching cart:', err);
      return res.status(500).send('Error fetching cart');
    }
    res.json(result);
  });
});

// API Endpoint to add item to cart
app.post('/cart', (req, res) => {
  const { userId, productId } = req.body;

  db.query('INSERT INTO cart (user_id, product_id) VALUES (?, ?)', [userId, productId], (err, result) => {
    if (err) {
      console.error('Error adding item to cart:', err);
      return res.status(500).send('Error adding item to cart');
    }
    res.status(201).send('Item added to cart');
  });
});

app.delete('/cart', (req, res) => {
  const { userId, productId } = req.body;

  db.query('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId], (err, result) => {
    if (err) {
      console.error('Error removing item from cart:', err);
      return res.status(500).send('Error removing item from cart');
    }
    res.send('Item removed from cart');
  });
});

app.post('/api/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO user_db (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [firstName, lastName, email, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM user_db WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, message: 'Login successful' });
  });
});

app.get('/data', (req, res) => {
  db.query("SELECT * FROM stocks", function (err, result, fields) {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.json(result);
  });
});

const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get('/api/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'You are authorized', user: req.user });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

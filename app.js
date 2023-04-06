const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { authorize } = require('./middlewares/auth');
const bcrypt = require('bcryptjs');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const adminRoutes = require('./routes/admin');
app.use('/admin', authorize(['admin']), adminRoutes);

const shopRoutes = require('./routes/shop');
app.use(authorize(['admin', 'user']), shopRoutes);

app.use(errorController.get404);

mongoose
  .connect('mongodb://mongo:27017/shopdb', { useNewUrlParser: true })
  .then(_ => {
    User.findOne().then(async user => {
      if (user) return;

      const hashedPassword = await bcrypt.hash('admin', 10);
      const newUser = new User({ name: 'Admin', email: 'admin@shop.com', password: hashedPassword, role: 'admin' });
      newUser.save();
    });
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });

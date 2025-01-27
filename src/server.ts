import express from 'express';
import router from './router';
import morgan from 'morgan';
import { protect } from './modules/auth';
import { createUser, signIn } from './handlers/user';

const app = express();

const customLogger = (message) => (req, res, next) => {
  console.log(`Hello from ${message}`)
  next()
}

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   req.shh__secret = 'doggy'
//   res.status(401)
//   res.send('Nope')
// });
app.use(customLogger('customer logger'));


app.use('/api', protect, router);  // /api/products

app.post('/user', createUser);
app.post('/signin', signIn);

export default app;

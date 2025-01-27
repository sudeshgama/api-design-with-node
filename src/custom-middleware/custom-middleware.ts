import express from 'express';

const middleware = express();

middleware.use((req, res, next) => {
  req.shh__secret = 'doggy'
  res.status(401)
  res.send('Nope')
});

export default middleware;


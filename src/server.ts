import express from 'express';

const app = express();

app.get("/", (req, res) => {
  // res.sendFile(path.resolve("pages/index.html"));
  res.status(200);
  res.json({ message: "hello" });
});

export default app;

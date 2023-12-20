/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';

const PORT = 3000;
const HOST = 'localhost';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Status: 200 OK!',
  });
});

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT} on http://${HOST}:${PORT}`);
});

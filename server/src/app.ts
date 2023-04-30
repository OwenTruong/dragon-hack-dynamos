import express, { Express } from "express";
import authRouter from "../routes/auth";
import shelterRouter from "../routes/shelter";


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/api', authRouter);
app.use('/api/shelter', shelterRouter);

app.listen(port, () => {
  console.log(`Example app listening on https://localhost:${port}`)
});
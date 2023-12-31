import express from "express";
import dotenv from "dotenv";
import UseRoute from "./routes/UseRoute";
import cors from 'cors'
import ExportRouter from "./middlewares/AuthLoguin";
const port = process.env.PORT || 3000;
const app = express();
dotenv.config();


app.use(express.json());
app.use(UseRoute)
app.use(ExportRouter)
app.use(cors)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
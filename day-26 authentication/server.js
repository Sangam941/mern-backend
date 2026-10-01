import express from "express";
import dotenv from "dotenv";
import {db} from "./src/config/dbConnection.js"
import ProductRouter from "./src/routes/product.routes.js"
import AuthRouter from "./src/routes/auth.routes.js"
import cors from 'cors'

const app = express();

dotenv.config();
app.use(express.json())
app.use(cors({
  origin:"http://localhost:5173"
}))

const port = process.env.PORT;

// save image in db -> comsume huge storage
// actual image saves in the cloud storage
// url -> save that url link in our db

db()
// product apis route
app.use("/api", ProductRouter);
app.use('/api/auth', AuthRouter)

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});


// cloudinary -> cloud platform
// multer ->package 


// authentication / autorization

// register and login

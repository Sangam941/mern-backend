import express from "express";
import dotenv from "dotenv";
import {db} from "./src/config/dbConnection.js"
import ProductRouter from "./src/routes/product.routes.js"

const app = express();
dotenv.config();
app.use(express.json())

const port = process.env.PORT;

// save image in db -> comsume huge storage
// actual image saves in the cloud storage
// url -> save that url link in our db

db()
// product apis route
app.use("/api", ProductRouter);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});


// cloudinary -> cloud platform
// multer ->package 

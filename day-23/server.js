import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();
app.use(express.json())

const port = process.env.PORT;


// connect database with the server
const db = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connection successfully...")
    } catch (error) {
        console.log("ERROR in db connection: ", error.message)
        process.exit(1)
    }
}

db()


//  create product schema
const ProductSchema = new mongoose.Schema({
    name:{
        type:String
    },
    desc:{
        type:String,
    },
    price:{
        type: Number,
    }
}, {timestamps:true})


// create product model
const ProductModel = mongoose.model("Products", ProductSchema)

// model = table 
// strudent tablle -> name, id, contact, adreess -> student model
// teacher tablle -> teache model
// product table  -> product model

// fetch all data
app.get("/api", async (req, res) => {

    // fetch all data from mongodb db
    const data = await ProductModel.find()
    console.log(data)

  return res.status(200).json({
    message: "Product data fetched Successfully...",
    data,
  });
});


// fecth particular data through id
app.get("/api/:id", async (req, res) => {
  // fetch the id from params (req.params)
  // console.log(req.params)
  const { id } = req.params;

  // search the product using that params id
  const foundProduct = await ProductModel.findById(id)

  // check wether the data is found or not
  if (!foundProduct) {
    return res.status(404).json({message:"data not found"})
  }

  return res.status(200).json({
    message: "data fetched successfully...",
    data: foundProduct,
  });
});

app.post('/api', async (req, res)=>{

    const {name, desc, price} = req.body

   const data = await ProductModel.create({
    name,
    desc,
    price
   })

    return res.status(201).json({message:"new product created successfully...", data})
 
    // console.log(req.body)
    // const name = req.body.name
    // const desc = req.body.desc
    // const price = req.body.price

// json formate lai accept greko xaina

    
})


// update data

app.patch('/api/:id',  async (req,res)=>{
    const {id} = req.params
    const {price, name, desc} = req.body


    const singleProduct = await ProductModel.findByIdAndUpdate(id,{price, name, desc}, {new:true})

    return res.status(200).json({message:"updated successfully...", singleProduct})
})


// delete
app.delete('/api/:id', async (req,res)=>{
    const {id} = req.params

    await ProductModel.findByIdAndDelete(id)

    return res.status(200).json({message:"product deleted successfully..."})

})

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

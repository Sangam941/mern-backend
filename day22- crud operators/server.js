import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json())

const port = process.env.PORT;

const products = [
  {
    id: 1,
    name: "Shoes",
    desc: "this is awesome shoes",
    price: 1200,
  },
  {
    id: 2,
    name: "T-shirt",
    desc: "this is awesome T-shirt",
    price: 700,
  },
];

// fetch all data
app.get("/api", (req, res) => {
  return res.status(200).json({
    message: "Product data fetched Successfully...",
    data: products,
  });
});


// fecth particular data through id
app.get("/api/:id", (req, res) => {
  // fetch the id from params (req.params)
  // console.log(req.params)
  const { id } = req.params;

  // search the product using that params id
  const foundProduct = products.find((item) => {
    return item.id == id;
  });

  // check wether the data is found or not
  if (!foundProduct) {
    return res.status(404).json({message:"data not found"})
  }

  return res.status(200).json({
    message: "data fetched successfully...",
    data: foundProduct,
  });
});

app.post('/api', (req, res)=>{

    const {name, desc, price} = req.body

    const newProduct = {
        id: Date.now(),
        name,
        desc,
        price
    }

    const data = products.push(newProduct)

    return res.status(201).json({message:"new product created successfully..."})
 
    // console.log(req.body)
    // const name = req.body.name
    // const desc = req.body.desc
    // const price = req.body.price

// json formate lai accept greko xaina

    
})


// update data

app.patch('/api/:id',  (req,res)=>{
    const {id} = req.params
    const {price, name, desc} = req.body


    const singleProduct = products.find((item)=>{
        return item.id == id
    })

    singleProduct.price = price || singleProduct.price
    singleProduct.name = name || singleProduct.name
    singleProduct.desc = desc || singleProduct.desc

    return res.status(200).json({message:"updated successfully..."})
})


// delete
app.delete('/api/:id', (req,res)=>{
    const {id} = req.params

    const index = products.findIndex((item)=>{
        return item.id == id
    })

    if(!index || index==-1){
        return res.status(404).json({message:"product not found"})
    }

    products.splice(index,1)

    return res.status(200).json({message:"product deleted successfully..."})

})

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

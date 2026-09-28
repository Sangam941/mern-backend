import { ProductModel } from "../models/product.model.js";

export const getAllProducts = async (req, res) => {

    // fetch all data from mongodb db
    const data = await ProductModel.find()
    console.log(data)

  return res.status(200).json({
    message: "Product data fetched Successfully...",
    data,
  });
}

export const createNewProduct = async (req, res)=>{

    const {name, desc, price} = req.body

   const data = await ProductModel.create({
    name,
    desc,
    price
   })

    return res.status(201).json({message:"new product created successfully...", data})
   
}

export const getProductById = async (req, res) => {
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
}


export const UpdateProduct = async (req,res)=>{
    const {id} = req.params
    const {price, name, desc} = req.body


    const singleProduct = await ProductModel.findByIdAndUpdate(id,{price, name, desc}, {new:true})

    return res.status(200).json({message:"updated successfully...", singleProduct})
}

export const deleteProduct = async (req,res)=>{
    const {id} = req.params

    await ProductModel.findByIdAndDelete(id)

    return res.status(200).json({message:"product deleted successfully..."})

}
import cloudinary from "../config/cloudinary.config.js";
import { ProductModel } from "../models/product.model.js";
import { uploadTOCloudinary } from "../utils/uploadToCloudinary.js";

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

    const {name, description, price, category} = req.body

    if(!req.file){
      return res.status(404).json({message:"file not found"})
    }

    console.log(req.file.buffer)

    const uploadedFile = await uploadTOCloudinary(req.file.buffer)

    console.log(uploadedFile)

   const data = await ProductModel.create({
    name,
    description,
    price,
    category,
    image:{
      secure_url:uploadedFile?.secure_url,
      public_id: uploadedFile?.public_id
    }
   })

    return res.status(201).json({message:"new product created successfully...", data})
   
}

export const getProductById = async (req, res) => {
  // fetch the id from params (req.params)
  // console.log(req.params)
  const { id } = req.params;

  if(!id){
    return res.json({message:"id is missing"})
  }

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
    const {price, name, description, category} = req.body

    // check wether this id product is existed in db or not
    const productExist = await ProductModel.findById(id)

    if(!productExist){
      return res.status(404).json({message:"product not found"})
    }

    // check wether user provide the updated file or not
    // req.file

    const updatedImageData = {}

    if(req.file){
      // delete the old image from cloudinary
      if(productExist.image && productExist.image.public_id){
        // this will run 
        try {
          // destroy old image
          await cloudinary.uploader.destroy(productExist.image.public_id)
        } catch (error) {
          console.log("Error while destroying images in cloudinary:: "+ error.message)
        }
      }

      // create or add new image in cloudinary
      const imageData = await uploadTOCloudinary(req.file.buffer)

      updatedImageData.image = {
        secure_url: imageData.secure_url,
        public_id: imageData.public_id
      }
      
    }

  // image:{
  //   secure_url,
  //   public_id
  // }


    // update image=> purano image change garerw naya image add grnu ho!

    const singleProduct = await ProductModel.findByIdAndUpdate(id,{price, name, description,category, ...updatedImageData}, {new:true})

    return res.status(200).json({message:"updated successfully...", singleProduct})
}

export const deleteProduct = async (req,res)=>{
    const {id} = req.params

    const Product = await ProductModel.findById(id)
    await cloudinary.uploader.destroy(Product.image.public_id)

    await ProductModel.findByIdAndDelete(id)


    return res.status(200).json({message:"product deleted successfully..."})

}
import cloudinary from 'cloudinary';
import ProductModel from "../models/productModel.js";
import multer from 'multer';
import crypto from 'crypto';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dgdbxflan',
  api_key: '815422861546374',
  api_secret: 'D0WDTamb6curq4B55fBm8N5iTEk',
});

// Multer configuration
const storage = multer.memoryStorage(); // Use memory storage to handle file uploads
const upload = multer({ storage });

const addProduct = async (req, res) => {
  console.log(req.body);
  try {
    upload.single('productImage')(req, res, async (err) => {
      console.log(err);
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const { businessID, productname, productprice } = req.body;
      const imageData = req.file.buffer;

      const productID = crypto.randomBytes(16).toString('hex');

      // Upload image to Cloudinary
      const cloudinaryResponse = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) {
              reject({ message: 'Error uploading image to Cloudinary' });
            } else {
              resolve(result);
            }
          }
        );
        uploadStream.end(imageData);
      });

      const product = await new ProductModel({
        businessID: businessID,
        productID,
        productName: productname,
        productPrice: productprice,
        productImage: cloudinaryResponse.secure_url, // Save Cloudinary URL in the database
      }).save();

      res.json({
        businessID,
        productname,
        productprice,
        imagePath: cloudinaryResponse.secure_url,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
    
        if (!products || products.length === 0) {
          return res.status(404).json({ success: false, error: 'No products found in the database' });
        }
    
        res.status(200).json({ success: true, products });
      } catch (error) {
        console.error('Error in getAllProducts:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
};

const editProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { productname, productprice } = req.body;
    
        // Validation
        if (!productId || !productname || !productprice) {
          return res.status(400).json({ success: false, error: 'Incomplete or invalid data provided' });
        }
    
        const updatedProduct = await ProductModel.findByIdAndUpdate(
          productId,
          { productname, productprice },
          { new: true }
        );
    
        if (!updatedProduct) {
          return res.status(404).json({ success: false, error: 'Product not found' });
        }
    
        res.status(200).json({ success: true, message: 'Product updated successfully', updatedProduct });
      } catch (error) {
        console.error('Error in editProduct:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
    
        // Validation
        if (!productId) {
          return res.status(400).json({ success: false, error: 'Product ID not provided' });
        }
    
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    
        if (!deletedProduct) {
          return res.status(404).json({ success: false, error: 'Product not found' });
        }
    
        res.status(200).json({ success: true, message: 'Product deleted successfully', deletedProduct });
      } catch (error) {
        console.error('Error in deleteProduct:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
};

export { addProduct, getAllProducts, editProduct, deleteProduct };
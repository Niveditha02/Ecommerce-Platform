import Product from "../models/product.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get All Products
export const getProduct = async (req, res) => {
  try {
    const {search, category} = req.query;
    let filter = {};
    if(search){
      // RegExp ($regex) is used to perform partial and flexible string matching in MongoDB
      filter.title = {$regex:search, $options:'i'};//case-sensitive
      
    }

    if(category){
      filter.category = {$regex:category, $options:'i'};
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Product updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
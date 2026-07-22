import product from "../models/product";

//create a product 
export const createProduct = async(req,res)=>{
    try{
        const product = await product.create(res.body);
        res.json({
            message: 'product created successfully',
            product
        });

    }catch(error){
        return res.status(500).json({message:'server error', error});
    }
}

//get all products
export const getProduct = async(req,res)=>{
    try{
        const products = await product.find().sort({createdAt: -1});
        res.json(products);

    }catch(error){
        return res.status(500).json({message:'server error', error});
    }
}

//update product 
export const updateProduct = async(req,res)=>{
    try{
        const updated = await product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json({message:'product updated successfully',
            updated,
        })

    }catch(error){
        return res.status(500).json({message:'server error', error});
    }
}

//delete product 
export const deleteProduct = async(req,res)=>{
    try{
          await product.findByIdAndDelete(req.params.id);
          res.json({message:'product updated successfully'});

    }catch(error){
        return res.status(500).json({message:'server error', error})
    }
}

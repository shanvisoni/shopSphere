
import categoryModel from '../models/categoryModel.js';
import slugify from 'slugify';

export const createCategoryController = async(req,res) => {
 try {
    const {name}=req.body;
    if(!name){
        return res.status(401).send({message:'Name is required'})
    }
    const existingCategory = await categoryModel.findOne({name})
    if(existingCategory){
        return res.status(200).send({
            success:true,
            message:'Category Already Exist'
        })
    }
    const category=await new categoryModel({name,slug:slugify(name)}).save()
    res.status(201).send({
        success:true,
        message:'new category created',
        category
    })
 } 
 catch (error) {
 
  res.status(500).send({
    success:false,
    error,
    message:"Error in Category"
  })  
 }
}

//update category
export const updateCategoryController=async(req,res)=>{
    try {
        const {name}=req.body;
        const {id} =req.params;
        const category=await categoryModel.findByIdAndUpdate(
            id,
            {name,slug:slugify(name)},
    {new:true}
);
res.status(200).send({
    success:true,
    message:"Category Updated Successfully",
    category,
});
    } catch (error) {
    
        res.status(500).send({
          success:false,
          error,
          message:"Error while updating Category"
        })  
    }
}


export const categoryController=async(req,res)=>{
    try {
        const category=await categoryModel.find({});
res.status(200).send({
    success:true,
    message:"All Categories List",
    category,
});
    } catch (error) {
    
        res.status(500).send({
          success:false,
          error,
          message:"Error while getting all Categories"
        })  ;
    }
};

export const singleCategoryController=async(req,res)=>{
    try {
   
        const category=await categoryModel.findOne({ slug:req.params.slug});
res.status(200).send({
    success:true,
    message:"get single Categories success",
    category,
});
    } catch (error) {

        res.status(500).send({
          success:false,
          error,
          message:"Error while getting single Categories"
        })  ;
    }
};

export const deleteCategoryController=async(req,res)=>{
    try {
        const {id} =req.params;
        await categoryModel.findByIdAndDelete(id)
res.status(200).send({
    success:true,
    message:"Category deleted successfully",

});
    } catch (error) {
        res.status(500).send({
          success:false,
          error,
          message:"Error while deleting  Category"
        })  ;
    }
};

const categoryModel = require('../models/categoryModel')
const Category = require('../models/categoryModel')

const setCategory = async(req,res)=>{
    const {title} = req.body
    try {
       if(title){
        const category = new Category({title})
        await category.save()
        res.status(201).json({message:"Category created successfully",category})

       }
       else{
        res.status(400).json({message:"Please enter a title"})
       }
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}
const getAllCategory = async(req,res)=>{
    try {
       const fetchAllCategories = await categoryModel.find({}) 
       res.status(200).json(fetchAllCategories)

    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}
module.exports = {setCategory,getAllCategory}
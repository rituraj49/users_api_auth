import mongoose from "mongoose";
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

// create controller
export const createCategory = async(req, res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({error:"name is rquired!"})
        }
        // check existing
        const existingName = await categoryModel.findOne({name})
        if(existingName){
            return res.status(200).send({
                success: true,
                message: "category already exists"
            })
        }
        // create new
        const newCategory = new categoryModel({
            name,
            slug:slugify(name)
        })
        await newCategory.save();

        return res.status(201).send({
            success: true,
            message: "category created successfully"
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "error while adding category",
            error
        })
    }
}

// get all categories
export const getAllCategories = async(req, res)=>{
    try {
        const result = await categoryModel.find();
        return res.status(200).send({
            success: true,
            message: "categories fetched successfully",
            result
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'error while  fetching categories',
            error
        })
    }
}

// get one category
export const getSingleCategory = async(req, res)=>{
    try {
        // const {slug} = req.params;
        const result = await categoryModel.findOne({slug:req.params.slug})
        return res.status(201).send({
            success: true,
            message: "category fetched successfully",
            result
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "error while fetching category",
            error
        })
    }
}

// get single category by name
export const getSingleCategoryById = async(req, res)=>{
    try {
        // const {slug} = req.params;
        const result = await categoryModel.findOne({_id:req.params.id})
        return res.status(200).send({
            success: true,
            message: "category fetched successfully",
            result
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "error while fetching category",
            error
        })
    }
}

// delete category
export const deleteCategory = async(req, res)=>{
    try {
        const result = await categoryModel.findByIdAndDelete({_id:req.params.id})
        // const result = await categoryModel.deleteOne({slug:req.params.slug})
        return res.status(200).send({
            success: true,
            message: "category deleted successfully",
            result
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "error while deleting category",
            error
        })
    }
}

export const updateCategory = async(req, res)=>{
    try {
        const {id} = req.params
        const {name} = req.body
        const result = await categoryModel.findByIdAndUpdate(
            id, {name, slug:slugify(name)}
        )
        return res.status(200).send({
            success: true,
            message: "category updated successfully",
            result
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "error while updating category",
            error
        })
    }
}
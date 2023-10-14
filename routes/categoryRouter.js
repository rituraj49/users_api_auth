import express from 'express';
import { createCategory,deleteCategory,getAllCategories, getSingleCategory, getSingleCategoryById, updateCategory, getAllCached } from '../controllers/categoryController.js';

const router = express.Router();

// create route
router.post("/create", createCategory)

// get routes
router.get("/all-categories", getAllCategories)
router.get("/cached-categories", getAllCached)
router.get("/single-category/:slug", getSingleCategory)
router.get("/single-category-id/:id", getSingleCategoryById)

// delete route
router.delete("/delete-category/:id", deleteCategory)
// router.delete("/delete-category/:slug", deleteCategory)

// update route
router.put("/update-category/:id", updateCategory)

export default router;
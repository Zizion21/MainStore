const { CategoryModel } = require("../../../models/categories");
const Controller = require("../controller");
const createError= require("http-errors");
const { addCategorySchema, updateCategorySchema } = require("../../validators/admin/category.schema");
const {mongoose}= require("mongoose");

class CategoryController extends Controller{
    async addCategory(req, res, next){
        try {
            await addCategorySchema.validateAsync(req.body);
            const {title, parent}= req.body;
            const category= await CategoryModel.create({title, parent});
            if(!category) throw createError.InternalServerError("Internal Error. Failed to create the category❌");
            return res.status(201).json({
                data:{
                    statusCode: 201,
                    message: "Category added successfully✔️"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async removeCategory(req, res, next){
        try {
            const {id}= req.params;
            const category= await this.checkCategoryExistment(id);
            const deleteResult= await CategoryModel.deleteMany({
                $or: [
                    {_id: category._id},
                    {parent: category._id}
                ]
            })
            // const deleteResult= await CategoryModel.deleteOne({_id: category._id});
            if(deleteResult.deletedCount == 0) throw createError.InternalServerError("Failed to delete the category❗");
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    message: "Category deleted successfully✔️"
                }
            })
            
        } catch (error) {
            next(error)
        }
    }

    async getAllParents(req, res, next){
        try {
            const parents= await CategoryModel.find({parent: undefined}, {__v: 0});
            return res.status(200).json({
                data:{
                    statusCode: 200,
                    parents
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getChildrenOfParent(req, res, next){
        try {
            const {parent}= req.params;
            const children= await CategoryModel.find({parent}, {__v: 0, parent: 0})
            return res.status(200).json({
                data:{
                    statusCode: 200,
                    children
                }
            })
            
        } catch (error) {
            next(error)
        }
    }

    async getAllCategories(req, res, next){
        try {
            // const categories= await CategoryModel.aggregate([
            //     {
            //         $graphLookup:{
            //             from: "categories",
            //             startWith: "$_id",
            //             connectFromField: "_id",
            //             connectToField: "parent",
            //             maxDepth: 5,
            //             depthField: "depth",
            //             as: "children"
            //         }
            //     },
            //     {
            //         $project: {
            //             __v: 0,
            //             "children.__v": 0,
            //             "children.parent": 0
            //         }
            //     },
            //     {
            //         $match: {
            //             parent: undefined
            //         }
            //     }
            // ])
            const categories= await CategoryModel.find({parent: undefined}, {__v: 0})
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    categories
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async checkCategoryExistment(id){
        const category= await CategoryModel.findById(id);
        if(!category) throw createError.NotFound("Category not found❗");
        return category
    }

    async getCategoryById(req, res, next){
        try {
            const {id: _id}= req.params;
            const category= await CategoryModel.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(_id) }
                },
                {
                    $graphLookup:{
                        from: "categories",
                        startWith: "$_id",
                        connectFromField: "_id",
                        connectToField: "parent",
                        maxDepth: 5,
                        depthField: "depth",
                        as: "children"
                    }
                },
                {
                    $project: {
                        __v: 0,
                        "children.__v": 0,
                        "children.parent": 0
                    }
                }
            ])
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    category
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getCategoriesWithoutPopulate(req, res, next){
        try {
            const categories= await CategoryModel.aggregate([
                {$match: {}},
                {
                    $project: {
                        __v: 0
                    }
                }
            ])
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    categories
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async editCategoryTitle(req, res, next){
        try {
            const {id}= req.params;
            const {title}= req.body;
            const category= await this.checkCategoryExistment(id);
            await updateCategorySchema.validateAsync(req.body);
            const updateResult= await CategoryModel.updateOne({_id: id}, {$set: {title}});
            if(updateResult.modifiedCount == 0) throw createError.InternalServerError("Failed to update the category. Please try again.")
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    message: "Category updated successfully✔️"
                }
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports={
    CategoryController: new CategoryController()
}
const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");


const categoryController = {
    //!add
    create: asyncHandler(async (req, res) => {
        const { name, type } = req.body;
        if (!name || !type) {
            throw new Error("Name and type are required for creating a category");
        }
        //convert the name to lowercase
        const normalizedName = name.toLowerCase();
        //! Check if the type is valid
        const validTypes = ['income', 'expense'];
        if (!validTypes.includes(type.toLowerCase())) {
            throw new Error("Invalid category type" + type);
        }
        //!Check if category already exists on the user
        const categoryExists = await Category.findOne({
            name: normalizedName,
            user: req.user,
        });
        if (categoryExists) {
            throw new Error(
                `Category ${categoryExists.name} already exists in the database`
            );
        }
        //! Create the category
        const category = await Category.create({
            name: normalizedName,
            user: req.user,
            type,
        });
        res.status(201).json(category);
    }),

    //!Lists
    lists: asyncHandler(async (req, res) => {
        const caterories = await Category.find({ user: req.user });
        res.status(200).json(caterories);
    }),

    //!update
    update: asyncHandler(async (req, res) => {

        const categoryID = req.params.id;
        const { name, type } = req.body;
        const normalizedName = name.toLowerCase();
        const category = await Category.findById(categoryID);

        if (!category && category.user.toString() !== req.user.toString()) {
            throw new Error("Category not found or user not authorized");
        }
        const oldName = category.name;
        //! Update category properties
        category.name = normalizedName;
        category.type = type;
        const updatedCategory = await category.save();
        //Update affected transaction
        if (oldName !== updatedCategory.name) {
            await Transaction.updateMany(
                {
                    user: req.user,
                    category: oldName,
                },
                { $set: { category: updatedCategory.name } }
            );
        }
        res.json(updatedCategory);

    }),

    //! delete
    delete: asyncHandler(async (req, res) => {
        const categoryID = req.params.id;
        const category = await Category.findById(categoryID);
        if (category && category.user.toString() === req.user.toString()) {
            const defaultCategory = "Uncategorized";
            await Transaction.updateMany(
                {
                    user: req.user,
                    category: category.name,
                },
                { $set: { category: defaultCategory } }
            );
            await Category.findByIdAndDelete(req.params.id);
            res.json({ message: "Category deleted successfully" });
        } else {
            throw new Error("Category not found or user not authorized");
        }

    }),


}


module.exports = categoryController;
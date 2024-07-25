const asyncHandler = require("express-async-handler");
const Transaction = require("../model/Transaction");


const transcationController = {
    //!add
    create: asyncHandler(async (req, res) => {
        const { type, category, amount, date, description } = req.body;
        if (!amount || !type || !date) {
            throw new Error("Type,amount and date are required for creating a category");
        }
        //!create
        const transaction = await Transaction.create({
            user: req.user,
            type,
            category,
            amount,
            date,
            description
        })
        res.status(201).json(transaction);

    }),

    //!Lists
    getFilteredTranscations: asyncHandler(async (req, res) => {
        const { startDate, endDate, type, category } = req.query;
        let filter = { user: req.user }
        if (startDate) {
            filter.date = { ...filter.date, $gte: new Date(startDate) }
        }
        if (endDate) {
            filter.date = { ...filter.date, $lte: new Date(endDate) }
        }
        if (type) {
            filter.type = type
        }
        if (category) {
            if (category === "ALL") {
                //!no filter is needed
            } else if (category === "Uncategorized") {
                filter.category = "Uncategorized"
            } else {
                filter.category = category
            }

        }
        const transaction = await Transaction.find(filter).sort({ date: -1 });
        res.status(200).json(transaction);
    }),

    //!update
    update: asyncHandler(async (req, res) => {

        const transcation = await Transaction.findById(req.params.id);

        if (transcation && transcation.user.toString() === req.user.toString()) {
            (transcation.type = req.body.type || transcation.type);
            (transcation.category = req.body.category || transcation.category);
            (transcation.amount = req.body.amount || transcation.amount);
            (transcation.date = req.body.date || transcation.date);
            (transcation.description = req.body.description || transcation.description);
            //update
            const updatedTransaction = await transcation.save();
            res.json(updatedTransaction);
        }
    }),


    //! delete
    delete: asyncHandler(async (req, res) => {
        const transcation = await Transaction.findById(req.params.id);
        if (transcation && transcation.user.toString() === req.user.toString()) {
            await Transaction.findByIdAndDelete(req.params.id);
            res.json({ message: "Transaction deleted successfully" });
        } else {
            throw new Error("Transaction not found or user not authorized");
        }
    }),


}


module.exports = transcationController;
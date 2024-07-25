const express = require("express")
const isAuth = require("../middlewares/isAuth");
const transcationController = require("../controllers/transcationCtrl");

const transactionRouter = express.Router();
//!adding
transactionRouter.post('/api/v1/transactions/create', isAuth, transcationController.create);
//!listing
transactionRouter.get('/api/v1/transactions/lists', isAuth, transcationController.getFilteredTranscations);
//!update
transactionRouter.put('/api/v1/transactions/update/:id', isAuth, transcationController.update);
//!delete
transactionRouter.delete('/api/v1/transactions/delete/:id', isAuth, transcationController.delete);

module.exports = transactionRouter;


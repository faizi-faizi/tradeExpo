const express = require("express")
const { addStall, getAllStalls } = require("../controllers/stallController")
const stallRouter = express.Router()

stallRouter.post("/register",addStall);
stallRouter.get("/list",getAllStalls);

module.exports = stallRouter;
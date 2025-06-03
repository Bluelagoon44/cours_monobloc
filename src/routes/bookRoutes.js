const express = require("express")
const router = express.Router()
const bookController = require("../controllers/bookController");
const authguard = require("../services/authguard");

router.get("/addbook", authguard, bookController.getAddBook)
router.post("/addbook", authguard, bookController.postAddBook)

module.exports = router;
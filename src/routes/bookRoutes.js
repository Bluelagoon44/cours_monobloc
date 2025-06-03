const express = require("express")
const router = express.Router()
const bookController = require("../controllers/bookController");
const authguard = require("../services/authguard");

router.get("/addBook", authguard, bookController.getAddBook)
router.post("/addBook", authguard, bookController.postAddBook)

router.get("/deleteBook/:id", authguard, bookController.deleteBook)

router.get("/updateBook/:id", authguard, bookController.getUpdateBook)
router.post("/updateBook/:id", authguard, bookController.postUpdateBook)

module.exports = router;
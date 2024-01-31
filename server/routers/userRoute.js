const express = require("express")
const router = express.Router();
const { bookGroceries, viewAvailableGroceries } = require("../controllers/userController")

router.get('/viewAvailableGroceries',  viewAvailableGroceries)
router.post('/bookGroceries',  bookGroceries)

module.exports = router;
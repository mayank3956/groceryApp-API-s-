const express = require("express")
const router = express.Router();
const { manageInventory, viewGroceries, addGrocery, updateGrocery, removeGrocery } = require("../controllers/adminController")

router.post('/addGrocery', addGrocery)
router.get('/viewGroceries', viewGroceries)
router.delete('/removeGrocery/:id', removeGrocery)
router.put('/updateGrocery/:id', updateGrocery)
router.put('/manageInventory/:id', manageInventory)

module.exports = router;

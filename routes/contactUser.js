const express = require("express");
const { resigterUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();


router.post("/register",resigterUser);
router.post("/login",loginUser);
router.get("/current",validateToken, currentUser);


module.exports = router;
const express = require("express");
const {
  getPremiumController,
  postPremiumController,
} = require("../controller/premiumController");
const router = express.Router();

router.get("/",  getPremiumController);
router.post("/",  postPremiumController);


module.exports = router;

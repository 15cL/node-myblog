const express = require("express");
const {
  updateCates,
  addCates,
  delCates,
  getCates,
} = require("../router_handler/cate");

const router = express.Router();

router.get("/all", getCates);

router.post("/new", addCates);

router.post("/update", updateCates);

router.post("/del", delCates);

module.exports = router;

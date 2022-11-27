const express = require("express");
const {
  updateCates,
  addCates,
  delCates,
  getCates,
} = require("../router_handler/cate");
const { validateCateName } = require("../schema/cate");

const router = express.Router();

router.get("/all", getCates);

router.post("/new",validateCateName, addCates);

router.post("/update",validateCateName, updateCates);

router.post("/del", delCates);

module.exports = router;

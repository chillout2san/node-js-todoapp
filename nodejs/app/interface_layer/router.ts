import express from "express";

export const router = express();
router.use(express.json())

router.get("/", (req, res) => {
  res.send({ name: "taro" });
});

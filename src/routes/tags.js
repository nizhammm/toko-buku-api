const tagControllers = require("../controllers/tags");

const router = require("express").Router();

router.get("/", tagControllers.getAllTag);
router.post("/", tagControllers.createNewTag);
router.delete("/:id", tagControllers.deleteTag);

module.exports = router;
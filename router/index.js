const express = require("express");
const taskController = require("../controllers/controller");
const userController = require("../controllers/controllerAUT");
const router = express.Router();

router.use(express.json());

router.get("/get", taskController.GetData);
router.post("/add", taskController.addData);
router.put("/edit", taskController.editTask);
router.delete("/delete", taskController.deleteTask);
router.get("/sort", taskController.sortData);
router.post("/complete", taskController.markComplete);
router.post("/addWithDeadline", taskController.addTaskWithDeadline);

router.post("/enter", userController.Enter);
router.post("/reg", userController.addData);

module.exports = router;

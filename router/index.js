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
router.post("/findCategory", taskController.FindbyCategory);

router.post("/enter", userController.Enter);
router.post("/reg", userController.addData);
router.put("/editPassword", userController.editPassword);
router.put("/editLogin", userController.editLogin);
router.put("/editFI", userController.editFI);
router.delete("/deleteUser", userController.deleteUser);

module.exports = router;

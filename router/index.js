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
router.post("/findTask", taskController.FindbyName);
router.post("/findDead", taskController.FindbyDead);
router.get("/sortDead", taskController.SortDead);
router.get("/sortCOM", taskController.SortCOM);
router.get("/sortNotCOM", taskController.SortNotCOM)

router.post("/enterLog", userController.Enter);
router.post("/enterEmail", userController.EnterEmail);
router.post("/enterTel", userController.EnterTel);
router.post("/reg", userController.addData);
router.put("/editPassword", userController.editPassword);
router.put("/editLogin", userController.editLogin);
router.put("/editFI", userController.editFI);
router.delete("/deleteUser", userController.deleteUser);

module.exports = router;

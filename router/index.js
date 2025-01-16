const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.use(express.json());

router.get("/get", Controller.GetData);
router.post("/add", Controller.addData);
router.put("/edit", Controller.editTask);
router.delete("/delete", Controller.deleteTask);
router.get("/sort", Controller.sortData);
router.post("/complete", Controller.markComplete);
router.post("/addWithDeadline", Controller.addTaskWithDeadline);
router.post("/findCategory", Controller.FindbyCategory);
router.post("/findTask", Controller.FindbyName);
router.post("/findDead", Controller.FindbyDead);
router.get("/sortDead", Controller.SortDead);
router.get("/sortCOM", Controller.SortCOM);
router.get("/sortNotCOM", Controller.SortNotCOM);

router.post("/enterLog", Controller.Enter);
router.post("/enterEmail", Controller.EnterEmail);
router.post("/enterTel", Controller.EnterTel);
router.post("/enterMultiplayerLog", Controller.EnterMulti);
router.post("/enterMultiplayerEmail", Controller.EnterMultiEmail);
router.post("/enterMultiplayerTel", Controller.EnterMultiTel);
router.post("/reg", Controller.addUserData);
router.put("/editPassword", Controller.editPassword);
router.put("/editLogin", Controller.editLogin);
router.put("/editFI", Controller.editFI);
router.delete("/deleteUser", Controller.deleteUser);

router.post("/enterAdmin", Controller.EnterAdmin);
router.get("/GetID", Controller.GetID);

module.exports = router;

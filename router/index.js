const express = require("express");
const controller = require("../controllers/controller");
const controll = require("../controllers/controllerAUT")
const router = express.Router();


router.get("/get", controller.GetData);

router.use(express.json());


router.post("/add", controller.addData);

router.put("/edit", controller.editTask);

router.delete("/delete", controller.deleteTask);

router.get("/sort", controller.sortData);
router.post("/complete", controller.markComplete);
router.post("/addWithDeadline", controller.addTaskWithDeadline);

router.post("/enter", controll.Enter);
router.post("/reg", controll.addData);
module.exports = router;
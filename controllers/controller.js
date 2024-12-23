const DATA = require("../data/data");

const GetData = (req, res) => {
    const data = DATA.GetData();
    res.status(200).json(data);
};

const addData = (req, res) => {
    const dataFromClient = req.body;
    const result = DATA.addData(dataFromClient.task, dataFromClient.category);

    if (!result) {
        res.status(409).send("УПС! ТАКОЕ ЗАДАНИЕ УЖЕ ЕСТЬ");
        return;
    }

    res.status(200).json(result);
};

const editTask = (req, res) => {
    const { task, newTask } = req.body;
    const result = DATA.editData(task, newTask);

    if (!result) {
        res.status(404).send("Задача не найдена.");
        return;
    }

    res.status(200).json(result);
};

const deleteTask = (req, res) => {
    const { task } = req.body;
    const result = DATA.deleteData(task);

    if (!result) {
        res.status(404).send("Задача не найдена.");
        return;
    }

    res.status(200).send("Задача удалена.");
};

const sortData = (req, res) => {
    const sortedData = DATA.sortTasks();
    res.status(200).json(sortedData);
};

const markComplete = (req, res) => {
    const { task } = req.body;
    const result = DATA.markTaskComplete(task);

    if (!result) {
        res.status(404).send("Задача не найдена.");
        return;
    }

    res.status(200).json(result);
};

const addTaskWithDeadline = (req, res) => {
    const { task, deadline, category } = req.body;
    const result = DATA.addTaskWithDeadline(task, deadline, category);

    res.status(200).json(result);
};


const FindbyCategory = (req, res) => {
    const { cat } = req.body;
    const result = DATA.FindbyCategory(cat); 

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).send("Категория не найдена");
    }
};


module.exports = { GetData, addData, editTask, deleteTask, sortData, markComplete, addTaskWithDeadline, FindbyCategory};

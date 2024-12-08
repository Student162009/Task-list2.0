const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'json/data.json');

let Data = [];

const writeData = (DATA) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(DATA, null, 2));
};

const readData = () => {
    if (Data.length === 0) {
        if (!fs.existsSync(dataFilePath) || fs.readFileSync(dataFilePath).length === 0) {
            Data = [];
        } else {
            try {
                const rawData = fs.readFileSync(dataFilePath);
                Data = JSON.parse(rawData);
            } catch (error) {
                console.error("Ошибка при чтении данных:", error);
                Data = [];
            }
        }
    }
    return Data;
};
readData();

const addData = (task) => {
    const newData = { task };
    Data.push(newData);
    writeData(Data);
    return newData;
};

const editData = (task, newTask) => {
    const taskIndex = Data.findIndex(t => t.task === task);
    if (taskIndex === -1) {
        return null;
    }
    Data[taskIndex] = { task: newTask };
    writeData(Data);
    return Data[taskIndex];
};

const deleteData = (task) => {
    const taskIndex = Data.findIndex(t => t.task === task);
    if (taskIndex === -1) {
        return false; 
    }
    Data.splice(taskIndex, 1);
    writeData(Data);
    return true;
};
const sortTasks = () => {
    return Data.sort((a, b) => a.task.localeCompare(b.task));
};

const markTaskComplete = (task) => {
    const taskIndex = Data.findIndex(t => t.task === task);
    if (taskIndex === -1) {
        return null;
    }
    Data[taskIndex].completed = true;
    writeData(Data);
    return Data[taskIndex];
};
const addTaskWithDeadline = (task, deadline) => {
    const newData = { task, deadline, completed: false };
    Data.push(newData);
    writeData(Data);
    return newData;
};

const checkOverdueTasks = () => {
    const currentDate = new Date();
    Data.forEach(task => {
        if (new Date(task.deadline) < currentDate) {
            task.overdue = true;
        }
    });
    writeData(Data);
};



module.exports = { GetData: () => [...Data], addData, editData, deleteData, sortTasks, addTaskWithDeadline, markTaskComplete };

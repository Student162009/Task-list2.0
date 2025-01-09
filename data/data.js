const fs = require('fs');
const path = require('path');
let LOG = ''; 
let Id = '';
const userTasksDir = path.join(__dirname, 'json/userTasks');

const MultiTasksDir = path.join(__dirname, 'json/MultiTasks');

fs.rmSync(MultiTasksDir, { recursive: true, force: true });

if (!fs.existsSync(userTasksDir)) {
    fs.mkdirSync(userTasksDir);
}

let Data = [];
let UserData = [];

const setUserLog = (login) => {
    Data = [];
    LOG = login;
};

const setMultiID = (login) => {
    Data = [];
    Id = login;
};

const UserLOGFilePath = path.join(__dirname, 'json/dataAUT.json');

const writeUserData = (DATA) => {
    fs.writeFileSync(UserLOGFilePath, JSON.stringify(DATA, null, 2));
};

const readUserData = () => {
    if (UserData.length === 0) {
        if (!fs.existsSync(UserLOGFilePath) || fs.readFileSync(UserLOGFilePath).length === 0) {
            UserData = [];
        } else {
            try {
                const rawData = fs.readFileSync(UserLOGFilePath);
                UserData = JSON.parse(rawData);
            } catch (error) {
                console.error("Ошибка при чтении данных:", error);
                UserData = [];
            }
        }
    }
    return UserData;
};
readUserData();

const writeData = (DATA) => {
    if(Id==''){
    fs.writeFileSync(path.join(__dirname, `json/userTasks/${LOG}.json`), JSON.stringify(DATA, null, 2));
    }else{
    fs.writeFileSync(path.join(__dirname, `json/MultiTasks/${Id}.json`), JSON.stringify(DATA, null, 2));
    }
};

const readData = () => {
    if(Id==''){
    if (Data.length === 0) {
        if (!fs.existsSync(path.join(__dirname, `json/userTasks/${LOG}.json`)) || fs.readFileSync(path.join(__dirname, `json/userTasks/${LOG}.json`)).length === 0) {
            Data = [];
        } else {
            try {
                const rawData = fs.readFileSync(path.join(__dirname, `json/userTasks/${LOG}.json`));
                Data = JSON.parse(rawData);
                console.log(Data);
            } catch (error) {
                console.error("Ошибка при чтении данных:", error);
                Data = [];
            }
        }
    }
}else{
    if (Data.length === 0) {
        if (!fs.existsSync(path.join(__dirname, `json/MultiTasks/${Id}.json`)) || fs.readFileSync(path.join(__dirname, `json/MultiTasks/${Id}.json`)).length === 0) {
            Data = [];
        } else {
            try {
                const rawData = fs.readFileSync(path.join(__dirname, `json/MultiTasks/${Id}.json`));
                Data = JSON.parse(rawData);
                console.log(Data);
            } catch (error) {
                console.error("Ошибка при чтении данных:", error);
                Data = [];
            }
        }
    }
}
    return Data;
};


const addUserData = ( login, parol, numtel, firstname, name, email) => {
    const User = UserData.find(user => user.login === login);
    if (User) {
        return null; 
    }
    const newData = {login, parol, numtel, firstname, name, email};
    UserData.push(newData);
    writeUserData(UserData);
    if(login!=='Admin'){
    addUserTaskFile(login);
    setUserLog(login);
    readData();
}
    return newData;
}
    
const editPassword = (Login, NewPassword) =>{
        const LoginIndex = UserData.findIndex(l => l.login === Login);
        if (LoginIndex === -1) {
            return null;
        }
        UserData[LoginIndex].parol=NewPassword;
        writeUserData(UserData);
        return UserData[LoginIndex];
    
};

const editLogin = (Login, NewLogin) =>{
    const LoginIndex = UserData.findIndex(l => l.login === Login);
    if (LoginIndex === -1) {
        return null;
    }
    const oldFilePath = path.join(userTasksDir, `${LOG}.json`);
    const newFilePath = path.join(userTasksDir, `${NewLogin}.json`);

    UserData[LoginIndex].login = NewLogin;
    fs.renameSync(oldFilePath, newFilePath);
    setUserLog(NewLogin);
    readData();
    writeUserData(UserData);
    return UserData[LoginIndex];

};

const editFI = (Login, NewName, NewFirstName) =>{
    const LoginIndex = UserData.findIndex(l => l.login === Login);
    if (LoginIndex === -1) {
        return null;
    }
    UserData[LoginIndex].name = NewName;
    UserData[LoginIndex].firstname = NewFirstName;
    writeUserData(UserData);
    return UserData[LoginIndex];

};

const deleteUserData = (Login) => {
    const userIndex = UserData.findIndex(l => l.login === Login);
    if (userIndex === -1) {
        return false; 
    }
    UserData.splice(userIndex, 1);
    const FilePath = path.join(userTasksDir, `${Login}.json`);
    fs.unlinkSync(FilePath);
    writeUserData(UserData);
    return true;
};

const addUserTaskFile = (login) => {
    const taskFilePath = path.join(userTasksDir, `${login}.json`);
    if (!fs.existsSync(taskFilePath)) {
        fs.writeFileSync(taskFilePath, JSON.stringify([])); 
    }
};

const addMultiTaskFile = (login) => {
    if (!fs.existsSync(MultiTasksDir)) {
        fs.mkdirSync(MultiTasksDir);
    }
    const taskFilePath = path.join(MultiTasksDir, `${login}.json`);
    if (!fs.existsSync(taskFilePath)) {
        fs.writeFileSync(taskFilePath, JSON.stringify([])); 
    }
};

const addData = (task, category) => {
    const newData = { task, category }; 
    Data.push(newData);
    writeData(Data);
    return newData;
};

const GetID = () => {
    return Id;
};

const AddID = () => {
    const id  = Math.floor(1000000000000000 + Math.random() * 9000000000000000);
    setMultiID(id);
    return id;
};

const editData = (task, newTaskData) => {
    const taskIndex = Data.findIndex(t => t.task === task);
    if (taskIndex === -1) {
        return null;
    }
    Data[taskIndex].task = newTaskData;
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

const markTaskComplete = (task, category) => {
    const taskIndex = Data.findIndex(t => t.task === task && t.category === category);
    if (taskIndex === -1) {
        return null;
    }
    Data[taskIndex].completed = true;
    writeData(Data);
    return Data[taskIndex];
};
const addTaskWithDeadline = (task, deadline, category) => {
    const newData = { task, deadline, completed: false, category };
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

const FindbyCategory = (category) => {
    const result = Data.filter(c => c.category === category);
    return result;
};

const findName = (name) =>{
    const result =  Data.filter(n => n.task.includes(name))
    return result;
};

const findDead = (dead) => {
    const result = Data.filter(d => d.deadline === dead);
    return result;
};

const getDead = () => {
    const currentDate = new Date();
    const result = Data.filter(task => task.deadline && new Date(task.deadline) < currentDate);
    return result;
};

const getCOM = () => {
    const result = Data.filter(task => task.completed === true);
    return result;
};

const getNotCOM = () => {
    const result = Data.filter(task => task.completed === false);
    return result;
};
readData();
module.exports = {
     GetUserData: () => [...UserData],
     GetData: () => [...Data], 
     addUserData,   
     addData, 
     editData, 
     editPassword,
     editLogin,
     editFI,
     deleteData, 
     deleteUserData,
     sortTasks, 
     addTaskWithDeadline, 
     markTaskComplete, 
     FindbyCategory,
     findName,
     findDead,
     getDead,  
     getCOM,
     getNotCOM,
     setUserLog,
     readData,
     GetID,
     AddID,
     addUserTaskFile,
     addMultiTaskFile,
     setMultiID
    };

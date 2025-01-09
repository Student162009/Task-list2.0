const DATA = require("../data/data");

const verifyCaptcha = async (req, res) => {
    const captchaResponse = req.body['g-recaptcha-response'];
    const secretKey = '6Le0J7IqAAAAAO7k7uu0VNUB3_Kn3cdIAbcW2Xdb';

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaResponse}`, {
        method: 'POST'
    });
    
    const data = await response.json();

    if (data.success) {
       
        res.status(200).send("Капча пройдена!");
    } else {
       
        res.status(400).send("Ошибка капчи. Пожалуйста, попробуйте снова.");
    }
};


const addUserData = (req, res) => {
    const dataFromClient = req.body;
    const result = DATA.addUserData(dataFromClient.Login, dataFromClient.Password, dataFromClient.Number, dataFromClient.firstname, dataFromClient.name, dataFromClient.email);

    if (!result) {
        res.status(409).send("УПС! ТАКОЙ ПОЛЬЗОВАТЕЛЬ УЖЕ ЕСТЬ");
        return;
    }

    res.status(200).json(result);
};

const Enter = (req, res) =>{
    const dataFromClient = req.body;
    const data = DATA.GetUserData();
  
    const user = data.find(user => user.login === dataFromClient.Data && user.parol === dataFromClient.Password);
    const USLOG = data.findIndex(l => l.login === dataFromClient.Data);
    DATA.setUserLog(data[USLOG].login);
    DATA.addUserTaskFile(data[USLOG].login);
if(user){
    DATA.readData();
    res.status(200).json({
        message: "Одобрено",
        firstname: user.firstname,
        name: user.name
    });
}else{
    res.status(409).send("УПС! ТАКОГО ЛОГИНА ИЛИ ПАРОЛЯ НЕТ");
}
};

const EnterEmail = (req, res) =>{
    const dataFromClient = req.body;
    const data = DATA.GetUserData();
    const user = data.find(user => user.email === dataFromClient.Data && user.parol === dataFromClient.Password);
    const USLOG = data.findIndex(l => l.login === dataFromClient.Data);
    DATA.setUserLog(data[USLOG].DATA.login);
    DATA.addUserTaskFile(data[USLOG].DATA.login);
if(user){
    DATA.readData();
    res.status(200).json({
        message: "Одобрено",
        firstname: user.firstname,
        name: user.name
    });
}else{
    res.status(409).send("УПС! ТАКОЙ ЭЛЕКТРОННОЙ ПОЧТЫ ИЛИ ПАРОЛЯ НЕТ");
}
};

const EnterTel = (req, res) =>{
    const dataFromClient = req.body;
    const data = DATA.GetUserData();
    const user = data.find(user => user.numtel === dataFromClient.Data && user.parol === dataFromClient.Password);
    const USLOG = data.findIndex(l => l.login === dataFromClient.Data);
    DATA.setUserLog(data[USLOG].DATA.login);
    DATA.addUserTaskFile(data[USLOG].DATA.login);
if(user){
    DATA.readData();
    res.status(200).json({
        message: "Одобрено",
        firstname: user.firstname,
        name: user.name
    });
}else{
    res.status(409).send("УПС! ТАКОГО ТЕЛЕФОНА ИЛИ ПАРОЛЯ НЕТ");
}
};

const EnterMulti = (req, res) =>{
    const dataFromClient = req.body;
    const data = DATA.GetUserData();
    const id = DATA.GetID();
    const user = data.find(user => user.login === dataFromClient.Data && user.parol === dataFromClient.Password);
   if(id == dataFromClient.ID){
    if(user){
        DATA.addMultiTaskFile(id);
        DATA.setMultiID(id);
        DATA.readData();
        res.status(200).json({
            message: "Одобрено",
            firstname: user.firstname,
            name: user.name
        });
        
    }else{
        res.status(409).send("УПС! ТАКОГО ТЕЛЕФОНА ИЛИ ПАРОЛЯ НЕТ");
    }
}else{
    res.status(409).send("УПС! ID НЕ ПРАВИЛЬНЫЙ");
}
    };

const EnterMultiEmail = (req, res) =>{
    const dataFromClient = req.body;
    const data = DATA.GetUserData();
    const user = data.find(user => user.email === dataFromClient.Data && user.parol === dataFromClient.Password);
    const id = DATA.GetID();
    if(id == dataFromClient.ID){
        if(user){
            DATA.addMultiTaskFile(id);
            DATA.setMultiID(id);
            DATA.readData();
            res.status(200).json({
                message: "Одобрено",
                firstname: user.firstname,
                name: user.name
            });
            
        }else{
            res.status(409).send("УПС! ТАКОГО ТЕЛЕФОНА ИЛИ ПАРОЛЯ НЕТ");
        }
    }else{
        res.status(409).send("УПС! ID НЕ ПРАВИЛЬНЫЙ");
    }
        };

const EnterMultiTel = (req, res) =>{
    const dataFromClient = req.body;
    const data = DATA.GetUserData();
    const user = data.find(user => user.numtel === dataFromClient.Data && user.parol === dataFromClient.Password);
    const id = DATA.GetID();
    if(id == dataFromClient.ID){
        if(user){
            DATA.addMultiTaskFile(id);
            DATA.setMultiID(id);
            DATA.readData();
            res.status(200).json({
                message: "Одобрено",
                firstname: user.firstname,
                name: user.name
            });
            
        }else{
            res.status(409).send("УПС! ТАКОГО ТЕЛЕФОНА ИЛИ ПАРОЛЯ НЕТ");
        }
    }else{
        res.status(409).send("УПС! ID НЕ ПРАВИЛЬНЫЙ");
    }
};

const EnterAdmin = (req, res) =>{
    const dataFromClient = req.body;
    const data = DATA.GetUserData();
    const user = data.find(user => user.login === dataFromClient.Login && user.parol === dataFromClient.Password);
if(user){
    res.status(200).json({
        message: "Одобрено",
    });
}else{
    res.status(409).send("Проверьте есть ли Админ");
}
};

const editPassword = (req, res) => {
    const { Login, Newpass} = req.body;
    const result = DATA.editPassword(Login, Newpass);

    if (!result) {
        res.status(404).send("Логин не найден.");
        return;
    }

    res.status(200).json(result);
};

const editLogin = (req, res) => {
    const { Login, Newlogin} = req.body;
    const result = DATA.editLogin(Login, Newlogin);

    if (!result) {
        res.status(404).send("Логин не найден.");
        return;
    }

    res.status(200).json(result);
};

const editFI = (req, res) => {
    const { Login, Newname, Newfirstname } = req.body;
    const result = DATA.editFI(Login, Newname, Newfirstname);

    if (!result) {
        res.status(404).send("Пользователь не найден.");
        return;
    }

    res.status(200).json(result);
};

const deleteUser = (req, res) => {
    const { Login } = req.body;
    const result = DATA.deleteUserData(Login);

    if (!result) {
        res.status(404).send("Пользователь не найден");
        return;
    }

    res.status(200).send("Пользователь удален");
};

const GetData = (req, res) => {
    const data = DATA.GetData();
    res.status(200).json(data);
};

const GetID = (req, res) => {
    DATA.AddID();
    const ID = DATA.GetID();
    res.status(200).json(ID);
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
    const { task, category } = req.body;
    const result = DATA.markTaskComplete(task, category);

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

const FindbyName = (req, res) =>{
    const {name} = req.body;
    const result = DATA.findName(name); 

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).send("Имя не найдено");
    }
};

const FindbyDead = (req, res) =>{
    const {data} = req.body;
    const result = DATA.findDead(data); 

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).send("Смерть не найдена");
    }
};

const SortDead = (req, res) =>{
    const result = DATA.getDead();
    if (result.length > 0) {
        res.status(200).json(result);
    } else {
        res.status(404).send("Нет просроченных задач.");
    }
};

const SortCOM = (req, res) =>{
    const result = DATA.getCOM();
    if (result.length > 0) {
        res.status(200).json(result);
    } else {
        res.status(404).send("Нет выполненных задач.");
    }
};

const SortNotCOM = (req, res) =>{
    const result = DATA.getNotCOM();
    if (result.length > 0) {
        res.status(200).json(result);
    } else {
        res.status(404).send("Нет не выполненных задач.");
    }
};

module.exports = { 
    GetData, 
    addData, 
    editTask, 
    deleteTask, 
    sortData, 
    markComplete, 
    addTaskWithDeadline, 
    FindbyCategory, 
    FindbyName, 
    FindbyDead, 
    SortDead,
    SortCOM,
    SortNotCOM,
    addUserData, 
    Enter, 
    editPassword, 
    editLogin, 
    editFI, 
    deleteUser, 
    EnterEmail, 
    EnterTel,
    EnterMulti,
    EnterMultiEmail,
    EnterMultiTel,
    EnterAdmin,
    GetID,
    verifyCaptcha
};

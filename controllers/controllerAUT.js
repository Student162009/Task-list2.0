const DATA = require("../data/dataAUT");
const addData = (req, res) => {
    const dataFromClient = req.body;
    const result = DATA.addData(dataFromClient.Login, dataFromClient.Password, dataFromClient.Number, dataFromClient.firstname, dataFromClient.name, dataFromClient.email);

    if (!result) {
        res.status(409).send("УПС! ТАКОЙ ПОЛЬЗОВАТЕЛЬ УЖЕ ЕСТЬ");
        return;
    }

    res.status(200).json(result);
};

const Enter = (req, res) =>{
    const dataFromClient = req.body;
    const data = DATA.GetData();

    const user = data.find(user => user.login === dataFromClient.Login && user.parol === dataFromClient.Password);
if(user){
    res.status(200).json({
        message: "Одобрено",
        firstname: user.firstname,
        name: user.name
    });
}else{
    res.status(409).send("УПС! ТАКОГО ЛОГИНА ИЛИ ПАРОЛЯ НЕТ");
}
};
const editPassword = (req, res) => {
    const { Login, Newpass} = req.body;
    console.log(Newpass);
    const result = DATA.editPassword(Login, Newpass);

    if (!result) {
        res.status(404).send("Логин не найден.");
        return;
    }

    res.status(200).json(result);
};



module.exports = {addData, Enter, editPassword};

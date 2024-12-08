const DATA = require("../data/dataAUT");
const addData = (req, res) => {
    const dataFromClient = req.body;
    const result = DATA.addData(dataFromClient.Login, dataFromClient.Password);
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
    res.status(200).send("Одобрено");
}else{
    res.status(409).send("УПС! ТАКОГО ЛОГИНА ИЛИ ПАРОЛЯ НЕТ");
}
};
module.exports = {addData, Enter};

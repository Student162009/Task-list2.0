const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'json/dataAUT.json');

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

const addData = (login, parol, numtel, firstname, name, email) => {
    const User = Data.find(user => user.login === login);
    if (User) {
        return null; 
    }
    const newData = { login, parol, numtel, firstname, name, email};
    Data.push(newData);
    writeData(Data);
    return newData;
};

const editPassword = (Login, NewPassword) =>{
        const LoginIndex = Data.findIndex(l => l.login === Login);
        if (LoginIndex === -1) {
            return null;
        }
        console.log(Login);
        console.log(NewPassword);
        Data[LoginIndex] = { login: Login, parol: NewPassword };
        writeData(Data);
        return Data[LoginIndex];
    
};

module.exports = { GetData: () => [...Data], addData, editPassword};

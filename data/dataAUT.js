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
        Data[LoginIndex].parol=NewPassword;
        writeData(Data);
        return Data[LoginIndex];
    
};

const editLogin = (Login, NewLogin) =>{
    const LoginIndex = Data.findIndex(l => l.login === Login);
    if (LoginIndex === -1) {
        return null;
    }
    Data[LoginIndex].login = NewLogin;
    writeData(Data);
    return Data[LoginIndex];

};

const editFI = (Login, NewName, NewFirstName) =>{
    const LoginIndex = Data.findIndex(l => l.login === Login);
    if (LoginIndex === -1) {
        return null;
    }
    Data[LoginIndex].name = NewName;
    Data[LoginIndex].firstname = NewFirstName;
    writeData(Data);
    return Data[LoginIndex];

};

const deleteData = (Login) => {
    const userIndex = Data.findIndex(l => l.login === Login);
    if (userIndex === -1) {
        return false; 
    }
    Data.splice(userIndex, 1);
    writeData(Data);
    return true;
};

module.exports = { GetData: () => [...Data], addData, editPassword, editLogin, editFI, deleteData};

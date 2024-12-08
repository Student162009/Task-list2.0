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

const addData = (login, parol) => {
    const User = Data.find(user => user.login === login);
    if (User) {
        return null; 
    }
    const newData = { login, parol};
    Data.push(newData);
    writeData(Data);
    return newData;
};

module.exports = { GetData: () => [...Data], addData  };

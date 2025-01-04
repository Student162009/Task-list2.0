window.addEventListener('load', () => {
    const mainM = document.querySelector("#main")
    const login = document.querySelector("#Login");
    const password = document.querySelector("#Password");
    const enter = document.querySelector("#enter");
    const Ban = document.getElementById("error");
    const Enter = document.getElementById("log-in");
    const reg = document.querySelector("#reg");

    enter.addEventListener("click", async()=>{
    const Data = login.value;
    const Password = password.value;

if(Data.includes('+375')){
    const response = await fetch("/task/enterTel", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ Data, Password})
    });

    if (response.ok) {
        const result = await response.json();
        mainM.pause();
        Enter.play();
        localStorage.setItem('firstname', result.firstname);
        localStorage.setItem('name', result.name);
        localStorage.setItem('userID', result.login);
        setTimeout(() => {
            window.location.href = "/html/main.html";
        }, 2000);
    }

    if (!response.ok) {
        mainM.pause();
        Ban.play();
        console.error('Не удалось войти');
        setTimeout(() => {
        mainM.play();
    }, 2000);
    }
}else if(Data.includes('@')){
    const response = await fetch("/task/enterEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ Data, Password})
    });

    if (response.ok) {
        const result = await response.json();
        mainM.pause();
        Enter.play();
        localStorage.setItem('firstname', result.firstname);
        localStorage.setItem('name', result.name);
        setTimeout(() => {
            window.location.href = "/html/main.html";
        }, 2000);
    }

    if (!response.ok) {
        mainM.pause();
        Ban.play();
        console.error('Не удалось войти');
        setTimeout(() => {
        mainM.play();
    }, 2000);
    }
}
else{const response = await fetch("/task/enterLog", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ Data, Password})
});

if (response.ok) {
    const result = await response.json();
    mainM.pause();
    Enter.play();
    localStorage.setItem('firstname', result.firstname);
    localStorage.setItem('name', result.name);
    setTimeout(() => {
        window.location.href = "/html/main.html";
    }, 2000);
}

if (!response.ok) {
    mainM.pause();
    Ban.play();
    console.error('Не удалось войти');
    setTimeout(() => {
    mainM.play();
}, 2000);
}}
    
});
reg.addEventListener("click", ()=>{
        mainM.pause();
        Enter.play();
        setTimeout(() => {
            window.location.href = "/html/regist.html";
        }, 2000);
});
});
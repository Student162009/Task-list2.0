window.addEventListener('load', () => {
    const mainM = document.querySelector("#main")
    const login = document.querySelector("#Login");
    const password = document.querySelector("#Password");
    const enter = document.querySelector("#enter");
    const Ban = document.getElementById("error");
    const Enter = document.getElementById("log-in");
    const reg = document.querySelector("#reg");
    const Indefic = document.querySelector("#Indefic");

    enter.addEventListener("click", async () => {
        const Data = login.value;
        const Password = password.value;
        const ID = Indefic.value;
    
        if (Data === '' || Password === '') {
            alert('Поля не могут быть пустыми');
            return;
        }
    
        const captchaResponse = grecaptcha.getResponse();
    
        if (captchaResponse.length === 0) {
            alert('Пожалуйста, подтвердите, что вы не робот.');
            return;
        }
    

        let response;
        
        if (ID !== '') {
            if (Data.includes('+375')) {
                response = await fetch("/task/enterMultiplayerTel", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ Data, Password, ID, captchaResponse }) // Добавляем captchaResponse
                });
            } else if (Data.includes('@')) {
                response = await fetch("/task/enterMultiplayerEmail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ Data, Password, ID, captchaResponse })
                });
            } else {
                response = await fetch("/task/enterMultiplayerLog", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ Data, Password, ID, captchaResponse })
                });
            }
        } else {
            if (Data.includes('+375')) {
                response = await fetch("/task/enterTel", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ Data, Password, captchaResponse })
                });
            } else if (Data.includes('@')) {
                response = await fetch("/task/enterEmail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ Data, Password, captchaResponse })
                });
            } else {
                response = await fetch("/task/enterLog", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ Data, Password, captchaResponse })
                });
            }
        }
    

        if (response.ok) {
            const result = await response.json();
            mainM.pause();
            Enter.play();
            localStorage.setItem('firstname', result.firstname);
            localStorage.setItem('name', result.name);
            
            setTimeout(() => {
                window.location.href = "/html/main.html";
            }, 2000);
        } else {
            mainM.pause();
            Ban.play();
            alert('Проверьте правильность данных');
            console.error('Не удалось войти');
            setTimeout(() => {
                mainM.play();
            }, 2000);
        }
    });
    
reg.addEventListener("click", ()=>{
        mainM.pause();
        Enter.play();
        setTimeout(() => {
            window.location.href = "/html/regist.html";
        }, 2000);
});
});
window.addEventListener('load', () => {
    const login = document.querySelector("#Login");
    const password = document.querySelector("#Password");
    const enter = document.querySelector("#enter");
    const Ban = document.getElementById("error");
    const Enter = document.getElementById("log-in");
    const reg = document.querySelector("#reg");

    enter.addEventListener("click", async()=>{
    const Login = login.value;
    const Password = password.value;
    const response = await fetch("/task/enter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ Login, Password})
    });

    if (response.ok) {
        Enter.play();
        setTimeout(() => {
            window.location.href = "/html/main.html";
        }, 2000);
    }

    if (!response.ok) {
        Ban.play();
        console.error('Не удалось войти');
    }
});
reg.addEventListener("click", ()=>{
    
        Enter.play();
        setTimeout(() => {
            window.location.href = "/html/regist.html";
        }, 2000);
});
});
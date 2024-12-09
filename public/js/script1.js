window.addEventListener('load', () => {
    const login = document.querySelector("#Login");
    const password = document.querySelector("#Password");
    const reg = document.querySelector("#reg");
    const Ban = document.getElementById("error");
    const Per = document.getElementById("per");
    const have = document.getElementById("have");

reg.addEventListener("click", async()=>{
    const Login = login.value;
    const Password = password.value;
    const response = await fetch("/task/reg", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ Login, Password})
    });
    if (response.ok) {
        Per.play();
        setTimeout(() => {
            window.location.href = "../";
        }, 2000);
        
    }

    if (!response.ok) {
        Ban.play();
        console.error('Не удалось зарегестрироваться');
    }
});
have.addEventListener("click", ()=> {
        Per.play();
        setTimeout(() => {
            window.location.href = "../";
        }, 2000);
});
});


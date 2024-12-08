window.addEventListener('load', () => {
    const login = document.querySelector("#Login");
    const password = document.querySelector("#Password");
    const reg = document.querySelector("#reg");
    const Ban = document.getElementById("error");
    const Create = document.getElementById("create");

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
        Create.play();
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 2000);
        
    }

    if (!response.ok) {
        Ban.play();
        console.error('Не удалось зарегестрироваться');
    }
});
});


window.addEventListener('load', () => {
    const mainM = document.querySelector("#main")
    const login = document.querySelector("#Login");
    const password = document.querySelector("#Password");
    const enter = document.querySelector("#enter");
    const Ban = document.getElementById("error");
    const Enter = document.getElementById("log-in");
    
    enter.addEventListener("click", async()=>{
    const Login = login.value;
    const Password = password.value;

    if(Login==='' || Password===''){
        alert('Поля не могут быть пустыми')
    }
    else{
    const response = await fetch("/task/enterAdmin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ Login, Password})
    });
    
    if (response.ok) {
        mainM.pause();
        Enter.play();
        setTimeout(() => {
            window.location.href = "/html/AdminPanel/ID.html";
        }, 2000);
    }
    
    if (!response.ok) {
        mainM.pause();
        Ban.play();
        alert('Проверьте правильность данных');
        console.error('Не удалось войти');
        setTimeout(() => {
        mainM.play();
    }, 2000);
    }}
    
});
});
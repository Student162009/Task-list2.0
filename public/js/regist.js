window.addEventListener('load', () => {
    const login = document.querySelector("#Login");
    const password = document.querySelector("#Password");
    const numtel = document.querySelector("#NumTel");
    const FirstName = document.querySelector("#FirstName");
    const Name = document.querySelector("#Name");
    const Email = document.querySelector("#email");
    const reg = document.querySelector("#reg");
    const Ban = document.getElementById("error");
    const Per = document.getElementById("per");
    const have = document.getElementById("have");

reg.addEventListener("click", () => {
    const Login = login.value;
    const Password = password.value;
    const Number = numtel.value;
    const firstname = FirstName.value;
    const name = Name.value;
    const email = Email.value;
if(Login ==='' || Password==='' || Number==='' || firstname==='' || name==='' || email===''){
    alert("Введите все данные");
}else{
   Registr(Login, Password, Number, firstname, name, email);
}
});

async function Registr(Login, Password, Number, firstname, name, email){
    if (Number.includes('+375') && email.includes('@')) {
        const response = await fetch("/task/reg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Login, Password, Number, firstname, name, email })
        });
        if (response.ok) {
            Per.play();
            setTimeout(() => {
                window.location.href = "/html/Enter.html";
            }, 2000);
            
        }
        
        if (!response.ok) {
            Ban.play();
            console.error('Не удалось зарегестрироваться');
        }
}else{
    alert("Проверьте данные");
}
}

have.addEventListener("click", ()=> {
        Per.play();
        setTimeout(() => {
            window.location.href = "/html/Enter.html";
        }, 2000);
});
});


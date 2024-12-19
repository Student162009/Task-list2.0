window.addEventListener('load', () => {
const login = document.getElementById("log-in");
const NewPassword = document.getElementById("newPassword");
const RepetPassword = document.getElementById("repeatPassword");
const button = document.getElementById("button");
const Edit = document.getElementById("Edit");
button.addEventListener('click', async (e) => {
                const Login = login.value;
                const Newpass = NewPassword.value;
                const Repetpassword = RepetPassword.value;       
if(Newpass == Repetpassword){
    
    const response = await fetch("/task/editPassword", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({Login, Newpass})
});

if (response.ok) {
    Edit.play();
    setTimeout(() => {
        window.location.href = "/html/Enter.html";
    }, 2000);
} else {
    console.error('Не удалось обновить пароль');
}

}else{
    alert("Поля с паролем должны быть ОДИНАКОВЫ")
}

});  
});


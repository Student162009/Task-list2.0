window.addEventListener('load', () => {
    const login = document.getElementById("log-in");
    const NewLogin = document.getElementById("newLogin");
    const RepetLogin = document.getElementById("repeatLogin");
    const button = document.getElementById("button");
    const Edit = document.getElementById("Edit");
    button.addEventListener('click', async (e) => {
                    const Login = login.value;
                    const Newlogin = NewLogin.value;
                    const Repetlogin = RepetLogin.value;       

    if(Newlogin == Repetlogin){
        
        const response = await fetch("/task/editLogin", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({Login, Newlogin})
    });
    
    if (response.ok) {
        Edit.play();
        setTimeout(() => {
            window.location.href = "/html/Edituser.html";
        }, 2000);
    } else {
        console.error('Не удалось обновить Логин');
    }
    
    }else{
        alert("Поля с логином должны быть ОДИНАКОВЫ")
    }
    
    });  
    });
    
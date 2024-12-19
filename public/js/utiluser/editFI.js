window.addEventListener('load', () => {
    const login = document.getElementById("log-in");
    const NewName = document.getElementById("newName");
    const NewFirstName = document.getElementById("newFirstName");
    const RepetName = document.getElementById("repeatName");
    const RepetFirstName = document.getElementById("repeatFirstName");
    const button = document.getElementById("button");
    const Edit = document.getElementById("Edit");
    button.addEventListener('click', async (e) => {
                    const Login = login.value;
                    const Newname = NewName.value;
                    const Newfirstname = NewFirstName.value;
                    const Reapetname = RepetName.value;
                    const Reapetfirstname = RepetFirstName.value;       

    if(Newname == Reapetname && Newfirstname == Reapetfirstname){
        
        const response = await fetch("/task/editFI", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({Login, Newname, Newfirstname})
    });
    
    if (response.ok) {
        const result = await response.json();
        localStorage.setItem('firstname', result.firstname);
        localStorage.setItem('name', result.name);
        Edit.play();
        setTimeout(() => {
            window.location.href = "/html/Edituser.html";
        }, 2000);
    } else {
        console.error('Не удалось обновить имя и фамилию');
    }
    
    }else{
        alert("Поля с именем и поля с фамилией должны быть ОДИНАКОВЫ(напрмер: новая фамилия = повтор фамилии)")
    }
    
    });  
    });
    
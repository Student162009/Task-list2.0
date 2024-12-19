window.addEventListener('load', () => {
const login = document.querySelector("#delete");
const deletebut = document.getElementById("deletebut");

deletebut.addEventListener("click", async ()=>{
    const Login = login.value;
    const response = await fetch("/task/deleteUser", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ Login })
    });
    if(response.ok){
        window.location.href = "/html/Enter.html";
    }
    else{
        console.error('Не удалось удалить пользователя');
    }
})

});

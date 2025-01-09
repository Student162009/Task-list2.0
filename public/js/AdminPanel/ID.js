window.addEventListener('load', () => {
    const enter = document.querySelector("#GetID");
    const ID = document.querySelector("#ID")
    const Ban = document.getElementById("error");
    
    enter.addEventListener("click", async()=>{
const response = await fetch("/task/GetID", { method: "GET", headers: { "Content-Type": "application/json" } });
        if (response.ok) {
            let id = await response.json();
            ID.textContent = id;
        } else{
        Ban.play();
        console.error('Не удалось получить ID', response.statusText);
        alert('Ошибка при получении ID: ' + response.statusText);
    }
    
});
});
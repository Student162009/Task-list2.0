window.addEventListener('load', () => {
    const enter = document.querySelector("#enter");
    const Enter = document.getElementById("log-in");
    const download = document.querySelector("#download");
enter.addEventListener("click", ()=>{
        Enter.play();
        setTimeout(() => {
            window.location.href = "/html/Enter.html";
        }, 2000);
});
});
window.addEventListener("load", () => {
  const enter = document.querySelector("#GetID");
  const ID = document.querySelector("#ID");
  const Ban = document.getElementById("error");

  enter.addEventListener("click", async () => {
    const response = await fetch("/task/GetID", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      let id = await response.json();
      ID.textContent = id;
      alert(
        "ID успешно получен! Теперь вы можете использовать его для чего угодно... или просто посмотреть на него и улыбнуться!"
      );
    } else {
      Ban.play();
      console.error("Не удалось получить ID", response.statusText);
      alert(
        "Ошибка при получении ID: " +
          response.statusText +
          ". Похоже, что наши сервера обнаружили спящего ежа. Попробуйте еще раз!"
      );
    }
  });
});

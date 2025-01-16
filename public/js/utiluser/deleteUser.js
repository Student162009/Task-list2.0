window.addEventListener("load", () => {
  const login = document.querySelector("#delete");
  const password = document.querySelector("#password");
  const deletebut = document.getElementById("deletebut");

  document
    .getElementById("toggle-password")
    .addEventListener("click", function () {
      const icon = this;

      if (password.type === "password") {
        password.setAttribute("type", "text");
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
        alert(
          "Теперь вы можете увидеть свой пароль! Но не показывайте его никому, это секрет который знает только лишь ты, БОГ и админ!"
        );
      } else {
        password.setAttribute("type", "password");
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
        alert(
          "Пароль снова в безопасности! Но не забудьте его, или вам придется его сбросить... и плакать всю ночь!"
        );
      }
    });

  deletebut.addEventListener("click", async () => {
    const Login = login.value;
    const Password = password.value;

    if (Login === "" || Password === "") {
      alert(
        "Поля не могут быть пустыми! Мы не можем удалить пользователя без пароля, это как попытка войти в дом без ключа!"
      );
      return;
    }

    const response = await fetch("/task/deleteUser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Login, Password }),
    });
    if (response.ok) {
      alert(
        "Пользователь успешно удален! Теперь вы можете вздохнуть с облегчением... или плакать, если это был ваш любимый аккаунт!"
      );
      window.location.href = "/html/Enter.html";
    } else {
      console.error("Не удалось удалить пользователя");
      alert(
        "Пользователь не удален! Похоже, что наши сервера обнаружили спящего ежа. Попробуйте еще раз!"
      );
    }
  });
});

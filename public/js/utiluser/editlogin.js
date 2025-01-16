window.addEventListener("load", () => {
  const login = document.getElementById("log-in");
  const password = document.querySelector("#password");
  const NewLogin = document.getElementById("newLogin");
  const RepetLogin = document.getElementById("repeatLogin");
  const button = document.getElementById("button");
  const Edit = document.getElementById("Edit");

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

  button.addEventListener("click", async (e) => {
    const Login = login.value;
    const Newlogin = NewLogin.value;
    const Repetlogin = RepetLogin.value;
    const Password = password.value;

    if (Newlogin == Repetlogin) {
      const response = await fetch("/task/editLogin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Login, Password, Newlogin }),
      });

      if (response.ok) {
        Edit.play();
        alert(
          "Логин успешно обновлен! Теперь вы можете спать спокойно... и не беспокоиться о том, что кто-то взломает ваш аккаунт и узнает ваши секреты!"
        );
        setTimeout(() => {
          window.location.href = "/html/Edituser.html";
        }, 2000);
      } else {
        console.error("Не удалось обновить Логин");
        alert(
          "Логин не обновлен! Похоже, что наши сервера обнаружили спящего ежа. Попробуйте еще раз!"
        );
      }
    } else {
      alert(
        "Поля с логином должны быть ОДИНАКОВЫ! Не пытайтесь обмануть систему, это не сработает... и вы не получите приз за хитрость!"
      );
    }
  });
});

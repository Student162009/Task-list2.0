window.addEventListener("load", () => {
  const login = document.getElementById("log-in");
  const Data = document.querySelector("#Data");
  const NewPassword = document.getElementById("newPassword");
  const RepetPassword = document.getElementById("repeatPassword");
  const button = document.getElementById("button");
  const Edit = document.getElementById("Edit");

  document
    .getElementById("toggle-password")
    .addEventListener("click", function () {
      const icon = this;

      if (NewPassword.type === "password") {
        NewPassword.setAttribute("type", "text");
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
        alert(
          "Теперь вы можете увидеть свой пароль! Но не показывайте его никому, это секрет который знает только лишь ты, БОГ и админ! Или ваша мама, если она хакер."
        );
      } else {
        NewPassword.setAttribute("type", "password");
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
        alert(
          "Пароль снова в безопасности! Но не забудьте его, или вам придется его сбросить... и плакать всю ночь под песню 'Я забыл пароль'!"
        );
      }
    });

  document
    .getElementById("toggle-password2")
    .addEventListener("click", function () {
      const icon = this; // Не забудьте объявить icon здесь

      if (RepetPassword.type === "password") {
        RepetPassword.setAttribute("type", "text");
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
        alert(
          "Теперь вы можете увидеть повтор пароля! Убедитесь, что он совпадает с первым, или вы будете в беде... и вам придется вызвать парольного волшебника!"
        );
      } else {
        RepetPassword.setAttribute("type", "password");
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
        alert(
          "Повтор пароля снова в безопасности! Теперь вы можете спокойно обновлять пароль... и наслаждаться жизнью без парольных проблем!"
        );
      }
    });

  button.addEventListener("click", async (e) => {
    const Login = login.value;
    const Newpass = NewPassword.value;
    const Repetpassword = RepetPassword.value;
    const data = Data.value;
    if (Newpass == Repetpassword) {
      const response = await fetch("/task/editPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Login, data, Newpass }),
      });

      if (response.ok) {
        Edit.play();
        alert(
          "Пароль успешно обновлен! Теперь вы можете спать спокойно... и не беспокоиться о том, что кто-то взломает ваш аккаунт и узнает ваши секреты!"
        );
        setTimeout(() => {
          window.location.href = "/html/Enter.html";
        }, 2000);
      } else {
        console.error("Не удалось обновить пароль");
        alert(
          "Пароль не обновлен! Похоже, что наши сервера обнаружили спящего ежа... или он просто отдыхает после долгой работы по защите паролей. Попробуйте еще раз!"
        );
      }
    } else {
      alert(
        "Поля с паролем должны быть ОДИНАКОВЫ! Не пытайтесь обмануть систему, это не сработает... и вы не получите приз за хитрость!"
      );
    }
  });
});

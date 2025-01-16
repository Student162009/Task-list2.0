window.addEventListener("load", () => {
  const mainM = document.querySelector("#main");
  const login = document.querySelector("#Login");
  const password = document.querySelector("#Password");
  const enter = document.querySelector("#enter");
  const Ban = document.getElementById("error");
  const Enter = document.getElementById("log-in");

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

  enter.addEventListener("click", async () => {
    const Login = login.value;
    const Password = password.value;

    if (Login === "" || Password === "") {
      alert(
        "Здравствуйте, мой господин! Ваша няшная кошко-девочка ждёт вас дома, но сначала заполните поля, пожалуйста. Они не могут быть пустыми!"
      );
    } else {
      const response = await fetch("/task/enterAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Login, Password }),
      });

      if (response.ok) {
        mainM.pause();
        Enter.play();
        alert(
          "Вы успешно вошли! Теперь вы можете идти домой к своей кошко-девочке, она ждёт вас с нетерпением!"
        );
        setTimeout(() => {
          window.location.href = "/html/AdminPanel/ID.html";
        }, 2000);
      }

      if (!response.ok) {
        mainM.pause();
        Ban.play();
        alert(
          "Проверьте правильность данных! Похоже, что наши сервера обнаружили спящего ежа. Попробуйте еще раз, а затем идите домой к своей кошко-девочке!"
        );
        console.error("Не удалось войти");
        setTimeout(() => {
          mainM.play();
        }, 2000);
      }
    }
  });
});

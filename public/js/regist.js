window.addEventListener("load", () => {
  const login = document.querySelector("#Login");
  const password = document.querySelector("#Password");
  const password2 = document.querySelector("#Password2");
  const numtel = document.querySelector("#NumTel");
  const FirstName = document.querySelector("#FirstName");
  const Name = document.querySelector("#Name");
  const Email = document.querySelector("#email");
  const reg = document.querySelector("#reg");
  const Ban = document.getElementById("error");
  const Per = document.getElementById("per");
  const have = document.getElementById("have");

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
          "Пароль снова в безопасности! Но не забудьте его, или вам придется его сбросить!"
        );
      }
    });

  document
    .getElementById("toggle-password2")
    .addEventListener("click", function () {
      const icon = this;

      if (password2.type === "password") {
        password2.setAttribute("type", "text");
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
        alert(
          "Теперь вы можете увидеть повтор пароля! Убедитесь, что он совпадает с первым!"
        );
      } else {
        password2.setAttribute("type", "password");
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
        alert(
          "Повтор пароля снова в безопасности! Теперь вы можете спокойно регистрироваться!"
        );
      }
    });

  reg.addEventListener("click", () => {
    const Login = login.value;
    const Password = password.value;
    const Password2 = password2.value;
    const Number = numtel.value;
    const firstname = FirstName.value;
    const name = Name.value;
    const email = Email.value;
    if (Password !== Password2) {
      alert(
        "Пароли не совпадают! Похоже, что вы пытаетесь обмануть систему. Попробуйте еще раз!"
      );
    }

    if (Login === "Admin") {
      Registr(
        Login,
        Password,
        "+375Admin",
        "Admin",
        "Admin",
        "Admin@admin.com"
      );
      alert(
        "Вы пытаетесь зарегистрироваться как админ! Это серьезное дело, будьте осторожны, а то если это увидит настоящий админ, то вам не жить!"
      );
    } else if (
      Login === "" ||
      Password === "" ||
      Number === "" ||
      firstname === "" ||
      name === "" ||
      email === ""
    ) {
      alert(
        "Введите все данные! Мы не можем зарегистрировать вас без полной информации! И не забудьте номер карты банковской, PIN и дом на меня оформить^^"
      );
    } else {
      Registr(Login, Password, Number, firstname, name, email);
      alert("Регистрация начата! Ждите ответа от админа всю жизнь");
    }
  });

  async function Registr(Login, Password, Number, firstname, name, email) {
    if (Number.includes("+375") && email.includes("@")) {
      const response = await fetch("/task/reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Login,
          Password,
          Number,
          firstname,
          name,
          email,
        }),
      });
      if (response.ok) {
        Per.play();
        setTimeout(() => {
          alert("Регистрация успешна! Теперь вы можете войти в систему!");
          window.location.href = "/html/Enter.html";
        }, 2000);
      }

      if (!response.ok) {
        Ban.play();
        console.error("Не удалось зарегестрироваться");
        alert(
          "Регистрация не удалась! Похоже, что наши сервера обнаружили спящего ежа. Попробуйте еще раз!"
        );
      }
    } else {
      alert("Проверьте данные! Возможно, вы ПОЛЯРНАЯ ЧУКЧА!");
    }
  }

  have.addEventListener("click", () => {
    Per.play();
    setTimeout(() => {
      alert("Open your life!");
      window.location.href = "/html/Enter.html";
    }, 2000);
  });
});

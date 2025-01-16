window.addEventListener("load", () => {
  const login = document.getElementById("log-in");
  const password = document.querySelector("#password");
  const NewName = document.getElementById("newName");
  const NewFirstName = document.getElementById("newFirstName");
  const RepetName = document.getElementById("repeatName");
  const RepetFirstName = document.getElementById("repeatFirstName");
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
    const Password = password.value;
    const Newname = NewName.value;
    const Newfirstname = NewFirstName.value;
    const Reapetname = RepetName.value;
    const Reapetfirstname = RepetFirstName.value;

    if (Newname == Reapetname && Newfirstname == Reapetfirstname) {
      const response = await fetch("/task/editFI", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Login, Password, Newname, Newfirstname }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("firstname", result.firstname);
        localStorage.setItem("name", result.name);
        Edit.play();
        alert(
          "Имя и фамилия успешно обновлены! Теперь вы можете гордиться своей новой личностью!"
        );
        setTimeout(() => {
          window.location.href = "/html/Edituser.html";
        }, 2000);
      } else {
        console.error("Не удалось обновить имя и фамилию");
        alert(
          "Имя и фамилия не обновлены! Похоже, что наши сервера обнаружили спящего ежа. Попробуйте еще раз!"
        );
      }
    } else {
      alert(
        "Поля с именем и поля с фамилией должны быть ОДИНАКОВЫ! Не пытайтесь обмануть систему, это не сработает... и вы не получите приз за хитрость!"
      );
    }
  });
});

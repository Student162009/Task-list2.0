window.addEventListener("load", () => {
  const Createaudio = document.getElementById("create");
  const Create = document.getElementById("new-task-submit");
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const deadlineInput = document.querySelector("#new-task-deadline");
  const list_el = document.querySelector("#tasks");
  const sortButton = document.querySelector("#sort-tasks-submit");
  const Checkaudio = document.getElementById("check");
  const Editaudio = document.getElementById("edit");
  const Deleteaudio = document.getElementById("delete");
  const mainM = document.getElementById("mainM");
  const mainM2 = document.getElementById("mainM2");
  const mainM3 = document.getElementById("mainM3");
  const mainM4 = document.getElementById("mainM4");
  const mainM5 = document.getElementById("mainM5");
  const mainM6 = document.getElementById("mainM6");
  const mainM7 = document.getElementById("mainM7");
  const mainM8 = document.getElementById("mainM8");
  const mainM9 = document.getElementById("mainM9");
  const mainM10 = document.getElementById("mainM10");
  const mainM11 = document.getElementById("mainM11");
  const mainM12 = document.getElementById("mainM12");
  const catinput = document.getElementById("category");
  const findCat = document.getElementById("findcategory");
  const categorybut = document.getElementById("findcatbut");
  const findNam = document.getElementById("findname");
  const findnamebut = document.getElementById("findnamebut");
  const findDead = document.getElementById("finddeadline");
  const findDeadbut = document.getElementById("finddeadlinebut");
  const change = document.querySelectorAll('input[name="status"]');

  const images = [
    "../img/Ава1.jpg",
    "../img/Ава2.jpg",
    "../img/Ава3.jpg",
    "../img/Ава4.jpg",
    "../img/Ава5.jpg",
  ];

  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];
  const imageContainer = document.getElementById("container");
  imageContainer.innerHTML = `
 <div id="FI"></div>
 <img src="${randomImage}" alt="Random Image">
 <button id="editUser">Edit Profile</button>
 <button id="log">Log Out (._.)</button>
 `;

  mainM.play();

  mainM.addEventListener("ended", () => {
    mainM2.play();
  });
  mainM2.addEventListener("ended", () => {
    mainM3.play();
  });
  mainM3.addEventListener("ended", () => {
    mainM4.play();
  });
  mainM4.addEventListener("ended", () => {
    mainM5.play();
  });
  mainM5.addEventListener("ended", () => {
    mainM6.play();
  });
  mainM6.addEventListener("ended", () => {
    mainM7.play();
  });
  mainM7.addEventListener("ended", () => {
    mainM8.play();
  });
  mainM8.addEventListener("ended", () => {
    mainM9.play();
  });
  mainM9.addEventListener("ended", () => {
    mainM10.play();
  });
  mainM10.addEventListener("ended", () => {
    mainM11.play();
  });

  mainM11.addEventListener("ended", () => {
    mainM12.play();
  });

  mainM12.addEventListener("ended", () => {
    mainM.play();
  });

  Create.addEventListener("click", function () {
    Createaudio.play();
  });

  const firstname = localStorage.getItem("firstname");
  const name = localStorage.getItem("name");

  if (firstname && name) {
    document.getElementById("FI").innerText = `Welcome, ${firstname} ${name}!`;
  }

  const secretButton = document.createElement("button");
  secretButton.textContent = "Секретная кнопка";
  secretButton.style.display = "none";
  document.querySelector(".grad-container").appendChild(secretButton);

  document.addEventListener("keydown", (e) => {
    if (e.altKey && e.shiftKey && e.key === "S") {
      secretButton.style.display = "block";
    }
    if (e.key === "c") {
      secretButton.style.display = "none";
    }
  });

  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.maxResults = 10;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (transcript.toLowerCase().includes("Secret")) {
      secretButton.style.display = "block";
    }
    if (transcript.toLowerCase().includes("Hide")) {
      secretButton.style.display = "none";
    }
  };

  recognition.onerror = (event) => {
    console.error("Ошибка распознавания:", event.error);
  };

  recognition.onstart = () => {
    console.log("Начало распознавания");
  };

  recognition.onend = () => {
    console.log("Окончание распознавания");
  };

  document.getElementById("startSpeech").addEventListener("click", () => {
    recognition.start();
  });

  secretButton.addEventListener("click", () => {
    alert("Я люблю Миту из MiSide");
    window.location.href =
      "https://clan.fastly.steamstatic.com/images/44457345/fae6180e0c0ea93cc9b101d2ffe5ac733858d183_400x225.png";
  });

  document.getElementById("log").addEventListener("click", async () => {
    if (confirm("Ты точно хочешь выйти?")) {
      if (confirm("Пожалуйста давай ещё побудем вместе")) {
        if (confirm("НЕ УХОДИ ПРОШУ")) {
          const mitaVideo = document.getElementById("mitaVideo");
          mitaVideo.style.display = "block";
          mitaVideo.play();
          await new Promise((resolve) => {
            mitaVideo.onended = () => {
              mitaVideo.style.display = "none";
              resolve();
            };
          });
        }
      }
    }
    document.querySelector("#tasks").innerHTML = "";
    window.location.href = "/html/Enter.html";
  });

  document.getElementById("editUser").addEventListener("click", () => {
    Editaudio.play();
    setTimeout(() => {
      alert(
        "Вы собираетесь изменить профиль! Удачи, и не забудьте почистить свои мысли!"
      );
      window.location.href = "/html/Edituser.html";
    }, 2000);
  });

  document.getElementById("Admin").addEventListener("click", () => {
    Editaudio.play();
    setTimeout(() => {
      alert(
        "Вы входите в панель администратора! Будьте осторожны, здесь вы не выйдите живым если вы конечно не админ!"
      );
      window.location.href = "/html/AdminPanel/Admin.html";
    }, 2000);
  });

  async function getTasks() {
    document.querySelector("#tasks").innerHTML = "";
    const response = await fetch("/task/get", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      let tasks = await response.json();
      tasks = sortTasks(tasks);
      tasks.forEach((task) => addTask(task));
    } else {
      console.error("Не удалось получить задачи", response.statusText);
      alert(
        "Ой-ой! Похоже, что наши задачи решили взять выходной. Статус: " +
          response.statusText +
          ". Не переживайте, мы их найдем и вернем на работу!"
      );
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const task = input.value.trim();
    const deadline = deadlineInput.value;
    const category = catinput.value;

    if (task === "" || category === "") {
      alert(
        "Эй, похоже, что поле задачи и категории решили поиграть в прятки! Они не могут быть пустыми. Давайте их найдем и заполним!"
      );
      return;
    }
    if (new Date(deadline) < new Date()) {
      alert(
        "Ой! Срок выполнения не может быть в прошлом. Мы не умеем путешествовать во времени, так что давайте установим дату в будущем!"
      );
      return;
    }

    const response = await fetch("/task/addWithDeadline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, deadline, category }),
    });

    if (response.ok) {
      const newTask = await response.json();
      addTask(newTask);
      getTasks();
      input.value = "";
      deadlineInput.value = "";
      catinput.value = "";
      alert(
        "Задача добавлена успешно! Теперь вы можете расслабиться и наслаждаться жизнью!"
      );
    } else {
      console.error("Не удалось добавить задачу");
      alert(
        "Не удалось добавить задачу! Похоже, что наши серверы решили поиграть в прятки. Попробуйте еще раз!"
      );
    }
  });

  sortButton.addEventListener("click", (e) => {
    document.querySelector("#tasks").innerHTML = "";
    e.preventDefault();
    sortAndDisplayTasks();
    alert(
      "Вы решили отсортировать задачи! Теперь они будут в порядке, как и ваша жизнь!"
    );
  });

  categorybut.addEventListener("click", (e) => {
    document.querySelector("#tasks").innerHTML = "";
    e.preventDefault();
    findCategory();
    alert("Вы ищете задачи по категории! Удачи в поисках!");
  });

  findnamebut.addEventListener("click", (e) => {
    document.querySelector("#tasks").innerHTML = "";
    e.preventDefault();
    findName();
    alert("Вы ищете задачу по имени! Может быть, она спряталась за диваном?");
  });

  findDeadbut.addEventListener("click", (e) => {
    document.querySelector("#tasks").innerHTML = "";
    e.preventDefault();
    findDeadline();
    alert("Вы ищете задачи по сроку! Не забудьте проверить календарь!");
  });

  change.forEach((elem) => {
    elem.addEventListener("change", async (event) => {
      if (event.target.value === "overdue") {
        sortDeadline();
        alert(
          "Вы решили посмотреть просроченные задачи! Не волнуйтесь, мы их поможем исправить!"
        );
      } else if (event.target.value === "all") {
        getTasks();
        alert(
          "Вы хотите посмотреть все задачи! Это много работы, но мы вас поддержим!"
        );
      } else if (event.target.value === "completedtasks") {
        sortCOM();
        alert(
          "Вы решили посмотреть выполненные задачи! Поздравляем с успехом!"
        );
      } else if (event.target.value === "not") {
        sortNotCOM();
        alert(
          "Вы хотите посмотреть невыполненные задачи! Не волнуйтесь, мы их поможем завершить!"
        );
      } else {
        console.log("error");
      }
    });
  });

  function sortTasks(tasks) {
    return tasks.sort((a, b) => a.task.localeCompare(b.task));
  }

  function sortAndDisplayTasks() {
    const taskElements = Array.from(document.querySelectorAll(".task"));
    const tasks = taskElements.map((taskEl) => ({
      task: taskEl.querySelector(".text").value,
      deadline: taskEl.querySelector(".deadline").textContent,
      category: taskEl.querySelector(".category").textContent,
      completed: taskEl.querySelector('input[type="checkbox"]').checked,
    }));

    const sortedTasks = sortTasks(tasks);

    list_el.innerHTML = "";
    sortedTasks.forEach((task) => addTask(task));
  }

  function addTask(task) {
    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = task.task;
    task_input_el.setAttribute("readonly", "readonly");

    const task_deadline_el = document.createElement("span");
    task_deadline_el.classList.add("deadline");
    task_deadline_el.textContent = task.deadline;

    const task_category_el = document.createElement("span");
    task_category_el.classList.add("category");
    task_category_el.textContent = task.category;

    task_content_el.appendChild(task_input_el);
    task_content_el.appendChild(task_deadline_el);
    task_content_el.appendChild(task_category_el);

    const task_complete_el = document.createElement("input");
    task_complete_el.type = "checkbox";
    task_complete_el.checked = task.completed || false;
    task_complete_el.addEventListener("change", async () => {
      const response = await fetch("/task/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: task.task, category: task.category }),
      });

      if (response.ok) {
        task.completed = task_complete_el.checked;
        if (task.completed) {
          task_el.classList.add("completed");
          alert("Задача завершена! Поздравляем с успехом!");
        }
      } else {
        console.error("Не удалось пометить задачу как завершённую");
        alert(
          "Не удалось пометить задачу как завершенную! Похоже, что наши сервера решили взять небольшой сон. Попробуйте еще раз!"
        );
      }
    });

    task_content_el.prepend(task_complete_el);

    task_el.appendChild(task_content_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerText = "Edit";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerText = "Delete";

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    if (new Date(task.deadline) < new Date() && !task.completed) {
      task_el.classList.add("overdue");
      task_edit_el.disabled = true;
      alert("Задача просрочена! Не забудьте ее выполнить как можно скорее!");
    }

    list_el.appendChild(task_el);

    task_edit_el.addEventListener("click", async (e) => {
      Editaudio.play();
      if (task_edit_el.innerText.toLowerCase() == "edit") {
        task_edit_el.innerText = "Save";
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
        alert("Вы собираетесь отредактировать задачу! Удачи!");
      } else {
        task_edit_el.innerText = "Edit";
        task_input_el.setAttribute("readonly", "readonly");

        const newTask = task_input_el.value;

        const response = await fetch("/task/edit", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: task.task, newTask }),
        });

        if (response.ok) {
          task.task = newTask;
          alert("Задача обновлена успешно! Теперь все в порядке!");
        } else {
          console.error("Не удалось обновить задачу");
          alert(
            "Не удалось обновить задачу! Похоже, что наши сервера решили устроить небольшой хаос. Попробуйте еще раз!"
          );
        }
      }
    });

    task_delete_el.addEventListener("click", async (e) => {
      list_el.removeChild(task_el);

      const response = await fetch("/task/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: task.task }),
      });

      if (!response.ok) {
        console.error("Не удалось удалить задачу");
        alert(
          "Не удалось удалить задачу! Похоже, что наши сервера решили сохранить ее на память. Попробуйте еще раз!"
        );
      } else {
        alert("Задача удалена успешно! Теперь все чисто и улик нет!");
      }
    });

    task_delete_el.addEventListener("click", function () {
      Deleteaudio.play();
    });
    task_complete_el.addEventListener(
      "change",
      function (event) {
        if (event.target.checked) {
          Checkaudio.play();
        }
      },
      false
    );
  }

  async function findCategory() {
    const cat = findCat.value;
    if (cat === "") {
      getTasks();
    }
    const response = await fetch("/task/findCategory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cat }),
    });

    if (response.ok) {
      document.querySelector("#tasks").innerHTML = "";
      let tasks = await response.json();
      tasks.forEach((task) => addTask(task));
    } else {
      console.log("Нету ");
      alert(
        "Задачи по категории не найдены! Похоже, что они решили устроить небольшой перерыв. Попробуйте еще раз!"
      );
    }
  }

  async function findName() {
    const name = findNam.value;
    if (name === "") {
      document.querySelector("#tasks").innerHTML = "";
      getTasks();
    }
    const response = await fetch("/task/findTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      document.querySelector("#tasks").innerHTML = "";
      let tasks = await response.json();
      tasks.forEach((task) => addTask(task));
    } else {
      console.log("Нету ");
      alert(
        "Задачи по имени не найдены! Похоже, что они решили устроить небольшой перерыв. Попробуйте еще раз!"
      );
    }
  }

  async function findDeadline() {
    const data = findDead.value;
    if (data === "") {
      document.querySelector("#tasks").innerHTML = "";
      getTasks();
    }
    const response = await fetch("/task/findDead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      document.querySelector("#tasks").innerHTML = "";
      let tasks = await response.json();
      tasks.forEach((task) => addTask(task));
    } else {
      console.log("Нету ");
      alert(
        "Задачи по сроку не найдены! Похоже, что они решили устроить небольшой перерыв. Попробуйте еще раз!"
      );
    }
  }

  async function sortDeadline() {
    const response = await fetch("/task/sortDead", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.querySelector("#tasks").innerHTML = "";
      let tasks = await response.json();
      tasks.forEach((task) => addTask(task));
    } else {
      document.querySelector("#tasks").innerHTML = "";
      console.log("Нету ");
      alert(
        "Задачи не отсортированы! Похоже, что наши сервера решили взять небольшой сон. Попробуйте еще раз!"
      );
    }
  }

  async function sortCOM() {
    const response = await fetch("/task/sortCOM", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.querySelector("#tasks").innerHTML = "";
      let tasks = await response.json();
      tasks.forEach((task) => addTask(task));
    } else {
      document.querySelector("#tasks").innerHTML = "";
      console.log("Нету ");
      alert(
        "Выполненные задачи не отображены! Похоже, что наши сервера решили устроить небольшой хаос. Попробуйте еще раз!"
      );
    }
  }

  async function sortNotCOM() {
    const response = await fetch("/task/sortNotCOM", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.querySelector("#tasks").innerHTML = "";
      let tasks = await response.json();
      tasks.forEach((task) => addTask(task));
    } else {
      document.querySelector("#tasks").innerHTML = "";
      console.log("Нету ");
      alert(
        "Невыполненные задачи не отображены! Похоже, что наши сервера решили взять небольшой сон. Попробуйте еще раз!"
      );
    }
  }

  getTasks();
});

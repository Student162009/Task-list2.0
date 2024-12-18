window.addEventListener('load', () => {
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

    mainM.autoplay = true;
    mainM.loop = true;

    Create.addEventListener("click", function() {
        Createaudio.play();
    });
 
    const firstname = localStorage.getItem('firstname');
    const name = localStorage.getItem('name');

    if (firstname && name) {
        document.getElementById("FI").innerText = `Welcome, ${firstname} ${name}!`;
    }

document.getElementById("log").addEventListener("click", () =>{
    window.location.href = "/html/Enter.html";
});

    async function getTasks() {
        const response = await fetch("/task/get", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            let tasks = await response.json();
            tasks = sortTasks(tasks); 
            tasks.forEach(task => addTask(task));
        } else {
            console.error('Не удалось получить задачи');
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const task = input.value.trim();
        const deadline = deadlineInput.value;

        if (task === "") {
            alert("Поле задачи не может быть пустым.");
            return;
        }

        const response = await fetch("/task/addWithDeadline", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ task, deadline })
        });

        if (response.ok) {
            const newTask = await response.json();
            addTask(newTask);
            input.value = '';
            deadlineInput.value = '';
        } else {
            console.error('Не удалось добавить задачу');
        }
    });

    sortButton.addEventListener('click', (e) => {
        e.preventDefault();
        sortAndDisplayTasks();
    });

    function sortTasks(tasks) {
        return tasks.sort((a, b) => a.task.localeCompare(b.task));
    }

    function sortAndDisplayTasks() {
        const taskElements = Array.from(document.querySelectorAll('.task'));
        const tasks = taskElements.map(taskEl => ({
            task: taskEl.querySelector('.text').value,
            deadline: taskEl.querySelector('.deadline').textContent,
            completed: taskEl.querySelector('input[type="checkbox"]').checked
        }));

        const sortedTasks = sortTasks(tasks);

        list_el.innerHTML = '';
        sortedTasks.forEach(task => addTask(task));
    }

    function addTask(task) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task.task;
        task_input_el.setAttribute('readonly', 'readonly');

        const task_deadline_el = document.createElement('span');
        task_deadline_el.classList.add('deadline');
        task_deadline_el.textContent = task.deadline;

        task_content_el.appendChild(task_input_el);
        task_content_el.appendChild(task_deadline_el);

        const task_complete_el = document.createElement('input');
        task_complete_el.type = 'checkbox';
        task_complete_el.checked = task.completed || false;
        task_complete_el.addEventListener('change', async () => {
            const response = await fetch("/task/complete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task: task.task })
            });

            if (response.ok) {
                task.completed = task_complete_el.checked;
                if (task.completed) {
                    task_el.classList.add('completed');
                } else {
                    task_el.classList.remove('completed');
                }
            } else {
                console.error('Не удалось пометить задачу как завершённую');
            }
        });

        task_content_el.prepend(task_complete_el);

        task_el.appendChild(task_content_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        if (new Date(task.deadline) < new Date() && !task.completed) {
            task_el.classList.add('overdue');
            task_edit_el.disabled = true;
        }

        list_el.appendChild(task_el);

        task_edit_el.addEventListener('click', async (e) => {
            Editaudio.play();
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");

                const newTask = task_input_el.value;

                const response = await fetch("/task/edit", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ task: task.task, newTask })
                });

                if (response.ok) {
                    task.task = newTask;
                } else {
                    console.error('Не удалось обновить задачу');
                }
            }
        });

        task_delete_el.addEventListener('click', async (e) => {
            list_el.removeChild(task_el);

            const response = await fetch("/task/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task: task.task })
            });

            if (!response.ok) {
                console.error('Не удалось удалить задачу');
            }
        });

        task_delete_el.addEventListener("click", function() {
            Deleteaudio.play();
        });
        task_complete_el.addEventListener('change', function (event) { 
              if (event.target.checked) {
                    Checkaudio.play();
                };
            }, false);
    }
    getTasks();
});
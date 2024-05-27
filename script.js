class Task {
    constructor(description) {
        this.description = description;
    }
}

class ToDoList {
    constructor() {
        this.tasks = [];
    }

    addTask(description) {
        const task = new Task(description);
        this.tasks.push(task);
        this.renderTasks();
        this.saveTasksToLocalStorage();
    }

    doneTask(index) {
        this.tasks.splice(index, 1);
        this.renderTasks();
        this.saveTasksToLocalStorage();
    }

    renderTasks() {
        const taskList = document.querySelector(".task-list");
        taskList.innerHTML = "";
        this.tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task.description;
            li.classList.add("task-item");

            const doneBtn = document.createElement("button");
            doneBtn.textContent = "Done";
            doneBtn.classList.add("done-task-btn");
            doneBtn.addEventListener("click", () => this.doneTask(index));

            li.appendChild(doneBtn);
            taskList.appendChild(li);
        });

        this.initDragAndDrop();
    }

    saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks) {
            this.tasks = tasks.map(task => new Task(task.description));
            this.renderTasks();
        }
    }

    initDragAndDrop() {
        const taskList = document.querySelector(".task-list");
        new Sortable(taskList, {
            animation: 150,
            onUpdate: () => this.saveTasksToLocalStorage()
        });
    }
}

const toDoList = new ToDoList();

document.querySelector(".add-task-btn").addEventListener("click", () => {
    const taskInput = document.querySelector(".task-input");
    const taskDescription = taskInput.value.trim();
    if (taskDescription !== "") {
        toDoList.addTask(taskDescription);
        taskInput.value = "";
    } else {
        alert("Please enter a task.");
    }
});

window.addEventListener("DOMContentLoaded", () => {
    toDoList.loadTasksFromLocalStorage();
});

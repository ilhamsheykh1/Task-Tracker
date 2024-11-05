class Task {
    constructor(id, description) {
        this.id = id;
        this.description = description;
    }
}
class TaskManager {
    constructor() {
        this.tasks = [];
        this.ascending = true;
        this.currentId = 0;
    }

    addTask(description) {
        const task = new Task(this.currentId, description);
        this.tasks.push(task);
        this.renderTasks();
        this.currentId++;
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.renderTasks();
    }

    sortTasks() {
        this.tasks.sort((a, b) =>
            this.ascending ? a.description.localeCompare(b.description) :
                b.description.localeCompare(a.description)
        );
        const sortBtn = document.querySelector('.sort-btn');
        const sortBtnImg = document.querySelector('.sort-btn img');

        sortBtn.addEventListener('mouseover', () => {
            if (taskManager.ascending) {
                sortBtnImg.src = 'images/Group 73.png';
            } else {
                sortBtnImg.src = 'images/Group 91.png';
            }
        });

        sortBtn.addEventListener('mouseout', () => {
            if (taskManager.ascending) {
                sortBtnImg.src = 'images/Group 74.png';
            } else {
                sortBtnImg.src = 'images/Group 90.png';
            }
        });

        this.ascending = !this.ascending;

        this.renderTasks();
    }

    renderTasks() {
        let taskList = document.querySelector('.todo-list');
        taskList.style.display = 'block'
        taskList.innerHTML = '';
        if (this.tasks.length > 0) {
            taskList.style.display = 'block';
            this.tasks.forEach(task => {
                let li = document.createElement('li');

                let taskDiv = document.createElement('div');
                taskDiv.classList.add('task-text');
                taskDiv.textContent = task.description;

                let deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-button');

                let deleteImg = document.createElement('img');
                deleteImg.src = 'images/Group 56.png';
                deleteImg.classList.add('first');
                deleteImg.alt = 'delete';
                deleteBtn.appendChild(deleteImg);

                let deleteImg2 = document.createElement('img');
                deleteImg2.src = 'images/Group 70.png';
                deleteImg2.classList.add('second');
                deleteImg2.alt = 'delete';
                deleteBtn.appendChild(deleteImg2);

                deleteBtn.onclick = () => this.deleteTask(task.id);

                li.appendChild(taskDiv);
                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            });
        } else {
            taskList.style.display = 'none';
        }
    }

}

const taskManager = new TaskManager();

document.querySelector('.add-button').addEventListener('click', () => {
    document.querySelector('.delete-container').style.display = 'block'
    const taskInput = document.getElementById('task-input');
    const description = taskInput.value.trim();

    if (description !== "") {
        taskManager.addTask(description);
        taskInput.value = "";
    }
});
document.querySelector('.delete-button').addEventListener('click', () => {
    document.querySelector('.delete-container').style.display = 'none'
})
document.querySelector('.sort-btn').addEventListener('click', () => taskManager.sortTasks());
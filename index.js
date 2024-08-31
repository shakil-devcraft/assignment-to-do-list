let taskList = [];
let indexCount = null;

// select all need id or class
const taskInfo = document.getElementById('task_info');
const taskInput = document.getElementById('task_input');
const addBtn = document.getElementById('add_btn');
const todoList = document.getElementById('todo_list');

// add event click and keypress
addBtn.addEventListener('click', addOrUpdateTask);
taskInput.addEventListener('keypress', pressEnter);

// keypress function call and execution addOrUpdateTask function
function pressEnter(e) {
    if (e.key === 'Enter') {
        addOrUpdateTask();
    }
};

// add or update task content
function addOrUpdateTask() {
    const task = taskInput.value.trim();

    if (task === ''){
        return alert("Please, add something tasks");
    };

    if (indexCount === null) {
        taskList.push({ task, date: new Date().toLocaleDateString(), completed: false });
    } else {
        taskList[indexCount].task = task;
        indexCount = null;
        addBtn.textContent = 'Add Task';
    }

    taskInput.value = '';
    renderTaskList();
    updateSummary();
}

// add new dynamically information of tasks in a row
function renderTaskList() {
    todoList.innerHTML = '';

    taskList.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border-b p-2">${index + 1}</td>
            <td class="border-b p-2">${item.task}</td>
            <td class="border-b p-2">${item.date}</td>
            <td class="border-b p-2">
                <input type="checkbox" ${item.completed ? 'checked' : ''} onclick="toggleStatus(${index})">
            </td>
            <td class="border-b p-2 flex justify-between">
            <button class="text-red-500 ml-2" onclick="deleteTask(${index})">&#128465;</button>
            <button class="text-blue-500" onclick="editTask(${index})">&#9998;</button>
            </td>
        `;
        todoList.appendChild(row);
    });
}

// check status completed or not
function toggleStatus(index) {
    taskList[index].completed = !taskList[index].completed;
    renderTaskList();
    updateSummary();
}

// delete or remove one
function deleteTask(index) {
    taskList.splice(index, 1);
    renderTaskList();
    updateSummary();
}

// edit something
function editTask(index) {
    taskInput.value = taskList[index].task;
    addBtn.textContent = 'Update Task';
    indexCount = index;
}

// update task info or summary
function updateSummary() {
    const totalTasks = taskList.length;
    const completedTasks = taskList.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    taskInfo.textContent = `${totalTasks} Total, ${completedTasks} Completed, ${pendingTasks} Pending`;
}

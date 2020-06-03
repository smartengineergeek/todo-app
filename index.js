// this is a Todo class for integrating data with root element
class Todo{
    constructor(){
        this.rootElement = document.getElementById('root');
        // localStorage.setItem("todos", 
        //     JSON.stringify([
        //         {
        //             "id": "task1",
        //             "value": "i am learning object oriented javascript",
        //             "completed": false
        //         },
        //         {
        //             "id": "task2",
        //             "value": "This is a beautiful day",
        //             "completed": false
        //         }
        //     ])
        // );
    }

    mainComponent(){
        this.rootElement.innerHTML = `
        <h1 class="centered main-heading">Todos</h1>
        <h5 class="heading-msg">this app is developed in object-oriented javascript</h5>
        <div class="todo--app">
            <div class="input--section">
                <textarea cols="100" rows="3" id="todo-input" class="form--text"></textarea>              
                <button class="form--btn" id="save-btn">Save</button>
            </div>
            <div class="todo--data">
                <ul id="todo-display-data" class="todo--display--data" />
            </div>
        </div>
        `;
        // bind click listener to save-btn
        document.getElementById('save-btn').addEventListener('click', () => {
            // save the submitted task in todoData array
            let task = document.getElementById("todo-input").value;
            let updatedTask = JSON.parse(localStorage.getItem("todos"));
            updatedTask.push({
                id: "task"+(updatedTask.length),
                value: task,
                completed: false
            });
            localStorage.setItem("todos", JSON.stringify(updatedTask));
            document.getElementById("todo-input").value = "";
            this.bindTodoData();
            this.removeTask();
            this.editTask();
        });
    }

    bindTodoData(){
    //     <button class="func-btn">
    //     <i class="fa fa-edit task-edit" id="task-edit-${index}"></i>
    // </button>&nbsp;

        // if there is data in todoData array then bind to id="todo-display-data"
        let dataComp = [];
        let todoData = JSON.parse(localStorage.getItem("todos"));
        if(todoData.length > 0){
            todoData.forEach((task, index) => {
                dataComp.push(`
                    <li id=${task.id}>
                        <span class="text">    
                            <input type="checkbox" class="complete-task" id="complete-${task.id}"/>
                            <span class="task-edit" id="task-edit-${task.id}">${task.value}</span>
                        </span> 
                        <i class="fa fa-trash task-remove" id="task-remove-${index}"></i>
                    </li>`
                )
            })
        }else{
            dataComp.push(`<li>Please add task</li>`);
        }
        document.querySelector("#todo-display-data").innerHTML = dataComp;        
    }


    completedTask(){
        const buttons = document.querySelectorAll(".complete-task");
        for(let button of buttons){
            button.addEventListener("click", (event) => {
                let index = (event.target.id).replace("complete-task", "");
                let updatedTask = JSON.parse(localStorage.getItem("todos"));
                console.log(button.parentElement)
                console.log(event.target.value)
                if(event.target.value){
                    button.parentElement.className += " completed";
                    updatedTask[index].completed = true;
                }else{
                    button.parentElement.className.replace("completed", "");
                    updatedTask[index].completed = false;
                }
                localStorage.setItem("todos", JSON.stringify(updatedTask));
                this.bindTodoData();
            })
        }
    }

    removeTask(){
        const removeButtons = document.querySelectorAll(".task-remove")
        for(let button of removeButtons){
            button.addEventListener("click", (event) => {
                let index = (event.target.id).replace("task-remove-", "");
                let updatedTask = JSON.parse(localStorage.getItem("todos"));
                updatedTask.splice(index, 1);
                localStorage.setItem("todos", JSON.stringify(updatedTask));
                this.bindTodoData();
            })    
        }
    }

    // this is for editing task
    editTask(){
        const editButtons = document.querySelectorAll(".task-edit")
        for(let button of editButtons){
            button.addEventListener("click", (event) => {
                console.log("id ", event.target.id)
                let index = (event.target.id).replace("task-edit-task", "");
                console.log("index ", index);
                let todoData = JSON.parse(localStorage.getItem("todos"));
                let value = todoData[index].value;

                document.getElementById("task-edit-task"+index).outerHTML = `
                    <span id="update-task-${index}" class="update-task">
                        <textarea cols="70" rows="2" id="task-update-text-${index}">${value}</textarea>
                    </span>
                `;
                // now update a task
                document.querySelector("#update-task-"+index).addEventListener("keypress", event => {
                    console.log("keyCode ",event.keyCode)
                    if(event.keyCode === 13){
                        let index = (event.target.id).replace("task-update-text-", "");
                        console.log("index ", index);

                        let value = document.getElementById("task-update-text-"+index).value;
                        console.log("value ", value);
                        todoData[index].value = value;
                        localStorage.setItem("todos", JSON.stringify(todoData));
                        this.bindTodoData();
                    }        
                })                
            });
        }
    }
}

var todo = new Todo();
todo.mainComponent();
todo.bindTodoData();
todo.removeTask();
todo.editTask();
todo.completedTask();

var todoData = todo.todoData;
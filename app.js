
import { getDocs, collection, db, addDoc, deleteDoc, doc, updateDoc } from "./firebaseConfig.js";


let todosData = [];

let todosBoxElm = document.querySelector("#todos-box");


let fetchTodos = async () => {
    try {
        todosData = [];

        const querySnapshot = await getDocs(collection(db, "todos"));

        querySnapshot.forEach((doc) => {
            todosData.push({
                ...doc.data(), id: doc.id
            });
        });

        todosBoxElm.innerHTML = "";

        todosData.map((todoObj) => {

            let todoBox = document.createElement("div");
            todoBox.className = "todo-box";

            let task = document.createElement("span");
            task.innerText = todoObj.task;

            let delBtn = document.createElement("button");
            delBtn.innerText = "Delete";
            delBtn.className = "delete";

            delBtn.addEventListener("click", () => deleteTodo(todoObj.id));

            let updateBtn = document.createElement("button");
            updateBtn.innerText = "Update";
            updateBtn.className = "update";

            updateBtn.addEventListener("click", () => updateTodo(todoObj.id));

            todoBox.appendChild(task);
            todoBox.appendChild(delBtn);
            todoBox.appendChild(updateBtn);

            todosBoxElm.appendChild(todoBox);

        });

    } catch (error) {
        console.error(error);
    }
}


let addTodo = async () => {
    try {
        let todoInp = document.querySelector("#todo");

        if (todoInp.value.trim() === "") {
            alert("Please enter your task");
            return;
        }

        const docRef = await addDoc(collection(db, "todos"), {
            task: todoInp.value
        });

        todoInp.value = "";

        console.log("Todo added with ID:", docRef.id);

        fetchTodos();

    } catch (error) {
        console.error(error);
    }
}

document.querySelector("#add-btn").addEventListener("click", addTodo);

let deleteTodo = async (uid) => {
    try {
        await deleteDoc(doc(db, "todos", uid));

        todosData = todosData.filter((todo) => todo.id != uid);

        fetchTodos();

        console.log("Todo successfully deleted");

    } catch (error) {
        console.error(error);
    }
}
let updateTodo = async (uid) => {
    try {
        let newTask = prompt("Enter updated task");

        if (newTask === null || newTask.trim() === "") {
            return;
        }

        const docRef = doc(db, "todos", uid);

        await updateDoc(docRef, {
            task: newTask
        });

        todosData.forEach((todoObj) => {
            if (todoObj.id == uid) {
                todoObj.task = newTask;
            }
        });

        fetchTodos();

        console.log("Todo updated successfully");

    } catch (error) {
        console.error(error);
    }
}

fetchTodos();

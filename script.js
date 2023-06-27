let content = document.querySelector("#fill-to-do-list")
let taskList = document.querySelector(".task-list")
let toDoList = JSON.parse(localStorage.getItem("value")) || []
let countInput 

const addTask = () => {

    if(content.value === "") alert("Please fill the input!")

    else{

        let wraper = document.createElement("div")
        wraper.setAttribute("class", "task")
        taskList.appendChild(wraper)

        newTask = document.createElement("input")
        newTask.setAttribute("class", "input-" + countInput++)
        newTask.setAttribute("type", "text")
        newTask.setAttribute("disabled", "")
        newTask.value = content.value
        wraper.appendChild(newTask)

        let action = document.createElement("div")
        action.setAttribute("class", "action")
        wraper.appendChild(action)

        let editBtn = document.createElement("button")
        editBtn.setAttribute("class", "editBtn")
        editBtn.innerHTML = "&#9998"
        action.appendChild(editBtn)

        let deleteBtn = document.createElement("button")
        deleteBtn.setAttribute("class", "deleteBtn")
        deleteBtn.innerHTML = "&#215"
        action.appendChild(deleteBtn)

    }

    content.value = ""
    saveData(newTask.value)

}

const saveData = (value) => {
    localStorage.setItem("element", taskList.innerHTML) 
    // set item buat bikin input
    localStorage.setItem("countInput", countInput)
    let todo = {
        "id" : countInput - 1,
        content : value
    }
    toDoList.push(todo)
    localStorage.setItem("value", JSON.stringify(toDoList))
}

const showData = () => {
    taskList.innerHTML = localStorage.getItem("element")
    //  get item buat ambil element
    let temp = localStorage.getItem("countInput")
    countInput = "1"
    toDoList.forEach(element => {
          let input = document.querySelector(".input-" + element.id)
          input.value = element.content
    })
    countInput = temp
    if (countInput === null) countInput = "1"
    // removeitem buat delete
}

showData()


// const saveData = (value) => {
//     localStorage.setItem("element", taskList.innerHTML)
//     localStorage.setItem("countInput", countInput)
//     let todo = {
//         "id" : countInput,
//         content : value

//     } 
//     toDoList.push(todo)
//     localStorage.setItem("value", JSON.stringify(toDoList))
// }

// const showData = () => {
//     taskList.innerHTML = localStorage.getItem("element")
//     let temp = localStorage.getItem("countInput")
//     countInput = "1"
//     toDoList.forEach(element => {
//         let input = document.querySelector(".input-" + element.id)
//         input.value = element.content
//     })
//     countInput = temp
//     if(countInput === null) countInput = "1"

// }

// showData()

taskList.addEventListener("click", (e) => {
    // console.log("NAIS") cek
    if(e.target.classList.contains("editBtn")){
        // console.log("edit")
        let task = e.target.parentElement.parentElement.firstChild
        let getClass = task.className
        let idx = getClass.split("-")
        if(e.target.innerHTML === "✎"){
            task.removeAttribute("disabled")
            task.focus() //biar langsung kursor ke sana biar ga usah mindahin pake mouse jadi langsung
            e.target.innerHTML = "&#10003"
        }
        else {
            toDoList.forEach(e => {
                if(idx[1] === e.id.toString()){
                    e.content = task.value
                }
            })
            task.setAttribute("disabled", "")
            e.target.innerHTML = "&#9998"
        }
        localStorage.setItem("value", JSON.stringify(toDoList))
    }
    else if(e.target.classList.contains("deleteBtn")){
        // console.log("delete")
        let task = JSON.parse(`{"content": "` + e.target.parentElement.parentElement.firstChild.value + `"}`)
        toDoList = toDoList.filter(element => element.content != task.content)
        e.target.parentElement.parentElement.remove()
        localStorage.setItem("element", taskList.innerHTML)
        localStorage.setItem("value", JSON.stringify(toDoList))
        //kenapa 2 karena kita mau buang yang task yaitu wrapper kedua
    }
} , false)
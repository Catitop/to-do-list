let openTasksContainer = document.querySelector(".open_tasks_container")
let openTaskCounter = document.querySelector(".open_list_counter")
let ongoingTasksContainer = document.querySelector(".ongoing_tasks_container")
let ongoingTaskCounter = document.querySelector(".ongoing_list_counter")
let finishedTasksContainer = document.querySelector(".finished_tasks_container")
let finishedTaskCounter = document.querySelector(".finished_list_counter")

/* Draggable features */



/* Draggable features */

let body = document.querySelector("body")
let taskTitle
let taskDescription
let openArray = [];
let ongoingArray = [];
let finishedArray = [];
let arrayToAdd = []
let modalInfo = {
    title: "", 
    description: "",
    id: arrayToAdd.length-1
};


const arrayString = {
    Open: 'Open',
    Ongoing: 'Ongoing',
    Finished: 'Finished',
};

const modal = document.getElementById("modal");
const fade = document.getElementById("fade");

const buttonCloseModal = document.getElementById("close-modal");

function openModal(id, columnType) {
    
    let element 
    let colorTypeClass
    let selectorTitle

    if (columnType === arrayString.Open) {
       element = openArray[id];
       colorTypeClass = 'red';
       selectorTitle = 'ABERTO'
    };
    
    if (columnType === arrayString.Ongoing) {
        element = ongoingArray[id];
        colorTypeClass = 'orange';
        selectorTitle = 'EM ANDAMENTO'
    };
    
    if (columnType === arrayString.Finished) {
        element = finishedArray[id];
        colorTypeClass = 'green';
        selectorTitle = 'FINALIZADO'
    };

    let fadeContent = `
        <div id="fade-content"  onclick="updateTask(${id}, '${columnType}')"></div>
    `
    let modalContent = `
        <div class="modal-header">
            <div class="select_and_open_time">
                <button class="task_selector ${colorTypeClass}">${selectorTitle}</button>
                <div class="time_icon_and_status">
                    <img src="/style/assets/Vector.svg">
                    <span class="time_status">Time</span>
                </div>
            </div>
            <button id="close-modal" onclick="updateTask(${id}, '${columnType}')">x</button>
        </div>
        <div class="modal-body">
        <textarea  id="task-title" placeholder="TÍTULO">Titulo</textarea>
        <div class="to_do_list_title_text_modal">
            <span>Suas Tarefas</span>
            <div class="to_do_list_title_hr">
            <hr class="bold_hr"><hr class="default_hr">
            </div>
        </div>
            <textarea 
                name="description" 
                id="task-description" 
                placeholder="Digite para começar" 
            ></textarea>
        </div>
    `

    
    fade.innerHTML = fadeContent;
    modal.innerHTML = modalContent;
    taskTitle = document.getElementById("task-title")
    taskDescription = document.getElementById("task-description")

    taskDescription.value = element.description;
    taskTitle.value = element.title;
    modal.classList.remove("hide");
    fade.classList.remove("hide");
}

function createList(arrayTasks,containerToAdd) {

    let modalPreview = "";

    arrayTasks.forEach(element => {

        if(arrayTasks === openArray) {
            modalPreview += `<div class="modal_preview_box" draggable="true" onclick="openModal(${element.id}, '${arrayString.Open}')">
            <div class="modal_preview_text">
                <span>${element.description}</span>
            </div>
            <div class="modal_preview_footer footer_red">
                <img src="/style/assets/Vector.svg">
                <span>${element.title}</span>
            </div>
        </div>`
        };

        if(arrayTasks === ongoingArray) {
            modalPreview += `<div class="modal_preview_box" draggable="true" onclick="openModal(${element.id}, '${arrayString.Ongoing}')">
            <div class="modal_preview_text">
            <span>${element.description}</span>
            </div>
            <div class="modal_preview_footer footer_orange">
            <img src="/style/assets/Vector.svg">
            <span>${element.title}</span>
            </div>
        </div>`
        }
        if(arrayTasks === finishedArray) {
            modalPreview += `<div class="modal_preview_box"  draggable="true" onclick="openModal(${finishedArray.length-1}, '${arrayString.Finished}')">
            <div class="modal_preview_text">
            <span>${element.description}</span>
            </div>
            <div class="modal_preview_footer footer_green">
            <img src="/style/assets/Vector.svg">
            <span>${element.title}</span>
            </div>
        </div>`
        }
        
    });

    containerToAdd.innerHTML = modalPreview;
}

// open - ongoing - finished
function createNewModal(columnType) {
    if (columnType === arrayString.Open) {

        openArray.push({
            title: "", 
            description: "",
            id: openArray.length-1
        })

        openModal(openArray.length-1, arrayString.Open);

    } else {

        ongoingArray.push({
            title: "", 
            description: "",
            id: ""
        })
        
        openModal(ongoingArray.length-1, arrayString.Ongoing);
    }
    
}

function closeModal() {
    modal.classList.add("hide");
    fade.classList.add("hide");
}

function updateTask(id, columnType) {

    if (columnType === arrayString.Open) {
        if(taskTitle.value.length <= 0 && taskDescription.value.length <= 0) {
            openArray.pop()
            closeModal();
        }

        openArray[id].title = taskTitle.value;
        openArray[id].description = taskDescription.value;
        openTaskCounter.innerText = `${openArray.length}`
        createList(openArray, openTasksContainer);
    }
    
    if (columnType === arrayString.Ongoing) {
        if(taskTitle.value.length <= 0 && taskDescription.value.length <= 0) {
            ongoingArray.pop()
            closeModal();
        }

        ongoingArray[id].title = taskTitle.value;
        ongoingArray[id].description = taskDescription.value;
        ongoingTaskCounter.innerText = `${ongoingArray.length}`
        createList(ongoingArray, ongoingTasksContainer);
    }
    
    if (columnType === arrayString.Finished) {
        finishedArray[id].title = taskTitle.value;
        finishedArray[id].description = taskDescription.value;
        finishedTaskCounter.innerText = `${finishedArray.length}`
        createList(finishedArray, finishedTasksContainer);
    }

    closeModal();
}

var isImportant = false;

//function to toggle side panel
function togglePanel(){
    console.log("button clicked");

    //hide the section/element
    $("#form").toggle();
}

//function to save task
function saveTask(){
    console.log("task saved");

    const title = $("#txtTask").val();
    const descript = $("#txtDescript").val();
    const due = $("#selDue").val();
    const duration = $("#txtDuration").val();
    const status = $("#selStatus").val();
    const color = $("#txtColor").val();

    let task = new Task(title, isImportant, descript, due, duration, status, color);

    console.log(task);
    displayTask(task);
    
}

//function to display inputed tasks
function displayTask(task){
    let syntax = `
        <div class="task" style="border: 2px solid ${task.color};">
            <div class="info">
            <h5>${task.title}</h5>
            <p>${task.descript}</p>
            </div>

            <label>${task.status}</label>

            <div class="dates">
            <label>${task.due}</label>
            <label>${task.duration} days</label>
            </div>
        </div>`

    $("#pendingTasks").append(syntax);

}


//function to toggle bookmark icon
function toggleImportant(){
    const nonImpClasses = "fa-regular fa-bookmark notImp";
    const impClasses = "fa-solid fa-bookmark imp";

    if(isImportant){
        $("#iImportant").removeClass(impClasses).addClass(nonImpClasses);
        isImportant = false;
    }
    else{
        $("#iImportant").removeClass(nonImpClasses).addClass(impClasses);
        isImportant = true;
    }
}


//init function
function init(){
    console.log("This is the Task Manager site.");

    $("#btnShowPanel").click(togglePanel);
    $("#saveBtn").click(saveTask);
    $("#iImportant").click(toggleImportant);

}
window.onload = init;
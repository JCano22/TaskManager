var isImportant = false;
const serverUrl = "http://fsdiapi.azurewebsites.net/";


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
    const budget =$("#txtBudget").val();

    let task = new Task(title, isImportant, descript, due, duration, status, color, budget);

    //send obj to the server
    $.ajax({
        type:"POST",
        url: serverUrl + "api/tasks/",
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function(res){
            console.log("Save Worked", res);
            displayTask(task);
            clearForm();
        },
        error: function(error){
            console.log("Save failed", error);
            alert("Unexpected Error, task was not saved :(");
        }
    })
    
}//end saveTask function

//formatting date
function formatDate(date){
    console.log(date);
    let trueDate = new Date(date); //parse date string to date obj
    return trueDate.toLocaleDateString();
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
            <label>${formatDate(task.due)}</label>
            <label>${task.duration} days</label>
            </div>
            <div class="budget">
            <label>$${task.budget || "0.00"} dollars</label>
            </div>
        </div>`

    $("#pendingTasks").append(syntax);
}

//function to clear form after submission
function clearForm(){
    $('input').val("");
    $('select').val("");
    $('textarea').val("");
    $("#iImportant").removeClass("imp").addClass("notImp");
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

function fetchTasks(){
    //retrieve all the tasks from the server
    $.ajax({
        url: serverUrl + "api/tasks/",
        type: "GET", //casing doesn't matter, stndrd is to capitalize
        success: function(response){
            const list = JSON.parse(response);
            console.log(list);

            for(let i = 0; i < list.length; i++){
                let record = list[i];
                if(record.name === "Jorge"){
                    displayTask(record);
                }
            }
        },
        error: function(error){
            console.log("Error", error);
        }
    });
}

//init function
function init(){
    console.log("This is the Task Manager site.");

    //retrieve data
    fetchTasks();

    //hook events
    $("#btnShowPanel").click(togglePanel);
    $("#saveBtn").click(saveTask);
    $("#iImportant").click(toggleImportant);

}
window.onload = init;

function togglePanel(){
    console.log("button clicked");

    //hide the section/element
    $("#form").toggle();
}

function saveTask(){
    console.log("task saved");
}

function toggleImportant(){
    const nonImpClasses = "fa-regular fa-bookmark notImp";
    const impClasses = "fa-solid fa-bookmark imp";
    console.log("Important icon clicked.")

    $("#iImportant").removeClass(nonImpClasses);
    $("#iImportant").addClass(impClasses);
}



function init(){
    console.log("This is the Task Manager site.");

    $("#btnShowPanel").click(togglePanel);
    $("#saveBtn").click(saveTask);
    $("#iImportant").click(toggleImportant);

}
window.onload = init;
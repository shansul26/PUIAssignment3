//used for creating unique task ids
var nextTaskId = 0;

//load some default list items
function loadListItems(){
    createNewTask("Pick up uniforms");
    createNewTask("Pick up snacks");
}

//Handling the event for clicking the "Add task" button in the "Create new task" form
$("#add-task").click( function() {
    addTask();
});

//Handling the event for hitting the "enter" key in the "Create new task" form
$("#add-item-modal").submit( function() {
    //prevents the page from re-loading when submitting the form
    event.preventDefault();
    addTask();
});

//Behavior when adding a new task from the "Create new task" form
function addTask() {
    //add the task to the list
    createNewTask($("#add-task-name").val());
    
    //clear out the contents of the form
    $("#add-task-name").val("");
    $("#assigned-to").val("");
    $("#add-item-modal").modal("hide");
}

function createNewTask(taskName){
    //unique ID to use when creating the div
    var taskDivId = "task" + nextTaskId;
    
    //create the whole list div, including the checkbox, name, and edit/delete buttons
    $("#tasks").append($("<div>").attr("class", "row list-item").attr("id", taskDivId)
        .append($("<div>").attr("class", "col-xs-7 todo-item-content")
            .append($("<input>").attr("type", "checkbox").attr("class", "todo-checkbox"))
            .append($("<span>").attr("class", "task-text").text(taskName)))
       .append($("<div>").attr("class", "button-container col-xs-5")
            .append($("<div>").attr("class", "row")
                .append($("<button>").attr("class", "btn btn-danger delete-button col-xs-4 pull-right")
                    .append($("<span>").attr("class", "glyphicon glyphicon-trash")))
                .append($("<button>").attr("class", "btn btn-default edit-button col-xs-4 pull-right").attr("data-toggle", "modal").attr("data-target","#edit-item-modal")
                    .append($("<span>").attr("class", "glyphicon glyphicon-pencil"))))));
     
    //increment the unique id  
    nextTaskId++;
}

//When the user clicks the delete button for a particular task, remove that task
$(document.body).on("click", ".delete-button", function() {
    $(this).parent("div").parent("div").parent("div").remove();
});

//Handling the logic for moving the items between the "To-Do" list and the "Done" list & vice-versa
$(document.body).on("change", ".todo-checkbox", function() {
    var row = $(this).parent("div").parent("div");
    
    if($(this).is(":checked")){
        //if it's checked, move to the "Done" list
        $("#completed-tasks").append(row);   
    }
    else{
        //otherwise if it's not checked, move to the "To-do" list
        $("#tasks").append(row);
    }
});

//When the user clicks on the "Edit" button for a particular task, this method gets the name and ID of the task for the form
$(document.body).on("click", ".edit-button", function() {
    var taskName = $(this).parent("div").parent("div").parent("div").children("div").children("span").text();
    //set the text in the text box to the task name
    $("#edit-task-name").val(taskName);
    
    //save the ID of the task being edited so the form knows where to save it
    $("#edit-task-name").attr("editing", $(this).parent("div").parent("div").parent("div").attr("id"));
});

//Handle when the user clicks the "Save" button on the "Edit" form
$("#save-changes").click( function() {
    saveChanges();
});

//Handle when the user hits enter key on the "Edit" form
$("#edit-item-modal").submit( function() {
    //prevents the page from re-loading when submitting the form
    event.preventDefault();
    saveChanges();
});

//Function to call when saving changes to a list item
function saveChanges() {
    //get ID of the div to update
    var $updateId = "#" + $("#edit-task-name").attr("editing");
    
    //update the name of the task in the list
    $($updateId).children("div").children("span").text($("#edit-task-name").val())
    
    //clear out the form and hide it
    $("#edit-task-name").val("");
    $("#edit-item-modal").modal("hide");
}

//Function for showing/hiding completed items
$("#toggle-completed").click( function() {
    //changes the visibility of the div containing the completed tasks
    $("#completed-tasks").toggle();
    
    //changes the visibility of the "Completed" header
    $("#completed-task-header").toggle();
    
    //update the text of the hyperlink
    if($("#completed-tasks").is(":visible")) {
        $("#toggle-completed").text("Hide completed");
    }
    else {
        $("#toggle-completed").text("Show completed");
    }
    
});

/*
    Thank you for your time! Here's some ascii art of a hedgehog that I found on the Internet. (credit: http://www.ascii-code.com/ascii-art/)
    
          .|||||||||.    (<3)
         |||||||||||||   /  
        |||||||||||' .\ 
        `||||||||||_,__o

*/
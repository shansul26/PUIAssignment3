var nextTaskId = 0;

function loadListItems(){
    createNewTask("Pick up uniforms");
    createNewTask("Pick up snacks");
}

$("#add-task").click( function() {
    addTask();
});

$("#add-item-modal").submit( function() {
    // prevent default browser behaviour
    event.preventDefault();
    addTask();
});

function addTask() {
    createNewTask($("#add-task-name").val());
    $("#add-task-name").val("");
    $("#assigned-to").val("");
    $("#add-item-modal").modal("hide");
}

function createNewTask(taskName){
    
    var taskDivId = "task" + nextTaskId;
    
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
     
      
    nextTaskId++;
}

//getting dynamically added elements to register a click was the most difficult thing encountered
$(document.body).on("click", ".delete-button", function() {
    $(this).parent("div").parent("div").parent("div").remove();
});

$(document.body).on("change", ".todo-checkbox", function() {
    if($(this).is(":checked")){
            //move to the "done" list
            var row = $(this).parent("div").parent("div");
            $("#completed-tasks").append(row);
            
        }
        else{
            //move to the "to-do" list
            var row = $(this).parent("div").parent("div");
            $("#tasks").append(row);
        }
});

$(document.body).on("click", ".edit-button", function() {
    var taskName = $(this).parent("div").parent("div").parent("div").children("div").children("span").text();
    $("#edit-task-name").val(taskName);
    $("#edit-task-name").attr("editing", $(this).parent("div").parent("div").parent("div").attr("id"));
});

$("#save-changes").click( function() {
    saveChanges();
});

$("#edit-item-modal").submit( function() {
    // prevent default browser behaviour
    event.preventDefault();
    saveChanges();
});

function saveChanges() {
    var $updateId = "#" + $("#edit-task-name").attr("editing");
    $($updateId).children("div").children("span").text($("#edit-task-name").val())
    $("#edit-task-name").val("");
    $("#edit-item-modal").modal("hide");
}

$("#toggle-completed").click( function() {
    $("#completed-tasks").toggle();
    $("#completed-task-header").toggle();
    if($("#completed-tasks").is(":visible")) {
        $("#toggle-completed").text("Hide completed");
    }
    else {
        $("#toggle-completed").text("Show completed");
    }
    
});
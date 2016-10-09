console.log("hello world");

var nextTaskId = 0;

function loadListItems(){
    createNewTask("Pick up uniforms");
    createNewTask("Pick up snacks");
}

$("#add-task").click( function() {
    createNewTask($("#task-name").val());
    $("#task-name").val("");
    $("#assigned-to").val("");
    $("#add-item-modal").modal("hide");
});

/*
TODO: delete this
function addListItem(){
    createNewTask($("#task-name").val());
    $("#task-name").val("");
    
}*/

function createNewTask(taskName){
    
    var taskDivId = "task" + nextTaskId;
    
    $("#tasks").append($("<div>").attr("class", "row list-item").attr("id", taskDivId)
        .append($("<div>").attr("class", "col-xs-5 todo-item-content")
            .append($("<input>").attr("type", "checkbox").attr("class", "todo-checkbox"))
            .append($("<span>").attr("class", "task-text").text(taskName)))
        /*.append($("<button>").attr("class", "btn btn-default delete-button col-xs-1")
                .append($("<span>").attr("class", "glyphicon glyphicon-trash")))*/
        .append($("<button>").attr("class", "btn btn-danger delete-button col-xs-1")
                .append($("<span>").attr("class", "glyphicon glyphicon-trash"))));
     
      
    nextTaskId++;
}

//getting dynamically added elements to register a click was the most difficult thing encountered
$(document.body).on("click", ".delete-button", function() {
    $(this).parent("div").remove();
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
/*$(document).ready(function() {
    $(".delete-button").click(function(){
        $(this).parent("div").remove();
    });
    $(".todo-checkbox").change(function(){
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
});*/
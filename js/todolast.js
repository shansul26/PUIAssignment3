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
    $("#addItemModal").modal("hide");
});

/*
TODO: delete this
function addListItem(){
    createNewTask($("#task-name").val());
    $("#task-name").val("");
    
}*/

function createNewTask(taskName){
    var template = "<div class=\"row list-item\" id = {{taskDivId}}> <div class=\"col-xs-5\"><input type=\"checkbox\"> {{taskName}}</div><button class=\"btn btn-default delete-button col-xs-1\"><span class=\"glyphicon glyphicon-trash\"></span></button></div>"

    // Compile the template data into a function
    var templateScript = Handlebars.compile(template);

    var context = {"taskDivId" : "task" + nextTaskId, "taskName" : taskName, "taskId" : nextTaskId };

    var html = templateScript(context);
    
    $("#tasks").append(html);
    
    nextTaskId++;
}

//getting dynamically added elements to register a click was the most difficult thing encountered
$(document).ready(function() {
    $(".delete-button").click(function(){
        $(this).parent("div").remove();
    });
});
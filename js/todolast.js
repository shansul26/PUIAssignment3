console.log("hello world");

function addListItem(){
    $("#tasks").append("<br/><input type=\"checkbox\"> " + $("#task-name").val());
    $("#task-name").val("");
    
}
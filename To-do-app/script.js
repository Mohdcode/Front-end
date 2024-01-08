const inputbox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputbox.value ===''){
        alert("you must write something");
    }
    else{
        let li=document.createElement("li");
        li.innerHTML=inputbox.value;
        listContainer.appendChild(li);
        let span =document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
    }
    inputbox.value="";
    saveData(); //clearing the input box after input is recived;
}
listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
    
},false);

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
// inputbox.addEventListener("keypress",function (event) {
//     // Check if the pressed key is Enter (key code 13)
//     if (event.key === 'Enter') {
//         event.preventDefault();
//         // Call the addTask function when Enter is pressed
//         addTask();}
//     });
function handleKeyPress(event) {
    console.log("function invoked in keypress");
    // Check if the pressed key is Enter (key code 13)
    if (event.key === 'Enter' || event.keyCode === 13) {
        // Prevent the default behavior of the Enter key (e.g., form submission)
        event.preventDefault();
        
        // Call the addTask function when Enter is pressed
        addTask();
    }
}
function clearAll(){
// Remove all child elements of the list container
// while (listContainer.firstChild) {
//     listContainer.removeChild(listContainer.firstChild);
//   }
listContainer.innerHTML = '';

  // Optionally, you can clear any stored data, such as in localStorage
  localStorage.removeItem('data');}
showTask();
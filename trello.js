

//getting all required elements
const inputBox=document.querySelector(".inputFeild input");
const addBtn=document.querySelector(".inputFeild button");
const todoList=document.querySelector(".todoList");
const deleteAllBtn=document.querySelector(".footer button");


inputBox.onkeyup=()=>{
    let userData=inputBox.value;// getting user entered value
    if(userData.trim()!=0){ //if user values aren't only spaces
      addBtn.classList.add("active");//active the add button
    }else{
        addBtn.classList.remove("active");//unactive the add button
    }
}

showTasks();// calling showTask function 

//if user click on the  add button
addBtn.onclick=()=>{
    let userData=inputBox.value;//getting user entered value
    let getLocalStorage=localStorage.getItem("New Todo");//getting localstorage
    if(getLocalStorage == null){//if localstorage is null
     listArr=[];//creating blank array
    }else{
        listArr=JSON.parse(getLocalStorage);
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo",JSON.stringify(listArr)); //transforming js object into json string
    showTasks();// calling showTask function 
}

//finction to add task list inside ul
function showTasks(){
    let getLocalStorage=localStorage.getItem("New Todo");//getting localstorage
    if(getLocalStorage == null){//if localstorage is null
        listArr=[];//creating blank array
       }else{
           listArr=JSON.parse(getLocalStorage);
       }
    const pendingNumb=document.querySelector(".pendingNumb");
    pendingNumb.textContent=listArr.length;//passing the length value in pendingNumb
    if(listArr.length>0){  //if array length is grater than 0
        deleteAllBtn.classList.add("active");//active the clearall button
    }else{
        deleteAllBtn.classList.remove("active");//unactive the clearall button
    }

    let newLiTag='';
    listArr.forEach((element,index) => {
        newLiTag +=`<li> ${element} <span onclick="editTask(${index})" style="margin:0 47px; background:green;"><i class="fas fa-edit"></i></span><span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });  
    todoList.innerHTML=newLiTag;//adding new li tag inside ul tag 
    inputBox.value="";//once  task added leave  the input field blank
}

//delete task function
function deleteTask(index){
    let getLocalStorage=localStorage.getItem("New Todo");//getting localstorage
    listArr=JSON.parse(getLocalStorage);
    listArr.splice(index,1);//delete or remove the particular indexed li
    //after  remove the li again update the local   storage
    localStorage.setItem("New Todo",JSON.stringify(listArr)); //transforming js object into json string
    showTasks();//calling showTask function 
}

deleteAllBtn.onclick=()=>{
    listArr=[];//empty an array
    //after delete all task again update the li local storage
    localStorage.setItem("New Todo",JSON.stringify(listArr)); //transforming js object into json string
    showTasks();//calling showTask function 
}

function editTask(index){
    let addtaskBtn=document.getElementById("addtaskbtn");
    let savetaskBtn=document.getElementById("savetaskbtn");
    let saveIndex=document.getElementById("saveIndex");
    saveIndex.value=index;
    let getLocalStorage=localStorage.getItem("New Todo");//getting localstorage
    listArr=JSON.parse(getLocalStorage);
    inputBox.value=listArr[index];
    addtaskBtn.style.display="none";
    savetaskBtn.style.display="block";
    savetaskBtn.classList.add("active");
}

//saveTask
    let savetaskBtn=document.getElementById("savetaskbtn");
    savetaskBtn.addEventListener("click",function(){
        let getLocalStorage=localStorage.getItem("New Todo");//getting localstorage
        listArr=JSON.parse(getLocalStorage);
        let saveIndex=document.getElementById("saveIndex").value;
        listArr[saveIndex]=inputBox.value;
        localStorage.setItem("New Todo",JSON.stringify(listArr)); //transforming js object into json string
        showTasks(); 
    });


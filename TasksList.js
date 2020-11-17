
const from=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

//load all event listeners
loadEventListeners();
function loadEventListeners()
{
    // DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);
    //Add task event
    from.addEventListener('submit',addTask);
    //Remove task element
    taskList.addEventListener('click',removeTask);
    //Clear all tasks
    clearBtn.addEventListener('click',clearAllTasks);
    //Filter task
    filter.addEventListener('keyup',filterTask);
}

//Get tasks from LS
function getTasks()
{
    let tasks;
    if(localStorage.getItem('tasks')===null)
    {
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task)
    {
        const li= document.createElement('li');
        li.className ='collection-item';
        li.appendChild(document.createTextNode(task));
        const link= document.createElement('a');
        link.className ='delete-item secondary-content';
        link.innerHTML='<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

// Add Task
function addTask(e)
{
    if(taskInput.value === ''){
        alert('Add Task');
    }
    // create list li
    const li= document.createElement('li');
    li.className ='collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    //create a link X icon
    const link= document.createElement('a');
    link.className ='delete-item secondary-content';
    // X icon link
    link.innerHTML='<i class="fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);
    // Add li to ul
    taskList.appendChild(li);
  
    //Store to local Storage(LS)
    storeTaskInLocalStorage(taskInput.value);
    //clear task
    taskInput.value='';

    //prevent Default
    e.preventDefault();
}

//Store to local Storage
function storeTaskInLocalStorage(task)
{
    let tasks;
    if(localStorage.getItem('tasks')===null)
    {
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}

// Remove task
function removeTask(e)
{
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm("Are you sure"))
        {
            e.target.parentElement.parentElement.remove();

            //Remove form local Storage 
            removeFromLS( e.target.parentElement.parentElement);
        }
    }
}

// Remove form local Storage
function removeFromLS(taskItem)
{
    let tasks;
    if(localStorage.getItem('tasks')===null)
    {
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index)
    {
        if(taskItem.textContent === task)
        {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks 
function clearAllTasks()
{
    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear form Local Storage 
    clearTasksfromLS();
}


// clear all tasks from Local Storgae
function clearTasksfromLS()
{
    localStorage.clear();
}


//Filter task
function filterTask(e)
{
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach
    (function(task)
    {
        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1)
        {
            task.style.display ='block';
        }
        else  task.style.display ='none';
    })
}
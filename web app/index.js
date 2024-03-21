const formElement = document.getElementById('saveTask')

formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    let taskTitle = document.getElementById('title').value;
    let taskDescription = document.getElementById('description').value;
    let dateEnd = document.getElementById('dateEnd').value;
    let task = {title: taskTitle, description: taskDescription,expiryDate: dateEnd}
    let taskJson= JSON.stringify(task);
    console.log(taskJson)
    fetch('http://localhost:4000/taskmanager',{
    method : 'post', 
    headers:{'Content-type': 'application/json'},   
    body : taskJson
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    })      
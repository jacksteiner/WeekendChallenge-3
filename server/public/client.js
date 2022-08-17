$(document).ready(onReady);

function onReady () {
    $('#task-submit').on('click', sendTasksToServer);
    $('body').on('click', '.task-delete', deleteTask);
    $('body').on('click', '.task-complete', completeTask);
    getTasks();
}

function getTasks () {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response){
        console.log(response);
        $('#taskTableBody').empty();
        for (let i = 0; i < response.length; i++) {
            let tasks = response[i];
            let rowChange = "default-row";
            if (tasks.complete === true ){
                rowChange = "complete-row";
            }
            $('#taskTableBody').append(`

                <tr class="${rowChange}">
                    <td>${tasks.taskname}<td>
                    <td>${tasks.complete}<td>
                    <td>
                    <button class ="task-delete" data-id="${tasks.id}">Delete</button>
                    </td>
                    <td>
                    <button class ="task-complete" data-id="${tasks.id}">Complete</button>
                    </td>
                </tr>
            `);
        }
    }).catch(function(error){
        console.log(error)
        alert('Something went wrong in get tasks');
    })
}

function sendTasksToServer() {
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
            task: $('#task-input').val(),
        }
    }).then(function (response) {
        getTasks();
    })
}

function deleteTask() {
    const taskId = $(this).data('id');
    console.log('delete task called', taskId);
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskId}`
    }).then(function(response) {
        getTasks();
    }).catch(function(error){
        console.log(error);
        alert('Something went wrong in delete task')
    })
}

function completeTask() {
    const taskId = $(this).data('id');
    console.log('completeTask', taskId);
    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskId}`,
    }).then(function(response){
        getTasks();
    }).catch(function(error){
        console.log(error);
        alert('Something went wrong in completeTask');
    })
}
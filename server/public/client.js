$(document).ready(onReady);

function onReady () {
    $('#task-submit').on('click', sendTasksToServer);
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
            // APPEND TASK, MAKE TASK.ROUTER FIRST
            $('#taskTableBody').append(`
                <tr>
                    <td>${tasks.taskname}<td>
                    <td>${tasks.complete}<td>
                    <td>
                    <button class ="task-delete" data-id="${tasks.id}"Delete</button>
                    </td>
                    <button class ="task-complete"Complete</button>

            `);
        }
    }).catch(function(error){
        console.log(error)
        alert('Something went wrong');
    })
}

function sendTasksToServer() {
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
            tasks: $('#task-input').val(),
        }
    }).then(function (response) {
        getTasks();
    })
}

function deleteTask() {
    const taskId = $(this).data('id');
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskId}`
    }).then(function(response) {
        getTasks();
    }).catch(function(error){
        console.log(error);
        alert('Something went wrong')
    })
}
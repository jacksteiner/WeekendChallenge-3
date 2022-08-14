$(document).ready(onReady);

function onReady () {
    getTasks
}

function getTasks () {
    $.ajax({
        type: 'GET',
        url: 'tasks/'
    }).then(function(response){
        console.log(response);
        $('#taskTableBody').empty();
        for (let i = 0; i < response.length; i++) {
            let tasks = response[i];
            // APPEND TASK, MAKE TASK.ROUTER FIRST
            $('#taskTableBody').append(`
                <tr>
                    <td>
            `)
        }
    })
}


getChirps();
$('#post-btn').click(() => postChirps());


function getChirps() {
    $.ajax({
        url: '/api/chirps',
        type: 'GET'
    })
        .then(chirps => {
            $('#timeline').empty();
            chirps.forEach(chirp => {
                $('#timeline').append(`
                <article class="col-md-7">
                    <div class="card shadow border border-dark m-1 text-center">
                        <div class="card-body">
                            <h4>${chirp.name} chirped:</h4>
                            <p class="card-text">${chirp.text}</p>
                        </div>
                        <div class="card-footer">
                            <p class="text-muted">${chirp.id}</p>
                            <button onclick="editChirp(${chirp.id})" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Edit</button>
                            <button onclick="deleteChirp(${chirp.id})" class="btn btn-danger align-items center">Delete</button>
                        </div>
                    </div>
                </article>
            `);
            })

        });
}

function postChirps() {
    // event.preventDefault();
    let name = $('#name').val();
    let text = $('#text').val();
    let chirp = {
        name: name,
        text: text
    }
    $.post({
        url: '/api/chirps',
        type: 'POST',
        data: chirp
    })
    .then(() => console.log("Chirp Added!"))
    .then(() => window.location.reload())
}

function deleteChirp(id) {
    $.ajax({
        url: `/api/chirps/${id}`,
        type: 'DELETE'
    })
    .then(chirps => {
        getChirps();
    })
}

function editChirp(id) {
    let editName = $('#edit-name').val()
    let editText = $('#edit-text').val()
}

// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var gameFilter = {
    PublisherId: null,
    GenreId: null,
    PlatformId: null,
    SearchString: null
};

$(document).ready(function () {
    ReadGames();
    loadDropDowns();
});


function ReadGames() {
    $.ajax({
        url: "/Game/ReadGamesFilter",
        type: "GET",
        data: { PublisherId: gameFilter.PublisherId, PlatformId: gameFilter.PlatformId, GenreId: gameFilter.GenreId},
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var html = '';
            $.each(response, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.publisherId + '</td>';
                html += '<td>' + item.platformId + '</td>';
                html += '<td>' + item.gameName + '</td>';
                html += '<td>' + item.genreId + '</td>';
                html += '<td>' + item.price + '</td>';
                html += '<td>' + item.releaseDate + '</td>';
                html += '<td><a class="record-action" href="#" onclick="prepareEditGame(' + (item.gameId) + ')">Edit</a> | <a class="record-action record-action__delete" href="#" onClick="DeleteGame(' + (item.gameId || '') + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    });
}

function prepareEditGame(gameId) {
    $.ajax({
        url: "/Game/ReadGameById/" + gameId,
        type: "GET",
        data: { gameId: gameId },
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $('#game-id').val(response.gameId);
            $('#game-name').val(response.gameName);
            $('#game-description').val(response.gameDescription);
            $('#game-release-date').val(response.releaseDate);
            $('#game-price').val(response.price);
            $('#game-genre').val(response.genreId);
            $('#game-publisher').val(response.publisherId);
            $('#game-platform').val(response.platformId);

            $('#myModal').modal('show');
            $('#update-button').show();
            $('#create-button').hide();
        },
        error: function (errormessage) {
            console.log(errormessage);
        }
    });
}

function prepareCreateGame() {
    $('#create-button').show();
    $('#update-button').hide();
}

function loadDropDowns() {
    var genreElement = document.getElementById('game-genre');
    var genreFilter = document.getElementById('filter-genre');
    var platformElement = document.getElementById('game-platform');
    var platformFilter = document.getElementById('filter-platform');
    var publisherElement = document.getElementById('game-publisher');
    var publisherFilter = document.getElementById('filter-publisher');

    var nullElement = document.createElement("option");
    nullElement.innerHTML = "All";
    nullElement.setAttribute("value", null);
    genreFilter.appendChild(nullElement);

    nullElement = document.createElement("option");
    nullElement.innerHTML = "All";
    nullElement.setAttribute("value", null);
    platformFilter.appendChild(nullElement);

    nullElement = document.createElement("option");
    nullElement.innerHTML = "All";
    nullElement.setAttribute("value", null);
    publisherFilter.appendChild(nullElement);

    $.ajax({
        url: "/Game/GetAllGenres",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            response.forEach(g => {
                var element = document.createElement("option");
                element.innerHTML = g.genreName;
                element.setAttribute("value", g.genreId);
                genreElement.appendChild(element);

                element = document.createElement("option");
                element.innerHTML = g.genreName;
                element.setAttribute("value", g.genreId);
                genreFilter.appendChild(element);
            })
        },
        error: function (errormessage) {
        }
    });
    
    $.ajax({
        url: "/Game/GetAllPlatforms",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            response.forEach(p => {
                var element = document.createElement("option");
                element.innerHTML = p.platformName;
                element.setAttribute("value", p.platformId);
                platformElement.appendChild(element);

                element = document.createElement("option");
                element.innerHTML = p.platformName;
                element.setAttribute("value", p.platformId);
                platformFilter.appendChild(element);
            })
        },
        error: function (errormessage) {
        }
    });
    
    $.ajax({
        url: "/Game/GetAllPublishers",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            response.forEach(p => {
                var element = document.createElement("option");
                element.innerHTML = p.publisherName;
                element.setAttribute("value", p.publisherId);
                publisherElement.appendChild(element);

                element = document.createElement("option");
                element.innerHTML = p.publisherName;
                element.setAttribute("value", p.publisherId);
                publisherFilter.appendChild(element);
            })
        },
        error: function (errormessage) {
        }
    });


    genreFilter.addEventListener('change', e => {
        gameFilter.GenreId = e.target.value;
        ReadGames();
    })
    platformFilter.addEventListener('change', e => {
        gameFilter.PlatformId = e.target.value;
        ReadGames();
    })
    publisherFilter.addEventListener('change', e => {
        gameFilter.PublisherId = e.target.value;
        ReadGames();
    })
}

function CreateGame() {
    var gameObj = {
        gameName: $('#game-name').val(),
        gameDescription: $('#game-description').val(),
        releaseDate: $('#game-release-date').val(),
        price: $('#game-price').val(),
        genreId: parseInt($('#game-genre').val()),
        publisherId: $('#game-publisher').val(),
        platformId: $('#game-platform').val()
    }

    $.ajax({
        url: "/Game/AddGame",
        type: "POST",
        data: JSON.stringify(gameObj),
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            if (response.success == true) {

                //console.log(response);

                $('#error-message').text('Game added successfully');

                $('#myModal').modal('hide')
                $('.modal-backdrop').remove();
                $('#update-button').hide();
                $('#create-button').show();

                ReadGames();

            }
            else {
                //console.log(response)
                $('#error-message').text(response.message);
            }
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    })
}


function UpdateGame() {
    var gameObj = {
        GameId: $('#game-id').val(),
        GameName: $('#game-name').val(),
        GameDescription: $('#game-description').val(),
        ReleaseDate: $('#game-release-date').val(),
        Price: $('#game-price').val(),
        GenreId: $('#game-genre').val(),
        PublisherId: $('#game-publisher').val(),
        PlatformId: $('#game-platform').val()
    }

    console.log(`gameObj: ${gameObj}`);

    $.ajax({
        url: "/Game/UpdateGame",
        type: "POST",
        data: JSON.stringify(gameObj),
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            console.log(response);

            ReadGames();

            $('#myModal').modal('hide');
            $('.modal-backdrop').remove();
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    })
}

function DeleteGame(gameId) {
    console.log(`gameId: ${gameId}`)

    var ans = confirm('Are you sure you want to delete this game?');
    if (ans) {
        $.ajax({
            url: "/Game/DeleteGame/" + gameId,
            data: { gameId: gameId },
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                console.log(response);
                ReadGames();
            },
            error: function (errormessage) {
                if (errormessage.status == 401)
                    console.log('You are not authorized!');
            }
        });
    }
}


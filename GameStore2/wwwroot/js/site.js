// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {
    ReadGames();
});


function ReadGames() {
    $.ajax({
        url: "/Game/ReadGames",
        type: "GET",
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
                html += '<td><a class="record-action" href="#" onclick="ReadGameById(' + (item.gameId || '') + ')">Edit</a> | <a class="record-action record-action__delete" href="#" onClick="DeleteGame(' + (item.gameId || '') + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    });
}

function ReadGameById(gameId) {
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
        }
    });
}

function CreateGame() {
    var gameObj = {
        gameName: $('#game-name').val(),
        gameDescription: $('#game-description').val(),
        releaseDate: $('#game-release-date').val(),
        price: $('#game-price').val(),
        genreId: $('#game-genre').val(),
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

                console.log(response);

                $('#error-message').text('Game added successfully');

                $('#myModal').modal('hide')
                $('.modal-backdrop').remove();
                $('#update-button').hide();
                $('#create-button').show();

                ReadGames();

            }
            else {
                console.log(response.success)
                $('#error-message').text('Please verify your input');
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


// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {
    PublishGames();
});


function PublishGames() {
    $.ajax({
        url: "/Publisher/PublishGames",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var html = '';
            $.each(response, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.publisherId + '</td>';
                html += '<td>' + item.publisherName + '</td>';
                html += '<td>' + item.publisherEmail + '</td>';
                html += '<td>' + item.publisherDescription + '</td>';
                html += '<td><a class="record-action" href="#" onclick="prepareEditGame(' + (item.publisherId) + ')">Edit</a> | <a class="record-action record-action__delete" href="#" onClick="DeleteGame(' + (item.gameId || '') + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    });
}

function prepareEditGame(publisherId) {
    $.ajax({
        url: "/Game/ReadGameById/" + publisherId,
        type: "GET",
        data: { gameId: gameId },
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $('#publisher-id').val(response.publisherId);
            $('#publisher-publisherName').val(response.publisherName);
            $('#publisher-publisherEmail').val(response.publisherEmail);
            $('#publisher-publisherDescription').val(response.publisherDescription);

            $('#myModal').modal('show');
            $('#update-button').show();
            $('#create-button').hide();
        },
        error: function (errormessage) {
            console.log(errormessage);
        }
    });
}

function prepareCreatePublisher() {
    $('#create-button').show();
    $('#update-button').hide();
}

function CreatePublishers() {
    var gameObj = {
        publisherName: $('#publisher-name').val(),
        publisherDescription: $('#publisher-description').val(),
        publisherEmail: $('#game-release-date').val(),
    }

    $.ajax({
        url: "/Publisher/AddPublisher",
        type: "POST",
        data: JSON.stringify(gameObj),
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            if (response.success == true) {

                //console.log(response);

                $('#error-message').text('Publisher added successfully');

                $('#myModal').modal('hide')
                $('.modal-backdrop').remove();
                $('#update-button').hide();
                $('#create-button').show();

                PublishGames();

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


function UpdatePublisher() {
    var gameObj = {
        PublisherId: $('#publisher-id').val(),
        PublisherName: $('#publisher-name').val(),
        publisherDescription: $('#publisher-description').val(),
        publisherEmail: $('#publisher-email').val(),
    }

    console.log(`publisherFormDataObject: ${publisherFormDataObject}`);

    $.ajax({
        url: "/Publisher/UpdatePublisher",
        type: "POST",
        data: JSON.stringify(publisherFormDataObject),
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

function DeletePublisher(publisherId) {
    console.log(`gameId: ${publisherId}`)

    var ans = confirm('Are you sure you want to delete this publisher?');
    if (ans) {
        $.ajax({
            url: "/Publisher/DeletePublisher/" + gameId,
            data: { publisherId: publisherId },
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


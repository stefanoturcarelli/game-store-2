// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

import { read } from "@popperjs/core";

// Write your JavaScript code.

$(document).ready(function () {
    ReadPublisher();
});


function ReadPublisher() {
    $.ajax({
        url: "/Publisher/ReadPublisher",
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
                html += '<td><a class="record-action" href="#" onclick="prepareEditPublisher(' + (item.publisherId) + ')">Edit</a> | <a class="record-action record-action__delete" href="#" onClick="DeletePublisher(' + (item.publisherId || '') + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    });
}

function prepareEditPublisher(publisherId) {
    $.ajax({
        url: "/Publisher/PublishById/" + publisherId,
        type: "GET",
        data: { publisherId: publisherId },
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
    var publisherFormDataObject = {
        publisherName: $('#publisher-name').val(),
        publisherDescription: $('#publisher-description').val(),
        publisherEmail: $('#publisher-email').val(),
    }

    $.ajax({
        url: "/Publisher/CreatePublishers",
        type: "POST",
        data: JSON.stringify(publisherFormDataObject),
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

                ReadPublisher();

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


function UpdatePublishers() {
    var publisherFormDataObject = {
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

            ReadPublisher();

            $('#myModal').modal('hide');
            $('.modal-backdrop').remove();
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    })
}

function DeletePublisher(publisherId) {
    console.log(`publisherId: ${publisherId}`)

    var ans = confirm('Are you sure you want to delete this publisher?');
    if (ans) {
        $.ajax({
            url: "/Publisher/DeletePublisher/" + publisherId,
            data: { publisherId: publisherId },
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                console.log(response);
                ReadPublisher();
            },
            error: function (errormessage) {
                if (errormessage.status == 401)
                    console.log('You are not authorized!');
            }
        });
    }
}


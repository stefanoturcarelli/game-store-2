// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function ReadGames() {
    $.ajax({
        url: "/Game/ReadProductsController",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var html = '';
            $.each(response, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.ProductName + '</td>';
                html += '<td>' + item.ProductDescription + '</td>';
                html += '<td>' + item.ProductPrice + '</td>';
                html += '<td>' + item.ProductQuantity + '</td>';
                html += '<td>' + item.ProductCategory + '</td>';
                html += '<td>' + item.ProductSupplier + '</td>';
                html += '<td><a class="record-action" href="#" onclick="ReadProductById(' + (item.ProductId || '') + ')">Edit</a> | <a class="record-action record-action__delete" href="#" onClick="DeleteProduct(' + (item.ProductId || '') + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    });
}

$(document).ready(function () {
    ReadList();
});

// Function to clear the wishlist
function clearList() {
    // Get the wishlist container
    var wishlistContainer = document.querySelector('.wishlsitBox');

    // Remove all child elements inside the wishlist container
    wishlistContainer.innerHTML = '';

    // Close the modal
    closeModal();

    return true;
}

// Function to open modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// Function to close modal
function closeModal() {
    document.querySelectorAll(".modal").forEach(function (modal) {
        modal.style.display = "none";
    });
}

// Function to open add list modal
function openAddListModal() {
    document.getElementById("addListModal").style.display = "block";
}

// Function to add list
function addList() {
    var listTitleInput = document.getElementById("listTitle");
    var listDescriptionInput = document.getElementById("listDescription");
    var listTitle = listTitleInput.value.trim();
    var listDescription = listDescriptionInput.value.trim();

    //calling back-end function
    AddListInfo()

    // Remove any existing error messages
    removeErrorMessage(listTitleInput);
    removeErrorMessage(listDescriptionInput);

    // Check if both inputs are empty
    if (listTitle === '' && listDescription === '') {
        displayErrorMessage(listTitleInput, 'Please enter a list title.');
        displayErrorMessage(listDescriptionInput, 'Please enter a list description.');
        return;
    }

    // Check if the list title is empty
    if (listTitle === '') {
        displayErrorMessage(listTitleInput, 'Please enter a list title.');
        return;
    }

    // Check if the list description is empty
    if (listDescription === '') {
        displayErrorMessage(listDescriptionInput, 'Please enter a list description.');
        return;
    }

    // Create a new game box div
    var newGameBox = document.createElement('div');
    newGameBox.classList.add('gameBoxWL');

    // Create and set the title element
    var titleElement = document.createElement('p');
    titleElement.classList.add('gameNameWL');
    titleElement.textContent = listTitle;
    newGameBox.appendChild(titleElement);

    // Create and set the description element
    var descriptionElement = document.createElement('p');
    descriptionElement.classList.add('descriptionWL');
    descriptionElement.textContent = listDescription;
    newGameBox.appendChild(descriptionElement);

    // Append the new game box to the wishlist container
    var wishlistContainer = document.querySelector('.wishlsitBox');
    wishlistContainer.appendChild(newGameBox);

    // Close the modal
    closeModal();
}

// Function to display error message
function displayErrorMessage(inputElement, message) {
    var errorMessage = document.createElement('span');
    errorMessage.classList.add('error-message');
    errorMessage.style.color = 'red';
    errorMessage.textContent = message;
    inputElement.parentNode.insertBefore(errorMessage, inputElement.nextSibling);
}

// Function to remove error message
function removeErrorMessage(inputElement) {
    var errorMessage = inputElement.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.parentNode.removeChild(errorMessage);
    }
}

// Add event listeners
document.querySelector(".clearList").addEventListener("click", openModal);
document.querySelector(".addGame").addEventListener("click", openAddListModal);

/*---------------------------------------------*/

function AddListInfo() {

    console.log('Adding event...');

    var listFormDataObject = {
        wishlistName: $('#listTitle').val(),
        wishlistDescription: $('#listDescription').val()
    };
    console.log(`listTitle${listFormDataObject.wishlistName}`);
    console.log(`listDescription${listFormDataObject.wishlistDescription}`);

    $.ajax({
        url: '/Wishlist/RegisterListController',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(listFormDataObject),
        success: function (response) {
            if (response === 'success') {
                console.log('list added Successfully!');
            } else {
                console.log('Adding a list Failed!');
            }
        }
    });
}

function DeleteList(wishlistId) {
    console.log(`wishlistId: ${wishlistId}`);
    console.log('Deleting...');

    if (clearList() == true) {
        $.ajax({
            url: "/Wishlist/DeleteList/" + wishlistId,
            data: { wishlistId: wishlistId },
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                console.log(response);
                ReadList();
            },
            error: function (errormessage) {
                if (errormessage.status == 401)
                    console.log('You are not authorized!');
            }
        });
    }
}


/*--------------------------*/
function ReadList() {

    console.log('Reading...');

    $.ajax({
        url: "/Wishlist/GetAllListsService",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var html = '';
            $.each(response, function (key, item) {
                html += '<div class="gameBoxWL">';
                html += '<p class="gameNameWL">' + item.wishlistName + '</p>';
                html += '<p class="descriptionWL">' + item.wishlistDescription + '</p>';
                html += '</div>';
            });
            $('.wishlsitBox').html(html);

            console.log('Worked');
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    });
}
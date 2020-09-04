function fetchData(url, callback) {
    $.ajax({
        type: 'get',
        url: url,
        success: (data) => {
            callback(data);
        },
        error: (response, error) => {
            console.log(error);
        }
    });
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function sendData(url, data, callback) {
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        success: (data) => {
            callback(data);
        },
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        },
        error: (response, error) => {
            console.log(error);
        }
    });
}

function slugify(text) {
    return text
        .toString()                     // Cast to string
        .toLowerCase()                  // Convert the string to lowercase letters
        .normalize('NFD')       // The normalize() method returns the Unicode Normalization Form of a given string.
        .trim()                         // Remove whitespace from both sides of a string
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}
$(document).ready(function() {
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser.');
        return;
    }


    $("#file").change(function() {
        var input = this;
        if (!input.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
        } else if (!input.files[0]) {
            alert("Please select a file before clicking 'Load'");
        } else {
            var file = input.files[0];
            console.log(file);
            var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpldmVlbjIwMTJzaHJlc3RoYUBnbWFpbC5jb20iLCJpYXQiOjE0OTkxNzAwMTYsImV4cCI6MTQ5OTc3NDgxNn0.RiBfp6rcdb6qcBEPUwVzvYQ8u8EoA75aiWtEUlqw434";
            $.getJSON('https://api-nepgo.herokuapp.com/sign-s3?token=' + token + '&file-type=' + file.type).then(function(data) {
                if (data) console.log(data);
                var xhr = new XMLHttpRequest();

                xhr.open("PUT", data.signedRequest);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            var img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
                            img.attr('src', data.url);
                            img.appendTo('.images');
                        } else {
                            console.log('xhr', xhr);
                            alert('Could not upload file.');
                        }
                    } else console.log("error state", xhr.readyState)
                };
                xhr.send(file);
            }, function(err) {
                if (err) throw err;
            });

        }
    });
});
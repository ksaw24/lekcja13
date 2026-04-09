$(document).ready(function () {

    // metoda sprawdzająca dostępność loginu (AJAX symulowany)
    $.validator.addMethod("usernameAvailable", function (value, element) {
        let isValid = false;

        $.ajax({
            url: "users.json",
            type: "GET",
            dataType: "json",
            async: false,
            success: function (data) {
                if (!data.includes(value)) {
                    isValid = true;
                }
            }
        });

        return isValid;
    }, "Ta nazwa użytkownika już istnieje.");

    $("#registerForm").validate({

        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            username: {
                required: true,
                minlength: 3,
                usernameAvailable: true
            },
            age: {
                required: true,
                digits: true,
                min: 18
            },
            password: {
                required: true,
                minlength: 6
            },
            confirmPassword: {
                required: true,
                equalTo: "#password"
            }
        },

        messages: {
            name: {
                required: "Podaj imię.",
                minlength: "Imię musi mieć co najmniej 2 znaki."
            },
            email: {
                required: "Podaj email.",
                email: "Podaj poprawny adres email."
            },
            username: {
                required: "Podaj nazwę użytkownika.",
                minlength: "Minimum 3 znaki.",
                usernameAvailable: "Nazwa użytkownika jest zajęta."
            },
            age: {
                required: "Podaj wiek.",
                digits: "Wiek musi być liczbą.",
                min: "Musisz mieć co najmniej 18 lat."
            },
            password: {
                required: "Podaj hasło.",
                minlength: "Hasło musi mieć minimum 6 znaków."
            },
            confirmPassword: {
                required: "Powtórz hasło.",
                equalTo: "Hasła muszą być identyczne."
            }
        },

        submitHandler: function (form) {
            alert("Formularz poprawny!");
            form.submit();
        }

    });

});
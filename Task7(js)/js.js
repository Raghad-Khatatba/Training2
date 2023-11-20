document.getElementById("form1").onsubmit=function() {
    var fName = document.getElementById("fname").value;
    var lName = document.getElementById("lName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    event.preventDefault();

    clearErrors();
    var isValid = true;

    var namePattern = /^[A-Z][a-zA-Z]{1,7}$/;
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordPattern = /^(?=.*.{8,16})(?=.*[a-z])(?=.*[A-Z])(?=.*_)(?=.*[0-9]).*$/;

    if (!namePattern.test(fName)) {
        displayError("fNameError", "First Name is required and should start with a capital letter and be between 2 to 8 characters.");
        isValid = false;
    }
    if (!namePattern.test(lName)) {
        displayError("lNameError", "Last Name is required and should start with a capital letter and be between 2 to 8 characters.");
        isValid = false;
    }
    if (!emailPattern.test(email)) {
        displayError("emailError", "Invalid email address.");
        isValid = false;
    }
    if (phone.trim() === "") {
        displayError("phoneError", "Mobile is required.");
        isValid = false;
    }
    if (!passwordPattern.test(password)) {
        displayError("passwordError", "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
        isValid = false;
    }
    if (password !== confirmPassword) {
        displayError("confirmPasswordError", "Passwords do not match.");
        isValid = false;
    }
    if (isValid) {
      /*  localStorage.setItem("firstName", fName);
        localStorage.setItem("lastName", lName);
        window.location.href = "target.html";*/
        var url = "target.html?fname=" + encodeURIComponent(fName) + "&lname=" + encodeURIComponent(lName);
       // window.location.href = url;
       alert("Data validated , Click OK to navigate to the User Information page.");
       window.location.href = url;
    }
    else{
        return isValid;
    }
}

function clearErrors() {
    var errorElements = document.querySelectorAll(".error");
    errorElements.forEach(function (element) {
        element.textContent = "";
    });
}

function displayError(elementId, errorMessage) {
    var errorElement = document.getElementById(elementId);
    errorElement.textContent = errorMessage;
}
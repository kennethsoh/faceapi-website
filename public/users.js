function login() {
    var user = document.getElementById("usernameLogin").value;
    var user = user.toLowerCase();
    pass = document.getElementById("passwordLogin").value;
    console.log(user);
    console.log(pass);

    if (user == "" || pass == "") {
        alert("Fill in all form input fields")
    } else {

    var loginCredentials= {username: user, password: pass};

    fetch("/login_user", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginCredentials)
    })
    .then((response) => response.json())
    .then(data => {
        password = data[0].password;
        user_id = data[0].userid;

        console.log(password);
        if (pass == password) {
            console.log("success");

            // create session for user
            sessionStorage.setItem('username', user);
            sessionStorage.setItem('user_id', user_id);
            
            // redirect to user.html after successful login
            window.location = "user.html";
        } else if (pass != password) {
            console.log("failure");
            alert("User Log In Failure");
        } else {
            console.log("no user");
            alert("User non-existent");
        }  
    });
}
}


function show_username() {
    var check = sessionStorage.getItem("user_id");
    
    // Check if user is logged in
    if (check == null){
    // If user is not logged in, redirect to login.html
        window.location = "/login.html";
    } else {
    // If user is logged in, get username to display on page
    var username = sessionStorage.getItem("username");
    var userfield = document.getElementById("username");
    userfield.innerHTML = 'Welcome ' + username;
    }
}

/* Check if a user is in an existing session
This function is used on login.html and register.html. 
If a user is already in session, he will be redirected to user.html to prevent double login. */
function checkInSession() {
    var check = sessionStorage.getItem("user_id");
    if (check != null){
        window.location = "/user.html";
    }
}

function logout() {
    //clear sessionStorage.
    // sessionStorage is also cleared and user logged out when tab is closed.
    sessionStorage.clear();
    window.location = "login.html";
}

function deleteuser(){
    var userid = sessionStorage.getItem("user_id");
    var username = sessionStorage.getItem("username");
    fetch("/deleteuser/", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userid: userid,
            username: username
        })
    })
    sessionStorage.clear();
    window.location = "/login.html";
    
}

function home(){
    window.location="/";
}

function setuserid(){
    var userid = sessionStorage.getItem("user_id");
    var userid = userid.toString();
    console.log(userid);
    var useridfield = document.getElementById("useridfield");
    useridfield.value =  userid;
}

function goUpdateUser(){
    window.location="/updateuser.html";
}



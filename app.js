const BASE_URL = "http://127.0.0.1:5000";

/* REGISTER */
function register() {
    fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value,
            role: role.value
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        window.location.href = "index.html";
    });
}

/* USER LOGIN */
function login() {
    fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.role === "student") {
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid user login");
        }
    });
}

/* ADMIN LOGIN */
function adminLogin() {
    fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.role === "admin") {
            window.location.href = "admin-dashboard.html";
        } else {
            alert("Admin access only");
        }
    });
}

/* CREATE EVENT */
function createEvent() {
    fetch(`${BASE_URL}/events`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: title.value,
            description: description.value,
            date: date.value,
            venue: venue.value
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadEvents();
    });
}

/* LOAD EVENTS */
function loadEvents() {
    fetch(`${BASE_URL}/events`)
    .then(res => res.json())
    .then(events => {
        let list = document.getElementById("eventList");
        if (!list) return;
        list.innerHTML = "";
        events.forEach(e => {
            let li = document.createElement("li");
            li.innerText = `${e.title} | ${e.date} | ${e.venue}`;
            list.appendChild(li);
        });
    });
}

/* LOAD USERS (ADMIN) */
function loadUsers() {
    fetch(`${BASE_URL}/users`)
    .then(res => res.json())
    .then(users => {
        let list = document.getElementById("userList");
        list.innerHTML = "";
        users.forEach(u => {
            let li = document.createElement("li");
            li.innerText = `${u.name} - ${u.email} (${u.role})`;
            list.appendChild(li);
        });
    });
}

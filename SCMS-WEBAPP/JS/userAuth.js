const inpEmail = document.getElementById('inpEmail');
const inpPassword = document.getElementById('inpPassword');
const inpAgent = document.getElementById('inpAgent');
const inpManager = document.getElementById('inpManager');
const btnLogin = document.getElementById('btnLogin');
const role = document.getElementById('role');
var userrole = "";

const loginEP = "http://localhost:8080/auth/login";

inpAgent.addEventListener('click',(e) => {
    e.preventDefault();
    userrole = "agent";
    role.innerHTML = "Select a role: Agent";
})
inpManager.addEventListener('click',(e) => {
    e.preventDefault();
    userrole = "manager";
    role.innerHTML = "Select a role: Manager";
})
btnLogin.addEventListener('click' , (e) => {
    e.preventDefault();
    const email = inpEmail.value;
    const password = inpPassword.value;

    if(email != null && password != null && userrole != null)
    {
        console.log(userrole);
        try {
            console.log("ok");
            const xhr = new XMLHttpRequest();
            xhr.open("POST", loginEP);
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            const body = JSON.stringify({
                email: email,
                password: password,
                userrole: userrole,
            });
            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(JSON.parse(xhr.responseText));
                    const user = JSON.parse(xhr.responseText);
                    sessionStorage.setItem("userid",user._id);
                    sessionStorage.setItem("userrole",user.userrole);
                    window.location.href = '../PAGES/userDashboard.html';
                } else {
                    console.log(`Error: ${xhr.status}`);
                }
            };
            xhr.send(body);
        } catch (error) {
            console.log(error);
        }
    } 
})
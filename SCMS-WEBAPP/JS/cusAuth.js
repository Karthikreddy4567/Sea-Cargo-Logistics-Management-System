const inpLEmail = document.getElementById('inpLEmail');
const inpLPassword = document.getElementById('inpLPassword');
const btnLogin = document.getElementById('btnLogin');

const inpEmail = document.getElementById('inpEmail');
const inpFullname = document.getElementById('inpFullname');
const inpPassword = document.getElementById('inpPassword');
const btnRegister = document.getElementById('btnRegister');
const inpTrackingNo = document.getElementById('inpTrackingNo');
const btnGetStatus = document.getElementById('btnGetStatus');

btnGetStatus.addEventListener('click',(e) => {
    e.preventDefault();
    const order_no = inpTrackingNo.value;
    window.location.href = `../PAGES/tracking.html?order_no=${order_no}`;
})

const loginEP = "http://localhost:8080/auth/login";
const registerEP = "http://localhost:8080/auth/register";

btnLogin.addEventListener('click' , (e) => {
    e.preventDefault();
    const email = inpLEmail.value;
    const password = inpLPassword.value;

    if(email != null && password != null)
    {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", loginEP);
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            const body = JSON.stringify({
                email: email,
                password: password,
                userrole: "customer",
            });
            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(JSON.parse(xhr.responseText));
                    const user = JSON.parse(xhr.responseText);
                    sessionStorage.setItem("userid",user._id);
                    sessionStorage.setItem("userrole",user.userrole);
                    window.location.href = '../PAGES/customerdashboard.html';
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

btnRegister.addEventListener('click',(e) => {
    e.preventDefault();
    const email = inpEmail.value;
    const fullname = inpFullname.value;
    const password = inpPassword.value;

    if(email != null && password != null && fullname != null)
    {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", registerEP);
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            const body = JSON.stringify({
                username: fullname,
                email: email,
                password: password,
                userrole: "customer",
            });
            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(JSON.parse(xhr.responseText));
                    const user = JSON.parse(xhr.responseText);
                    sessionStorage.setItem("userid",user._id);
                    sessionStorage.setItem("userrole",user.userrole);
                    window.location.href = '../PAGES/customerdashboard.html';
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
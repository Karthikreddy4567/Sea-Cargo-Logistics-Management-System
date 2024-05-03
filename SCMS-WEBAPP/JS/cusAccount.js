const userid = sessionStorage.getItem("userid");
const userrole = sessionStorage.getItem("userrole");
console.log(userid,userrole);

const uname = document.getElementById('cdFullName');
const al1 = document.getElementById('cdAL1');
const city = document.getElementById('cdCity');
const al2 = document.getElementById('cdAL2');
const phone = document.getElementById('cdPhone');

const userUpdateEP = "http://localhost:8080/customer/update";
const getAccountEP = "http://localhost:8080/customer/get/";
const newAccountEP = "http://localhost:8080/customer/new/";


const btnUserLogout = document.getElementById('btnUserLogout');
const btnUserdashboard = document.getElementById('btnUserdashboard');
const btnUpdate = document.getElementById('btncdUpdate');

updateAccountDetails(userid);

btnUserLogout.addEventListener('click', (e) => {
    e.preventDefault();

    window.location.href = '../PAGES/customerhome.html';
    sessionStorage.clear();

})

btnUserdashboard.addEventListener('click', (e) => {
    e.preventDefault();

    window.location.href = '../PAGES/customerdashboard.html';
    

})


btnUpdate.addEventListener('click',(e) => {
    try {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", userUpdateEP);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        const body = JSON.stringify({
            "userid": userid,
            "name": uname.value,
            "addressline1": al1.value,
            "city": city.value,
            "addressline2": al2.value,
            "phone": phone.value,
        });
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(JSON.parse(xhr.responseText));
                if(JSON.parse(xhr.responseText) == null)
                {
                    addNewCustomer(body);
                    
                }
                
            } else {
                console.log(`Error: ${xhr.status}`);
            }
        };
        xhr.send(body);
    } catch (error) {
        console.log(error);
    }
})
function addNewCustomer(body){
    try {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", newAccountEP);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(JSON.parse(xhr.responseText));
                if(JSON.parse(xhr.responseText) != null)
                {
                    updateAccountDetails(userid);
                }
                
            } else {
                console.log(`Error: ${xhr.status}`);
            }
        };
        xhr.send(body);
    } catch (error) {
        console.log(error);
    }
}
function updateAccountDetails(userid) {
    
    try {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", getAccountEP);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        const body = JSON.stringify({
            userid
        });
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(JSON.parse(xhr.responseText));
                const userAccount = JSON.parse(xhr.responseText);
                if(userAccount != null)
                {
                uname.value = userAccount.name;
                al1.value = userAccount.addressline1;
                city.value = userAccount.city;
                al2.value = userAccount.addressline2;
                phone.value = userAccount.phone;
                }
                
            } else {
                console.log(`Error: ${xhr.status}`);
            }
        };
        xhr.send(body);
    } catch (error) {
        console.log(error);
    }
}
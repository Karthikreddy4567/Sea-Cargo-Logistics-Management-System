

const userid = sessionStorage.getItem("userid");
const userrole = sessionStorage.getItem("userrole");
console.log(userid,userrole);

const getAccountEP = "http://localhost:8080/customer/get/";
const createOrderEP = "http://localhost:8080/order/new/";
const getMyOrdersEP = "http://localhost:8080/order/getOrders/";
const getOrderEP = "http://localhost:8080/order/getOrdersByOrderNO";

const viewOrders = document.getElementById('ordersView');
const btnLoadOrders = document.getElementById('btnLoadOrders');


const viewOrder = document.getElementById('viewOrder');
const viewNewOrder = document.getElementById('viewNewOrder');






const doOrderNo = document.getElementById('doOrderNo');
const doOrderDate = document.getElementById('doOrderDate');
const doShipperName = document.getElementById('doShipperName');
const doShipperAL1 = document.getElementById('doShipperAL1');
const doShipperCity = document.getElementById('doShipperCity');
const doShipperAL2 = document.getElementById('doShipperAL2');
const doShipperPhone = document.getElementById('doShipperPhone');
const doConsigneeName = document.getElementById('doConsigneeName');
const doConsigneeAL1 = document.getElementById('doConsigneeAL1');
const doConsigneeCity = document.getElementById('doConsigneeCity');
const doConsigneeAL2 = document.getElementById('doConsigneeAL2');
const doConsigneePhone = document.getElementById('doConsigneePhone');
const doBoxCount = document.getElementById('doBoxCount');
const doContDesc = document.getElementById('doContDesc');
const doEstimatePrice = document.getElementById('doEstimatePrice');
const doPaymentMethod = document.getElementById('doPaymentMethod');
const doStatus = document.getElementById('doStatus');

const dooOrderNo = document.getElementById('dooOrderNo');
const dooOrderDate = document.getElementById('dooOrderDate');
const dooShipperName = document.getElementById('dooShipperName');
const dooShipperAL1 = document.getElementById('dooShipperAL1');
const dooShipperCity = document.getElementById('dooShipperCity');
const dooShipperAL2 = document.getElementById('dooShipperAL2');
const dooShipperPhone = document.getElementById('dooShipperPhone');
const dooConsigneeName = document.getElementById('dooConsigneeName');
const dooConsigneeAL1 = document.getElementById('dooConsigneeAL1');
const dooConsigneeCity = document.getElementById('dooConsigneeCity');
const dooConsigneeAL2 = document.getElementById('dooConsigneeAL2');
const dooConsigneePhone = document.getElementById('dooConsigneePhone');
const dooBoxCount = document.getElementById('dooBoxCount');
const dooContDesc = document.getElementById('doContDesc');
const dooEstimatePrice = document.getElementById('dooEstimatePrice');
const dooPaymentMethod = document.getElementById('dooPaymentMethod');
const dooStatus = document.getElementById('dooStatus');

const btnOCreate = document.getElementById('btnOCreate');

const btnUserLogout = document.getElementById('btnUserLogout');
const btnUserAccount = document.getElementById('btnUserAccount');
const btnNewOrder = document.getElementById('btnNewOrder');

loadOrders(userid);
function loadOrders(userid){
    let innerTable = ``;
    try {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", getMyOrdersEP);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const orders = JSON.parse(xhr.responseText);
                console.log(JSON.parse(xhr.responseText));
                const order = orders.filter(order => order.shipper_id == userid);
                console.log(order);
                order.forEach(function(obj) {
                    innerTable += `
                    <tr class="py-2">
                    <td>${obj.order_no}</th>
                    <td>${obj.consignee.fullname}</th>
                    <td>${obj.order_date}</th>
                    <td>${obj.status}</th>
                    <td><button class="cusOrder rounded-lg px-4 py-1 bg-btn text-base font-medium hover:bg-main hover:text-white text-white" value="${obj.order_no}">View</button></th>
                    </tr>
                    `
                    
                })
                console.log(innerTable);
                viewOrders.innerHTML = innerTable;
                document.querySelectorAll('.cusOrder').forEach(function(order){
                    order.addEventListener('click',(e) => {
                        loadOrder(order.value);
                    })
                })
            } else {
                console.log(`Error: ${xhr.status}`);
            }
        };
        xhr.send();
    } catch (error) {
        console.log(error);
    }
    
}

function loadOrder(order_no){
    if(viewNewOrder.classList.contains('flex')){
        viewNewOrder.classList.replace('flex','hidden');
    }
    if(viewOrder.classList.contains('hidden')){
        viewOrder.classList.replace('hidden','flex');
    }
    updateorderdetails(order_no);
}

function updateorderdetails(orderno){
    try {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", getMyOrdersEP);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const order = JSON.parse(xhr.responseText);
                console.log(JSON.parse(xhr.responseText));
                const orders = order.filter(orderrs => orderrs.order_no == orderno);
                console.log(orders);
                dooOrderNo.value = orders[0].order_no;
                dooOrderDate.value = orders[0].order_date;
                dooShipperName.value = orders[0].shipper.fullname;
                dooShipperAL1.value = orders[0].shipper.addressline1;
                dooShipperCity.value = orders[0].shipper.city;
                dooShipperAL2.value = orders[0].shipper.addressline2;
                dooShipperPhone.value = orders[0].shipper.phone;
                dooConsigneeName.value = orders[0].consignee.fullname;
                dooConsigneeAL1.value = orders[0].consignee.addressline1;
                dooConsigneeCity.value = orders[0].consignee.city;
                dooConsigneeAL2.value = orders[0].consignee.addressline2;
                dooConsigneePhone.value = orders[0].consignee.phone;
                dooBoxCount.value = orders[0].box_count;
                dooContDesc.value = orders[0].contents_description;
                dooPaymentMethod.value = orders[0].payment_method;
                dooEstimatePrice.value = orders[0].estimated_price;
                dooStatus.value = orders[0].status;
            } else {
                console.log(`Error: ${xhr.status}`);
            }
        };
        xhr.send();
    } catch (error) {
        console.log(error);
    }
    
}

btnUserLogout.addEventListener('click', (e) => {
    e.preventDefault();

    window.location.href = '../PAGES/customerhome.html';
    sessionStorage.clear();

})

btnUserAccount.addEventListener('click', (e) => {
    e.preventDefault();

    window.location.href = '../PAGES/customeraccount.html';
    
})

btnNewOrder.addEventListener('click',(e) => {
    if(viewNewOrder.classList.contains('hidden')){
        viewNewOrder.classList.replace('hidden','flex');
    }
    if(viewOrder.classList.contains('flex')){
        viewOrder.classList.replace('flex','hidden');
    }
        
        
        doOrderDate.value = getCurrentDate();
        doOrderNo.value = getCurrentDate()+"="+(Math.random() + 1).toString(36).substring(7);
        updateShipperDetails(userid);

})

doBoxCount.addEventListener('input',(e) => {
    doEstimatePrice.value ="$"+(60*doBoxCount.value);
})

btnOCreate.addEventListener('click',(e) => {
    const OrderNo = doOrderNo.value;
    const OrderDate = doOrderDate.value;
    const ShipperName = doShipperName.value;
    const ShipperAL1 = doShipperAL1.value;
    const ShipperCity = doShipperCity.value;
    const ShipperAL2 = doShipperAL2.value;
    const ShipperPhone = doShipperPhone.value;
    const ShipperUserid = userid;
    const ConsigneeName = doConsigneeName.value;
    const ConsigneeAL1 = doConsigneeAL1.value;
    const ConsigneeCity = doConsigneeCity.value;
    const ConsigneeAL2 = doConsigneeAL2.value;
    const ConsigneePhone = doConsigneePhone.value;
    const ConsigneeUserid = "-";
    const Status = "Ready To Pickup";
    const Result = userid;
    const Log = getCurrentDate()+" -- Ready To Pickup -- "+userid;
    const BoxCount = doBoxCount.value;
    const ContDesc = doContDesc.value;
    const EstimatePrice = doEstimatePrice.value;
    const PaymentMethod = doPaymentMethod.value;

    if(ConsigneeName != null && ConsigneeAL1 != null && ConsigneeCity != null && ConsigneeAL2 != null && BoxCount != null && ContDesc != null && EstimatePrice != null && PaymentMethod != null)
    {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", createOrderEP);
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            const body = JSON.stringify({
                "order_no":OrderNo,
                 "order_date":OrderDate,
     "fullname":ShipperName,
  "addressline1":ShipperAL1,
  "city":ShipperCity,
  "addressline2":ShipperAL2,
  "phone":ShipperPhone,
  "shipper_id":ShipperUserid,
  "consignee_name":ConsigneeName,
  "consignee_al1":ConsigneeAL1,
  "consignee_city":ConsigneeCity,
  "consignee_al2":ConsigneeAL2,
  "consignee_phone":ConsigneePhone,
  "consignee_userid":ConsigneeUserid,
  "status":Status,
  "result":Result,
  "log":Log,
  "box_count": BoxCount,
  "contents_description":ContDesc,
  "payment_method":PaymentMethod,
  "estimated_price":EstimatePrice
            });
            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(JSON.parse(xhr.responseText));
                    viewOrder.classList.replace('flex','hidden');
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







function getCurrentDate(){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let fulldate = `${month}-${day}-${year}`;
    return fulldate;
}

function updateShipperDetails(userid) {
    try {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", getAccountEP);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        const body = JSON.stringify({
            "userid": userid
        });
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(JSON.parse(xhr.responseText));
                const userAccount = JSON.parse(xhr.responseText);
                doShipperName.value = userAccount.name;
                doShipperAL1.value = userAccount.addressline1;
                doShipperCity.value = userAccount.city;
                doShipperAL2.value = userAccount.addressline2;
                doShipperPhone.value = userAccount.phone;
            } else {
                console.log(`Error: ${xhr.status}`);
            }
        };
        xhr.send(body);
    } catch (error) {
        console.log(error);
    }
}


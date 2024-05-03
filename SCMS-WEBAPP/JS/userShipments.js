const userid = sessionStorage.getItem("userid");
const userrole = sessionStorage.getItem("userrole");
console.log(userid,userrole);

const btnUserLogout = document.getElementById('btnUserLogout');
btnUserLogout.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '../PAGES/userLogin.html';
    sessionStorage.clear();

})

const getMyOrdersEP = "http://localhost:8080/order/getOrders/";
const newShipmentEP = "http://localhost:8080/shipment/new/";
const getShipemntsEP = "http://localhost:8080/shipment/get/";
const btnNewShipment = document.getElementById('btnNewShipment');
const viewOrders = document.getElementById('ordersView');
const shipmentsView = document.getElementById('shipmentsView');

const doShipmentNo = document.getElementById('doShipmentNo');
const doShipmentDate = document.getElementById('doShipmentDate');
const port = document.getElementById('port');
const sealno = document.getElementById('sealno');
const shippingline = document.getElementById('shippingline');
const registryno = document.getElementById('registryno');
const loading = document.getElementById('loading');
const depature = document.getElementById('depature');
const arrival = document.getElementById('arrival');
const btnCreateShipment = document.getElementById('btnCreateShipment');

btnNewShipment.addEventListener('click',(e) => {
    e.preventDefault();
    if(viewNewOrder.classList.contains('hidden')){
        viewNewOrder.classList.replace('hidden','flex');
    }
    if(viewOrder.classList.contains('flex')){
        viewOrder.classList.replace('flex','hidden');
    }
})

loadShipments();
function loadShipments(){
    let innerTable = ``;
   
        try {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", getShipemntsEP);
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            
            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const shipments = JSON.parse(xhr.responseText);
                    console.log(JSON.parse(xhr.responseText));
                    shipments.forEach(function(obj) {
                        innerTable += `
                        <tr class="py-2">
                        <td>${obj.shipment_no}</td>
                        <td>${obj.port}</td>
                        <td>${obj.shipment_date}</td>
                        <td>${obj.arrival_date}</td>
                        <td></td>
                        </tr>
                        `
                        
                    })
                    console.log(innerTable);
                    shipmentsView.innerHTML = innerTable;
                    
                } else {
                    console.log(`Error: ${xhr.status}`);
                }
            };
            xhr.send();
        } catch (error) {
            console.log(error);
        }
    
    
    
}

var shipmentOrders = [];
loadOrders("");
function loadOrders(sts){
    let innerTable = ``;
   
        try {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", getMyOrdersEP);
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            
            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const orders = JSON.parse(xhr.responseText);
                    console.log(JSON.parse(xhr.responseText));
                    const order = orders.filter(order => order.status == "Shipping Zone Warehouse");
                    console.log(order);
                    order.forEach(function(obj) {
                        shipmentOrders.push(obj.order_no);
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

btnCreateShipment.addEventListener('click',(e) => {
    e.preventDefault();
    const ShipmentNo = doShipmentNo.value;
    const ShipmentDate = doShipmentDate.value;
    const portt = port.value;
    const sealnoo = sealno.value;
    const shippinglineo = shippingline.value;
    const registrynoo = registryno.value;
    const loadingo = loading.value;
    const depatureo = depature.value;
    const arrivalo = arrival.value;

    if(ShipmentNo != null && ShipmentDate != null && portt != null && sealnoo != null && shippinglineo != null && registrynoo != null && loadingo != null && depatureo != null)
    {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", newShipmentEP);
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            const body = JSON.stringify({
                "shipment_no":ShipmentNo,
                "shipment_date":ShipmentDate,
                "port":portt,
                "seal_no":sealnoo,
                "shipping_line":shippinglineo,
                "registry_no":registrynoo,
                "loading_date":loadingo,
                "depature_date":depatureo,
                "arrival_date":arrivalo,
                
  
            });
            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(JSON.parse(xhr.responseText));
                    updateOrdSts(shipmentOrders);
                    //viewNewOrder.classList.replace('flex','hidden');
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
var updateOrderSts = "http://localhost:8080/order/statusUpdate/";
function updateOrdSts(ordersList){
    let i = 0;
    while(i < ordersList.length){
        try {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", updateOrderSts);
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            const body = JSON.stringify({
                "order_no":ordersList[i],
                "status": "Ready To Ship",
                "result": doShipmentNo.value
            });
            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                } else {
                    console.log(`Error: ${xhr.status}`);
                }
            };
            xhr.send(body);
        } catch (error) {
            console.log(error);
        }
        i++;
    }
    
}
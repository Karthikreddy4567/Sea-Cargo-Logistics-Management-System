const inpOrderNo = document.getElementById("inpOrderNo");
const inpDescCity = document.getElementById("inpDescCity");
const inpStatusDesc = document.getElementById("inpStatusDesc");
const inpTrackingSts = document.getElementById("inpTrackingSts");

const getMyOrdersEP = "http://localhost:8080/order/getOrders/";

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const order_id = urlParams.get('order_no');
    console.log(order_id);
    getOrderStatus(order_id);
}, false);

function getOrderStatus(_orderno){
    console.log(_orderno);
    try {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", getMyOrdersEP);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const orders = JSON.parse(xhr.responseText);
                console.log(JSON.parse(xhr.responseText));
                const order = orders.filter(ord => ord.order_no === _orderno);
                console.log(order);
                inpOrderNo.innerText = orders[0].order_no;
                inpDescCity.innerText = orders[0].consignee.city;
                inpStatusDesc.innerText = orders[0].status;
                switch(orders[0].status){
                    case 'Ready To Pickup':{
                        inpStatusDesc.innerText += "\nCurrently the cargo is with customer. Soon will be picked up by agent";
                        inpTrackingSts.src = '../ASSETS/Tracking-01.png';
                    }
                    break;
                    case 'Picked Up By Agent':{
                        inpStatusDesc.innerText += "\nCurrently the cargo is with agent. Soon will be dropoff at warehouse";
                        inpTrackingSts.src = '../ASSETS/Tracking-01.png';
                    }
                    break;
                    case 'Shipping Zone Warehouse':{
                        inpStatusDesc.innerText += "\nCurrently the cargo is with shipping Zone Warehouse. It will be shipped soon.";
                        inpTrackingSts.src = '../ASSETS/Tracking-02.png';
                    }
                    break;
                    case 'Ready To Ship':{
                        inpStatusDesc.innerText += "\nCurrently the cargo is ready to ship.";
                        inpTrackingSts.src = '../ASSETS/Tracking-03.png';
                    }
                    break;
                    case 'In-Transit':{
                        inpStatusDesc.innerText += "\nCurrently the cargo is in transit. Soon will reach destination.";
                        inpTrackingSts.src = '../ASSETS/Tracking-04.png';
                    }
                    break;
                    case 'Delivered':{
                        inpStatusDesc.innerText += "\ncargo is successfully delivered.";
                        inpTrackingSts.src = '../ASSETS/Tracking-06.png';
                    }
                    break;
                }
                
            } else {
                console.log(`Error: ${xhr.status}`);
            }
        };
        xhr.send();
    } catch (error) {
        console.log(error);
    }
    
}
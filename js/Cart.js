var myCartDetails = JSON.parse(window.localStorage.getItem('myCart'));
var mainprice = 0;
var mainquantity = 0;

function menu() {
    var i = 0;
    for (i = 0; i < myCartDetails.length; i++) {
        addDetailsToCart(myCartDetails[i]);
    }
}

function addDetailsToCart(burger) {
    var table = document.getElementById("MyCart");
    var rowcount = table.rows.length;
    var tablerow = table.insertRow(rowcount);
    var cell1 = tablerow.insertCell(0);
    var cell2 = tablerow.insertCell(1);
    var cell3 = tablerow.insertCell(2);
    var cell4 = tablerow.insertCell(3);
    var cell5 = tablerow.insertCell(4);
    var cell6 = tablerow.insertCell(5);

    cell1.innerHTML = burger.name;
    cell2.innerHTML = burger.category;
    cell3.innerHTML = burger.price;
    cell4.innerHTML = burger.quantity;
    cell5.innerHTML = burger.totalPrice;
    var dltimg = document.createElement('img');
    dltimg.src = "images/delete.jpg";
    dltimg.onclick = function() {
        var td = event.target.parentNode;
        var tr = td.parentNode;
        var i = 0;
        for (i = 0; i < myCartDetails.length; i++) {
            if (myCartDetails[i].name === burger.name)
                break;
        }
        window.localStorage.removeItem('myCart');
        myCartDetails.splice(i, 1);
        window.localStorage.setItem('myCart', JSON.stringify(myCartDetails));
        tr.parentNode.removeChild(tr);
        totalCart();
    }
    cell6.appendChild(dltimg);
}

function totalCart() {
    var priceCart = 0;
    var quantityCart = 0;
    for (var i = 0; i < myCartDetails.length; i++) {
        priceCart += parseInt(myCartDetails[i].totalPrice, 10);
        quantityCart += parseInt(myCartDetails[i].quantity, 10);
    }
    mainprice = priceCart;
    mainquantity = quantityCart;
    populatePage();
}

function populatePage() {
    document.getElementById('q').innerHTML = mainquantity;
    document.getElementById('p').innerHTML = mainprice;
}

function view() {
    console.log(mainprice + " " + mainquantity);
    if (myCartDetails && myCartDetails.length === 0) {
        alert("Please Add Some item To Cart");
        window.location.href = "Burger.html";
    } else {
        $.ajax({
            type: "POST",
            url: "http://localhost:9876/orders",
            dataType: "JSON",
            ContentType: "application/json; charset=utf-8",
            data: { "totalQuantity": mainquantity, "totalPrice": mainprice },
            success: function(data) {
                document.getElementById('a').innerHTML = data.quantity;
                document.getElementById('b').innerHTML = data.discount;
                document.getElementById('c').innerHTML = data.price;
                var x = document.getElementById('result');
                x.style.display = "block";
            },
            error: function() {
                console.log("Error");
            }
        });
    }
}
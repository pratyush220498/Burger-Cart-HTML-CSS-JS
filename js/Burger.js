class Burger {
    constructor(name, category, quantity, price, totalPrice) {
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.totalPrice = totalPrice
    }

    show() {
        console.log(this.name + " " + this.category + " " + this.quantity + " " + this.price);
    }
}

let burgersInCart = new Array();


function addBurgerToCart(burgerName, burgerQuantity, burgerCategory) {
    var totalprice = 0;
    var price = 0;
    var flag = 0;
    console.log(burgerName + " " + burgerQuantity + " " + burgerCategory);
    if (!(burgerQuantity >= 1 && burgerQuantity <= 5)) {
        alert("Please enter quantity in range from 1 to 5");
    } else {
        if (burgerCategory == 'veg') {
            totalprice = burgerQuantity * 100;
            price = 100;
        } else if (burgerCategory == 'egg') {
            totalprice = burgerQuantity * 150;
            price = 150;
        } else if (burgerCategory == 'chicken') {
            totalprice = burgerQuantity * 200;
            price = 200;
        }
        let burger = new Burger(burgerName, burgerCategory, burgerQuantity, price, totalprice);
        if (burgersInCart && burgersInCart.constructor == Array && burgersInCart.length == 0) {
            burger.show();
            burgersInCart.push(burger);
            flag = 1;
            console.log(JSON.stringify(burgersInCart));
        } else {
            var i;
            for (i = 0; i < burgersInCart.length; i++) {
                if (burgersInCart[i].name === burgerName && burgersInCart[i].category === burgerCategory) {
                    break;
                }
            }
            burgersInCart.splice(i, 1);
            burger.show();
            burgersInCart.push(burger);
            flag = 1;
            console.log(JSON.stringify(burgersInCart));
        }
        if (flag === 0) {
            burger.show();
            burgersInCart.push(burger);
            console.log(JSON.stringify(burgersInCart));
        }
    }

}


function addToCart() {
    if (burgersInCart && burgersInCart.constructor == Array && burgersInCart.length === 0) {
        alert("Please add some item to cart");
        window.location.href = "Burger.html";
    } else {
        window.localStorage.setItem('myCart', JSON.stringify(burgersInCart));
        window.location.href = "MyCart.html";
    }
}
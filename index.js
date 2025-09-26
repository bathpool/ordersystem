import { menuArray } from "/data.js"

const menuSection = document.getElementById("menu-section")
const checkoutSection = document.getElementById("checkout-section")
const paymentOverlay = document.getElementById("payment-overlay")
const completeSection = document.getElementById("complete-section")
const paymentInfo = Array.from(document.getElementsByClassName("payment-card"))
const orderItems = []
const cardInfo = []


renderMenu()
initializeItem()

document.addEventListener("click", function(e){
    if (e.target.dataset.id) {
        const orderItem = menuArray.find(item => item.id == e.target.dataset.id)
        orderItems[orderItem.id]++
        renderCheckout()
    } else if (e.target.dataset.remove) {
        const removeItem = menuArray.find(item => item.id == e.target.dataset.remove)
        orderItems[removeItem.id]--
        renderCheckout()
    } else if (e.target.dataset.submit) {
        checkoutSection.classList.add("disappear")
        paymentOverlay.classList.remove("disappear")
    } else if (e.target.dataset.pay) {
        paymentOverlay.classList.add("disappear")
        checkoutSection.classList.add("disappear")
        saveCard()
        renderComplete()
        initializeItem()
    }
})

function saveCard() {
    paymentInfo.forEach(input => {
        cardInfo.push(input.value)
        console.log(input.required)
        })
    
}

function initializeItem() {
    orderItems.length = 0
    paymentInfo.forEach(input => input.value = "")
    menuArray.forEach(menu => orderItems.push(0))
    cardInfo.length = 0
}

function renderMenu() {
    let menuHtml = ""
    menuArray.forEach(function(menu) {
        menuHtml += `
            <div class="menu-item">
                <div class="menu-left">
                    <div class="menu-emoji">${menu.emoji}</div>
                    <div>
                        <p class="menu-name">${menu.name}</p>
                        <p class="menu-ingredients">${menu.ingredients.join(",")}</p>
                        <p class="menu-price">$${menu.price}</p>
                    </div>
                </div>
                <div class="menu-btn" data-id="${menu.id}">+</div>
            </div>`        
    })
    menuSection.innerHTML = menuHtml

}

function renderCheckout() {
    let checkoutHtml = '<div class="menu-name">Your order</div>'
    let totalPrice = 0
    
    completeSection.classList.add("disappear")
    checkoutSection.classList.remove("disappear")
 
  
    orderItems.forEach(function(number, i) {
        if (number > 0) {
            const menu = menuArray[i]
            totalPrice += number * menu.price
            checkoutHtml += `
                <div class="checkout-items">
                    <div>
                        <span class="menu-name">${menu.name + orderNumber(orderItems[i])}</span>
                        <span class="remove-btn" data-remove="${menu.id}">&nbsp;&nbsp;&nbsp;remove</span>
                    </div>
                    <div class="menu-price">$${menu.price * orderItems[i]}</div>
                </div>
                `       
        }
        })
    
    checkoutHtml += `
            <div class="checkout-price">
                <div class="menu-name">Total price:</div>
                <div class="menu-price">${totalPrice}</div>
            </div>
            <div class="checkout-btn" data-submit="complete-order">Complete order</div>
            `
    checkoutSection.innerHTML = checkoutHtml
    
}

function orderNumber(number) {
    if (number === 1) {
        return " "
    } else if (number > 1) {
        return " x " + number
    }
}

function renderComplete() {
    completeSection.classList.remove("disappear")
    completeSection.innerHTML = `<p>Thanks, ${cardInfo[0]}! Your order is on its way!</p>`
}
import { menuData }
from "./menuData.js";
import { restaurants } from "./restaurants.js";
import { bebidas } from "./bebidas.js";

/*Getting HTML elements*/
const restaurantInfo = document.getElementById("info-section")
const menuSection = document.getElementById("menu-section")
const closeModal = document.getElementById("modal-close-btn")
const modal = document.getElementById("modal")
const modalInner = document.getElementById("modal-inner")

/*Variables*/
let isSelected = false;

/*Main code*/
renderRestaurantInfo("McDonald's")
renderMenu()

const comboSectionDivElements = document.querySelectorAll(".combo-section")

comboSectionDivElements.forEach((elementDiv) =>
    elementDiv.addEventListener("click",
        function() {
            modal.style.display = "flex"
            const idObject = elementDiv.getAttribute("id")
            console.log(idObject)
            console.log(idObject.split("-", 2).join("-"))
            const selectedMenu = getObjectMenu(idObject.split("-", 2).join("-"))
            modalInner.innerHTML = `
            <div>
            <div >
            <img src="${selectedMenu.img}" class="modal-img">
            <div>
            <h1>${selectedMenu.name}</h1>
            <h4>$${selectedMenu.price}</h4>

            <div class="line"></div>

            <div class="bebidas">
            ${renderBebidas()}
            </div>

            </div>
            </div>
            <button class="shopping-cart-button">Agregar $${selectedMenu.price}</button>
            </div>`
        }))


closeModal.addEventListener("click", function() {
    modal.style.display = "none"
})

/*Functions */

function getObjectMenu(idMenu) {
    let menuSelected = {}

    for (let menus of menuData) {
        if (menus.code == idMenu) {
            menuSelected = menus
        }
    }

    return menuSelected

}

function renderRestaurantInfo(restaurantName) {
    let selectedRestaurant
    for (let restaurant of restaurants) {
        if (restaurant.name === restaurantName) {
            selectedRestaurant = restaurant
        }
    }
    restaurantInfo.innerHTML = ` 
    <div id="restaurant-info">
     <img src="${selectedRestaurant.imgbanner}" class="container">
     <div class="restaurant-name-logo">
        <img id="restaurant-logo" class="restaurant-logo" src="${selectedRestaurant.imglogo}">
        <h1 id="restaurant-name">${selectedRestaurant.name}</h1>
     </div>
    </div>
    <div id="delivery-info" class="delivery-info">
     <div>
        <div class="light-grey">
            <p>Entrega</p>
         <i class="fa-regular fa-clock"></i>
        </div>
        <p id="delivery-time" class="text-bolder">${selectedRestaurant.deliveryTime} min</p>
    </div>

    <div>
        <div class="light-grey">
         <p>Envío</p>
         <i class="fa-regular fa-moped"></i>
        </div>
        <p id="delivery-shipping" class="text-bolder">$${selectedRestaurant.shipping}</p>
      </div>
    <div>
    <div class="light-grey">
        <p>Calificación</p>
        <i class="fa-solid fa-star"></i>
        </div>
        <p id="delivery-shipping" class="text-bolder">${selectedRestaurant.calification}</p>
    </div>
    </div>`

}

function renderMenu() {
    menuSection.innerHTML = `
    <div id="combos" class="combos">
    <h1>Combos</h1>
        ${renderCombo()}
    </div>
    <div><h1>Otros<h1>
    ${renderOthers()}
    </div>`
}

function renderCombo() {
    let theCombos = []
    let comboCode = ""
    for (let menus of menuData) {
        if (menus.category == "combo") {
            theCombos.push(menus)
        }
    }

    for (let i = 0; i < theCombos.length; i++) {
        comboCode += `
        <div class="combo-section" id="${theCombos[i].code}-combo-section-div">
            <div>
                <h2>${theCombos[i].name}</h2>
                <p>${theCombos[i].text}</p>
                <p class="text-bolder"> $${theCombos[i].price}</p>
            </div>
            <img src=${theCombos[i].img} id="${theCombos[i].code}-img" class="${theCombos[i].code}-img img-selector">
        </div>
`

    }

    return comboCode

}

function openModal(idforlistener) {
    document.getElementById("idforlistener").addEventListener("click", function() {
        modal.style.display = "flex"
    })
}

function renderOthers() {
    let theOthers = []
    let othersCode = ""
    for (let menus of menuData) {
        if (menus.category == "otro" || menus.category == "postre") {
            theOthers.push(menus)
        }
    }

    for (let k = 0; k < theOthers.length; k++) {
        othersCode += `
            <div class="comnbo-section" id="${theOthers[k].code}-other-section-div">
            <div>
            <p>${theOthers[k].name}</p>
            <p>${theOthers[k].price}</p>
            </div>
            <img src="${theOthers[k].img} id="${theOthers[k].code}-img" class="${theOthers[k].code}-img img selector">
            </div>
    `
    }

    return othersCode
}

function renderBebidas() {
    let costsExtraBev = []
    let notCostsExtra = []
    for (let bebida of bebidas) {
        if (bebida.costsExtra) {
            costsExtraBev.push(bebida)
        } else {
            if (!bebida.costsExtra) {
                notCostsExtra.push(bebida)
            }
        }
    }
    let bevCode = `
    <h4>Bebidas</h4>
<div class="right-side">
<p class="obligatory">Obligatorio</p></div>
    `
    for (let i = 0; i < notCostsExtra.length; i++) {
        bevCode += `
        <div>
        <div class="radio-bev">
    <label fo r="${notCostsExtra[i].name}">${notCostsExtra[i].name}</label>
    <input type="radio" id="${notCostsExtra[i].name}"></div>
    <div class="line"></div></div>`

    }

    for (let j = 0; j < costsExtraBev.length; j++) {
        bevCode += `
        <div class="radio-bev">
        <div class="extra-cost-bev">
        <label for="${costsExtraBev[j].name}">${costsExtraBev[j].name}</label>
        <p>$${costsExtraBev[j].extraPrice}
    </div>
    <input type="radio" id="${costsExtraBev[j].name}">
    
    </div>
    <div class="line"></div>
        `
    }

    return bevCode;

}
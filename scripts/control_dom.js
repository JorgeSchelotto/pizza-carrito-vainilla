import Productos from './productos.js';
import firebaseConfig from './firebase/config.js';






// VARIABLES
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firestore
const db = firebase.firestore();
$('#awaiting').show();
const getItems = async() => {
    //Consulta firestore
    var productos = new Productos(db, 'pizzas');
    let prods = "";
    try {

        prods = await productos.getProductos();
        console.log(prods)
    } catch (error) {
        console.log('Error al obtener los productos: ' + error);
    } finally {
        console.log('Finalizó la consulta');
        $('#awaiting').hide();
    }

    return prods;
}



// Obtengo el carrito de compras del localStorage
var cart = JSON.parse(localStorage.getItem('cart')) || [];


// FUNCTIONS
$("#contador__carrito").append(cart.length)

var cards = '';


// Creo las tarjetas de las pizzas con información de firebase
const pizzas = await getItems();
console.log(pizzas);
pizzas.map(pizza => {
    cards = cards + `
        <div class="col">
            <div class="card text-center" id="card__container">
                <img src=${pizza.img} class="card-img-top" alt="${pizza.description}">
                <div class="card-body">
                    <h5 class="card-title">${pizza.name}</h5>
                    <p class="card-text">${pizza.description}</p>
                    <p class="card-text">Precio: $${pizza.price}</p>
                    <button type="button" class="btn btn-secondary" id="${pizza.id}">Agregar al carrito</button>
                </div>
            </div>
        </div>
    `;
})

$("#productos__container").append(cards)



// Agrego los eventos de click a los botones de agregar al carrito
$(document).on("click", ".btn.btn-secondary", (event) => {


    //animacion de boton;
    var backColor = $(event.target).css("backgroundColor");
    $(event.target).animate({ backgroundColor: 'green' }, { duration: 0, queue: true })
    $(event.target).delay(200)
    $(event.target).animate({ backgroundColor: backColor }, { duration: 0, queue: true });



    //agregar al carrito
    var id = event.target.id;
    cart.push(id)
    localStorage.setItem('cart', JSON.stringify(cart));
    // Obtengo precio del producto
    let price = parseFloat(pizzas.find(o => o.id === id).price) || 0;
    // Obtengo el precio total
    localStorage.setItem('price', (price + parseFloat(localStorage.getItem('price'))) || price);
    // Actualizo el contador de productos en el carrito
    console.log(localStorage.getItem('cart'))
    $("#contador__carrito").html(cart.length)
})


// Evento de click en el boton de borrar carrito
$(document).on("click", "#carrito__borrar", (e) => {
    // Borro el carrito
    console.log('Borrando');
    localStorage.removeItem('cart');
    localStorage.removeItem('price');
    $("#contador__carrito").html(cart.length)
    console.log('Cart: ', cart.length);
    location.reload();
})



// Evento de click en el boton de finalizar pedido
$(document).on("click", "#carrito__pedir", (e) => {
    // Obtengo el precio total
    let price = parseFloat(localStorage.getItem('price')) || 0;
    alert("Pedido realizado, el total es $" + price);
    // Muestro el precio total
    // Borro el carrito
    localStorage.removeItem('cart');
    localStorage.removeItem('price');
    $("#contador__carrito").html(cart.length);
    location.reload();
})



// Evento de click en el boton de ver carrito
$(document).on("click", "#carrito__detalle", (e) => {
    // Obtengo el precio total
    let price = parseFloat(localStorage.getItem('price')) || 0;
    $("#total__pedido").html("");
    $("#tabla__pedido").html("");
    $("#total__pedido").append(`$${price}`)
    if (localStorage.getItem('cart') != null) {

        JSON.parse(localStorage.getItem('cart')).map(prod => {
            console.log('Prod: ', prod);
            let pizza = pizzas.find(o => o.id === prod);
            $("#tabla__pedido").append(`
            <tr>
                <td>${pizza.name}</td>
                <td>${pizza.name}</td>
                <td>$${pizza.price}</td>
            </tr>
        `)
        })
    }

})




// ANIMAR CARDS

$(function() {

    $(".card").toArray().map((element, index) => {
        $(element).hide().delay(index * 200).fadeIn({ queue: true, duration: 1200 }).animate({ top: "-10px" }, { duration: 1200, queue: false });
    })
});
$(document).ready(function() {

    // VARIABLES
    const pizzas = [
        { id: 0, name: 'Muzarela', price: 800, description: 'Muzarela', img: 'https://www.placecage.com/c/200/200' },
        { id: 1, name: 'Muzarela Vegana', price: 800, description: 'muzarelaVegana', img: 'https://www.placecage.com/c/200/200' },
        { id: 2, name: 'Verduras', price: 1000, description: 'verduras', img: 'https://www.placecage.com/c/200/200' },
        { id: 3, name: 'Napolitana', price: 900, description: 'Napolitana', img: 'https://www.placecage.com/c/200/200' },
        { id: 4, name: 'Margarita ', price: 900, description: 'Margarita', img: 'https://www.placecage.com/c/200/200' }
    ]
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // FUNCTIONS
    $("#contador__carrito").append(cart.length)

    console.log(pizzas)
    var cards = '';

    pizzas.map(pizza => {
        cards = cards + `
        <div class="col">
            <div class="card text-center">
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
    $(document).on("click", ".btn.btn-secondary", (event) => {
        cart.push(event.target.id)
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('price', (parseFloat(pizzas[event.target.id].price) + parseFloat(localStorage.getItem('price'))) || parseFloat(pizzas[event.target.id].price));
        console.log(localStorage.getItem('cart'))
        $("#contador__carrito").html(cart.length)
    })

    $(document).on("click", "#carrito__borrar", (event) => {
            localStorage.removeItem('cart');
            localStorage.removeItem('price');
            $("#contador__carrito").html(cart.length)
        })
        // // Elimina todos los elementos
        // localStorage.clear();
        // localStorage.removeItem('cart');

    $(document).on("click", "#carrito__pedir", (event) => {
        alert("Pedido realizado, el total es $" + (localStorage.getItem('price') || 0))
    })
})
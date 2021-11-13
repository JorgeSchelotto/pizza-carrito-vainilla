$(document).ready(function() {
    const pizzas = [
        { id: 1, name: 'Muzarela', price: 800, description: 'Muzarela', img: 'https://www.placecage.com/c/200/200' },
        { id: 2, name: 'Muzarela Vegana', price: 800, description: 'muzarelaVegana', img: 'https://www.placecage.com/c/200/200' },
        { id: 3, name: 'Verduras', price: 1000, description: 'verduras', img: 'https://www.placecage.com/c/200/200' },
        { id: 4, name: 'Napolitana', price: 900, description: 'Napolitana', img: 'https://www.placecage.com/c/200/200' },
        { id: 5, name: 'Margarita ', price: 900, description: 'Margarita', img: 'https://www.placecage.com/c/200/200' }
    ]

    console.log(pizzas)
    var cards = '';
    // Obtengo Nodo productos__container
    pizzas.map(pizza => {
        cards = `
        <div class="col">
            <div class="card text-center">
                <img src=${pizza.img} class="card-img-top" alt="${pizza.description}">
                <div class="card-body">
                    <h5 class="card-title">${pizza.name}</h5>
                    <p class="card-text">${pizza.description}</p>
                    <p class="card-text">Precio: $${pizza.price}</p>
                    <button type="button" class="btn btn-secondary" id="agregar__carrito__${pizza.id}">Agregar al carrito</button>
                </div>
            </div>
        </div>
    ` + cards;
    })

    $("#productos__container").append(cards)

})
const pizzas = [
    { id: 1, name: 'Muzarela', price: 800, description: 'Muzarela', img: 'https://www.placecage.com/c/200/200' },
    { id: 2, name: 'Muzarela Vegana', price: 800, description: 'muzarelaVegana', img: 'https://www.placecage.com/c/200/200' },
    { id: 3, name: 'Verduras', price: 1000, description: 'verduras', img: 'https://www.placecage.com/c/200/200' },
    { id: 4, name: 'Napolitana', price: 900, description: 'napolitana', img: 'https://www.placecage.com/c/200/200' }
]

console.log(pizzas)

// Obtengo Nodo productos__container
document.getElementById("productos__container").innerHTML = pizzas.map(pizza => {
    return `
        <article class="card">
            <img src=${pizza.img} alt="${pizza.description}">
            <div class="container__card">
                <h4 class="text-center">${pizza.name}</h4>
                <p>${pizza.description}</p>
                <p>Precio: ${pizza.price}</p>
                <input type="submit" value="COMPRAR">
            </div>
        </article>
    `
})
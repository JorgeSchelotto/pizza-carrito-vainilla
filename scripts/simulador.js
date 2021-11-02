// OBJETOS
class Usuario {
    constructor(nombre, apellido, tel) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombre = tel;
        this.pedido = null;
        this.costo = null;
    }

    setPedido = (pedido) => {
        this.pedido = pedido
    }

    setCosto = (costo) => {
        this.costo = costo
    }
}



// VARIABLES

var pizzas = {
    muzarela: { id: 1, nombre: 'Muzarela', costo: 800 },
    muzarelaVegana: { id: 2, nombre: 'Muzarela Vegana', costo: 800 },
    verduras: { id: 3, nombre: 'Verduras', costo: 1000 },
    napolitana: { id: 4, nombre: 'Napolitana', costo: 900 },
}



// FUNCIONES
extraerValoresPizzas = (obj, valorABuscar) => {
    // Recorre un array de objetos buscando un valor. Si existe ese valor dentro de un objeto, retorna ese objeto.
    // Si el valor no existe retorna false
    let bool;
    for (var key in obj) {
        bool = true;
        for (var key2 in obj[key]) {
            if (obj[key][key2] == valorABuscar) {
                console.log(obj[key][key2])
                return obj[key];
            } else {
                // console.log(obj[key][key2])
                bool = false;
            }
        }
    }
    if (!bool) {
        return bool;
    }
}


seleccionarProductos = (pizzas) => {
    // Menu de seleccion de productos.

    let eleccion = 'eleccion';
    let elecciones = [];
    while (eleccion.toLowerCase() != 'calcular') {
        // Para simplificar el proceso de calculo, minimo tiene que haber un producto.
        eleccion = (prompt(
            "Ingrese el nombre la variedad de pizza, para terminar escriba calcular " + " " +
            " - " + pizzas['muzarela']['nombre'] + " $" + pizzas['muzarela']['costo'] + " " +
            " - " + pizzas['muzarelaVegana']['nombre'] + " $" + pizzas['muzarelaVegana']['costo'] + " " +
            " - " + pizzas['verduras']['nombre'] + " $" + pizzas['verduras']['costo'] + " " +
            " - " + pizzas['napolitana']['nombre'] + " $" + pizzas['napolitana']['costo'] +
            "SI PRESIONA CANCELAR, SE CANCELARÁ EL PEDIDO."
        ));

        if ((eleccion) && (eleccion.toLowerCase() != 'calcular')) {
            let pizza = extraerValoresPizzas(pizzas, eleccion);
            if (pizza != false) {
                elecciones.push(extraerValoresPizzas(pizzas, eleccion))
                console.log(elecciones)
            } else {
                alert("Ingrese correctamente el nombre de la pizza.")
            }

        } else {
            return elecciones;
        }
    }


}


calcularCostoFinal = (elecciones) => {
    // Calcula el costo final del seudo carrito
    let reducer = (previousValue, currentValue) => previousValue + currentValue;
    return elecciones.map((x) => x.costo).reduce(reducer);
}




// MAIN
var nombre = prompt("Ingrese su nombre.")
var apellido = prompt("Ingrese su apellido.")
var tel = prompt("Ingrese telefono")
var user = new Usuario(nombre, apellido, tel)

var selecciones = seleccionarProductos(pizzas)
var costo = calcularCostoFinal(selecciones)


alert(selecciones.length > 0 ? "El costo total es: $" + costo : "No se realizó selección.")

user.setPedido(selecciones);
user.setCosto(costo);


console.log(user)
$(document).ready(function() {

    let contenido = `<p>Pais: <span id="pais"></span></p>
    <p> Ciudad: <span id="ciudad"></span></p>
    <p>Temperatura: </p>
    <p><img id="icono" src=""></img>
    </p>
    <p><span id="temperatura"></span></p>
    <p>Humedad: <span id="humedad"></span></p>
    <p> Viento: <span id="viento"></span></p>
    <p>Descripcion: <span id="descripcion"></span></p> `;

    let addContenido = function(contenidoHtml) {
        $("#clima").html(contenidoHtml);
    }

    let getClima = function(ciudad) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather",
            type: "GET",
            data: {
                q: `${ciudad},ar`,
                appid: "dbbd01c29ac808ba210959454a7881a1",
                dataType: "jsonp",
                units: "metric",
                lang: "es",
            },
            success: function(data) {
                addContenido(contenido);
                console.log(data);
                $("#temperatura").html(data.main.temp);
                $("#humedad").html(data.main.humidity);
                $("#viento").html(data.wind.speed);
                $("#ciudad").html(data.name);
                $("#pais").html(data.sys.country);
                $("#descripcion").html(data.weather[0].description);
                $("#icono").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

            },
            error: function(error) {
                console.log(error);
            }
        });
    };

    // EVENTO CLICK
    $(document).on("click", "#input__ciudad", (event) => {
        event.preventDefault();
        let ciudad = $("#select__ciudad").val();
        getClima(ciudad);



    });
});
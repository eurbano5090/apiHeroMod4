import { peticionFetch } from "./funciones.js";

const urlBase = "https://www.superheroapi.com/api.php/";
const accessToken = "b1880703a98354eb0da41a18dbd6f645";

$(() => {
    $("#form-busqueda-nombre").submit(async function(event) {
        event.preventDefault();
        const busqueda = $("#txt-busqueda-nombre").val();
        if(busqueda == "") {
            return alert("Por favor ingrese un criterio de búsqueda")
        }

        const url = `${urlBase}${accessToken}/search/${busqueda}`

        try {
            $("#personajes-nombre").html("");
            console.log($("#loading"));
            $("#loading").removeClass("d-none");
            const response = await peticionFetch(url);
            if(response.response === "success") { // si consiguió personajes
                for (const personaje of response.results) {
                    $("#personajes-nombre").append(`
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="card">
                                <img src="${personaje.image.url}" class="card-img-top" alt="${personaje.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${personaje.name}</h5>
                                    <div class="card-text">
                                        <div>
                                            <span class="fw-bold">Género:</span>
                                            <span>${personaje.appearance.gender}</span>
                                        </div>
                                        <div>
                                            <span class="fw-bold">Estatura:</span>
                                            <span>${personaje.appearance.height[1]}</span>
                                        </div>
                                        <div>
                                            <span class="fw-bold">Peso:</span>
                                            <span>${personaje.appearance.weight[1]}</span>
                                        </div>
                                        <div>
                                            <span class="fw-bold">Raza:</span>
                                            <span>${personaje.appearance.race}</span>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    `);
                }
            } else { // No consiguió personajes
                $("#personajes-nombre").html(`
                    <div class="col-12 text-danger fw-bold text-center">
                        No se encontraron personajes con su criterio de búsqueda
                    </div>
                `)
            }
            $("#loading").addClass("d-none");
        } catch (error) {
            alert("Ha sucedido un error, intente nuevamente")
        }
        
    })
})


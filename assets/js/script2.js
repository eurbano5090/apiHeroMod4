import {ajax,peticionFetch} from "./funciones.js"


const urlBase = "https://www.superheroapi.com/api.php/";
const accessToken = "b1880703a98354eb0da41a18dbd6f645";

const llenarSelect = () => {
    for (let index = 1; index <= 700; index++) {
        $("#select-id-inicial, #select-id-final").append(`
            <option value="${index}">${index}</option>
        `)  
    }
}
llenarSelect()

$("#form-busqueda-id").submit(async function(event) {
    event.preventDefault()
    const idInicial = $("#select-id-inicial").val()
    const idFinal = $("#select-id-final").val()
/*
    if(idInicial > idFinal) {
        return alert("El ID final debe ser mayor o igual al inicial")
    }*/

    $("#personajes-id").html("")

/*
    // Ejemplo proceso sincrónico
    $("#loading").removeClass("d-none");
    for (let index = idInicial; index <= idFinal; index++) {
        const url = `${urlBase}${accessToken}/${index}`
        const respuesta = await ajax(url)
        $("#personajes-id").append(`
            <div class="col-3">
                <div class="card">
                    <img src="${respuesta.image.url}" class="card-img-top" alt="${respuesta.name}">
                    <div class="card-body">
                        <h5 class="card-title">${respuesta.name}</h5>
                        <div class="card-text">
                            <div>
                                <span class="fw-bold">Género:</span>
                                <span>${respuesta.appearance.gender}</span>
                            </div>
                            <div>
                                <span class="fw-bold">Estatura:</span>
                                <span>${respuesta.appearance.height[1]}</span>
                            </div>
                            <div>
                                <span class="fw-bold">Peso:</span>
                                <span>${respuesta.appearance.weight[1]}</span>
                            </div>
                            <div>
                                <span class="fw-bold">Raza:</span>
                                <span>${respuesta.appearance.race}</span>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        `);
    }
    $("#loading").addClass("d-none");

*/

    // Ejemplo proceso Asincrónico
   const promesas = [];
   $("#loading").removeClass("d-none");
   for (let index = idInicial; index <= idFinal; index++) {
       const url = `${urlBase}${accessToken}/${index}`
       const promesa = ajax(url)
       promesas.push(promesa)
   }
   const respuesta = await Promise.all(promesas)
   $("#loading").addClass("d-none");
   for (const personaje of respuesta) {
       $("#personajes-id").append(`
           <div class="col-3">
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
})

import {peticionFetch} from "./funciones.js"


const urlBase = "https://www.superheroapi.com/api.php/";
const accessToken = "b1880703a98354eb0da41a18dbd6f645";
const itemsPorPagina = 20; 
let paginaActual = 1;
let totalPersonajes = 0;
let personajes = []; 

const cargarDatos=(async () => {
       
         const url = `${urlBase}${accessToken}/search/a`
    try {
        $("#personajes-nombre tbody").html("");
        console.log($("#loading"));
        $("#loading").removeClass("d-none");
        const response = await peticionFetch(url);
        if(response.response === "success") { // si consiguió personajes
           personajes=response.results;
           totalPersonajes=personajes.length;
           generarPaginacion(totalPersonajes,itemsPorPagina);
           listarPersonajes(paginaActual);
            } else { // No consiguió personajes
                $("#personajes-nombre tbody").html(`
                    <div class="col-12 text-danger fw-bold text-center">
                        No se consiguieron personajes con su criterio de búsqueda
                    </div>
                `)
            }
            $("#loading").addClass("d-none");
        } catch (error) {
            alert("Ha sucedido un error, intente nuevamente")
        }
    });

    const listarPersonajes=(pagina)=>{
        const inicio = (pagina - 1) * itemsPorPagina;
        const fin = inicio + itemsPorPagina;
        const datosPagina = personajes.slice(inicio, fin);
        $("#personajes-nombre tbody").html("");
    for (const item of datosPagina) {
        $("#personajes-nombre tbody").append(`
             <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.work.occupation}</td>
        <td>* ${item.biography.aliases.join("<br>* ")}</td>
        <td>
            <img class="img-avatar" src="${item.image.url}">
        </td>
        <td>
          <div class="btn-group">
                        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Acciones
                        </button>
                        <ul class="dropdown-menu  dropdown-menu-start">
                            <li><a class="dropdown-item link-eliminar text-danger " data-id="${item.id}" href="#"><i class="fa-solid fa-trash-can"></i></a></li>
                        </ul>
                    </div>
        </td>
    </tr>    
`);
        }
    }


    const generarPaginacion = (totalItems, itemsPorPagina) => {
        $("#paginacion").html(""); // Limpiar antes
        const totalPaginas = Math.ceil(totalItems / itemsPorPagina);
      
        if (paginaActual > 1) {
            $("#paginacion").append(`
                <button class="btn btn-info btn-pagina" data-pagina="${paginaActual - 1}"><i class="fa-solid fa-arrow-left"></i></button>
            `);
        }

     
        $("#paginacion").append(`
            <button class="btn btn-primary btn-pagina" data-pagina="${paginaActual}">${paginaActual}</button>
        `);
        if (paginaActual < totalPaginas - 1) {
            $("#paginacion").append(`
                <button class="btn btn-info btn-pagina" data-pagina="${paginaActual + 1}">${paginaActual + 1}</button>
            `);
        }

        if (paginaActual < totalPaginas) {
            $("#paginacion").append(`
                <button class="btn btn-info btn-pagina" data-pagina="${paginaActual + 1}"><i class="fa-solid fa-arrow-right"></i></button>
            `);
        }
    
        $(".btn-pagina").click(function () {
            paginaActual = $(this).data("pagina");
            listarPersonajes(paginaActual);
            generarPaginacion(totalItems, itemsPorPagina); 
        });
    }
   

    $(function() {
        $(document).on("click", ".link-eliminar", function(event) {
            event.preventDefault();
            var idEliminar = $(this).data("id")
    
            if(confirm("¿Seguro desea eliminar este super héroe?")) {
            
                personajes = response.results;
                const superHeroes = personajes.filter(item => item.id != idEliminar)
    
                listarSuperHeroes(superHeroes)
            }
        })
    });

    $(document).ready(() => {
        cargarDatos();
    });

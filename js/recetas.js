/* ========================================
   ¿QUÉ COCINO HOY?
   FUNCIONALIDAD JAVASCRIPT
======================================== */

/* CATÁLOGO DE RECETAS */

const recetas = [
    {
        id: 1,
        nombre: "Tortilla de patatas",
        emoji: "🍳",
        tiempo: 30,
        ingredientes: ["huevo", "patata", "cebolla", "aceite"],
        preparacion: [
            "Pelar y cortar las patatas y la cebolla.",
            "Freír las patatas y la cebolla en una sartén con aceite.",
            "Batir los huevos y mezclarlos con las patatas.",
            "Cuajar la mezcla en una sartén por ambos lados."
        ]
    },
    {
        id: 2,
        nombre: "Arroz con tomate",
        emoji: "🍅",
        tiempo: 20,
        ingredientes: ["arroz", "tomate", "ajo", "aceite"],
        preparacion: [
            "Cocer el arroz en agua con una pizca de sal.",
            "Picar el ajo y sofreírlo con aceite.",
            "Añadir el tomate y cocinar durante unos minutos.",
            "Mezclar el arroz con la salsa de tomate."
        ]
    },
    {
        id: 3,
        nombre: "Pasta con verduras",
        emoji: "🍝",
        tiempo: 25,
        ingredientes: ["pasta", "tomate", "calabacin", "cebolla", "aceite"],
        preparacion: [
            "Cocer la pasta siguiendo las indicaciones del envase.",
            "Cortar las verduras en trozos pequeños.",
            "Sofreír la cebolla y el calabacín.",
            "Añadir el tomate y mezclar con la pasta."
        ]
    },
    {
        id: 4,
        nombre: "Ensalada mixta",
        emoji: "🥗",
        tiempo: 10,
        ingredientes: ["lechuga", "tomate", "atun", "huevo", "aceite"],
        preparacion: [
            "Lavar y cortar la lechuga y el tomate.",
            "Cocer el huevo y cortarlo en trozos.",
            "Añadir el atún.",
            "Aliñar con aceite y sal."
        ]
    },
    {
        id: 5,
        nombre: "Huevos revueltos",
        emoji: "🍳",
        tiempo: 15,
        ingredientes: ["huevo", "tomate", "cebolla", "aceite"],
        preparacion: [
            "Picar la cebolla y el tomate.",
            "Sofreír las verduras en una sartén.",
            "Batir los huevos y añadirlos.",
            "Remover hasta conseguir la textura deseada."
        ]
    },
    {
        id: 6,
        nombre: "Tostadas con aguacate",
        emoji: "🥑",
        tiempo: 10,
        ingredientes: ["pan", "aguacate", "tomate", "aceite"],
        preparacion: [
            "Tostar las rebanadas de pan.",
            "Pelar y triturar el aguacate.",
            "Untar el aguacate sobre las tostadas.",
            "Añadir tomate y un poco de aceite."
        ]
    },
    {
        id: 7,
        nombre: "Crema de verduras",
        emoji: "🥣",
        tiempo: 35,
        ingredientes: ["calabacin", "zanahoria", "patata", "cebolla", "aceite"],
        preparacion: [
            "Lavar, pelar y cortar las verduras.",
            "Introducirlas en una olla con agua.",
            "Cocer hasta que estén blandas.",
            "Triturar hasta conseguir una crema homogénea."
        ]
    },
    {
        id: 8,
        nombre: "Pollo al ajillo",
        emoji: "🍗",
        tiempo: 30,
        ingredientes: ["pollo", "ajo", "aceite", "limon"],
        preparacion: [
            "Cortar el pollo en trozos.",
            "Dorar los ajos en una sartén con aceite.",
            "Añadir el pollo y cocinar hasta que esté bien hecho.",
            "Añadir un poco de limón y servir."
        ]
    }
];


/* ELEMENTOS HTML */

const campoIngrediente = document.getElementById("ingrediente");
const botonAnadir = document.getElementById("btn-anadir");
const botonBuscar = document.getElementById("btn-buscar");
const botonLimpiar = document.getElementById("btn-limpiar");

const listaIngredientes = document.getElementById("lista-ingredientes");
const listaRecetas = document.getElementById("lista-recetas");
const contadorRecetas = document.getElementById("contador-recetas");


/* VARIABLES */

let ingredientesDisponibles = [];


/* NORMALIZAR INGREDIENTES */

function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}


/* AÑADIR INGREDIENTES */

function anadirIngrediente() {

    const texto = campoIngrediente.value.trim();

    if (!texto) {
        campoIngrediente.focus();
        return;
    }

    // Permitir introducir varios ingredientes separados por comas.
    const nuevosIngredientes = texto
        .split(",")
        .map(ingrediente => ingrediente.trim())
        .filter(ingrediente => ingrediente !== "");

    nuevosIngredientes.forEach(ingrediente => {

        const existe = ingredientesDisponibles.some(
            actual => normalizar(actual) === normalizar(ingrediente)
        );

        if (!existe) {
            ingredientesDisponibles.push(ingrediente);
        }

    });

    campoIngrediente.value = "";

    actualizarIngredientes();

    campoIngrediente.focus();
}


/* MOSTRAR INGREDIENTES */

function actualizarIngredientes() {

    listaIngredientes.innerHTML = "";

    if (ingredientesDisponibles.length === 0) {

        listaIngredientes.innerHTML = `
            <span class="ingredientes__vacio">
                Todavía no has añadido ingredientes.
            </span>
        `;

        return;
    }

    ingredientesDisponibles.forEach((ingrediente, indice) => {

        const etiqueta = document.createElement("span");
        etiqueta.className = "ingrediente";

        const nombre = document.createElement("span");
        nombre.textContent = ingrediente;

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.textContent = "×";
        botonEliminar.setAttribute(
            "aria-label",
            "Eliminar " + ingrediente
        );

        botonEliminar.addEventListener("click", () => {

            ingredientesDisponibles.splice(indice, 1);

            actualizarIngredientes();

        });

        etiqueta.appendChild(nombre);
        etiqueta.appendChild(botonEliminar);

        listaIngredientes.appendChild(etiqueta);

    });
}


/* BUSCAR RECETAS */

function buscarRecetas() {

    if (ingredientesDisponibles.length === 0) {

        listaRecetas.innerHTML = `
            <div class="mensaje-vacio">
                <span>🧺</span>
                <h3>Primero añade ingredientes</h3>
                <p>Necesitamos saber qué tienes en casa para buscar recetas.</p>
            </div>
        `;

        contadorRecetas.textContent = "";

        return;
    }

    const ingredientesNormalizados = ingredientesDisponibles.map(
        normalizar
    );

    const resultados = recetas.map(receta => {

        const coincidencias = receta.ingredientes.filter(
            ingrediente => ingredientesNormalizados.includes(
                normalizar(ingrediente)
            )
        );

        const faltantes = receta.ingredientes.filter(
            ingrediente => !ingredientesNormalizados.includes(
                normalizar(ingrediente)
            )
        );

        return {
            ...receta,
            coincidencias: coincidencias.length,
            faltantes: faltantes
        };

    })
    .filter(receta => receta.coincidencias > 0)
    .sort((a, b) => {

        // Primero las recetas con más ingredientes coincidentes.
        if (b.coincidencias !== a.coincidencias) {
            return b.coincidencias - a.coincidencias;
        }

        // En caso de empate, las que necesiten menos ingredientes.
        return a.faltantes.length - b.faltantes.length;

    });

    mostrarRecetas(resultados);

}


/* MOSTRAR RESULTADOS */

function mostrarRecetas(resultados) {

    listaRecetas.innerHTML = "";

    contadorRecetas.textContent =
        resultados.length + (resultados.length === 1
            ? " receta encontrada"
            : " recetas encontradas");

    if (resultados.length === 0) {

        listaRecetas.innerHTML = `
            <div class="mensaje-vacio">
                <span>🔎</span>
                <h3>No hemos encontrado recetas</h3>
                <p>
                    Ninguna receta de nuestro catálogo coincide
                    con los ingredientes introducidos.
                    Prueba con otros ingredientes.
                </p>
            </div>
        `;

        return;
    }

    resultados.forEach(receta => {

        const ingredientesFaltantes = receta.faltantes.length > 0
            ? receta.faltantes.join(", ")
            : "¡Tienes todos los ingredientes!";

        const estado = receta.faltantes.length === 0
            ? "estado-disponible"
            : "estado-faltante";

        const textoEstado = receta.faltantes.length === 0
            ? "Puedes preparar esta receta"
            : "Te faltan " + receta.faltantes.length + " ingredientes";

        const ingredientesHTML = receta.ingredientes.map(ingrediente => {

            const disponible = ingredientesNormalizadosGlobal()
                .includes(normalizar(ingrediente));

            return `
                <li class="${disponible ? "estado-disponible" : "estado-faltante"}">
                    ${disponible ? "✓" : "✗"} ${ingrediente}
                </li>
            `;

        }).join("");

        const pasosHTML = receta.preparacion.map(paso => `
            <li>${paso}</li>
        `).join("");

        const tarjeta = document.createElement("article");

        tarjeta.className = "tarjeta-receta";

        tarjeta.innerHTML = `
            <div class="tarjeta-receta__cabecera">
                ${receta.emoji}
            </div>

            <div class="tarjeta-receta__contenido">

                <h3>${receta.nombre}</h3>

                <p class="tarjeta-receta__tiempo">
                    ⏱ ${receta.tiempo} minutos
                </p>

                <span class="tarjeta-receta__coincidencia">
                    ${receta.coincidencias} de ${receta.ingredientes.length}
                    ingredientes disponibles
                </span>

                <p class="${estado} tarjeta-receta__ingredientes">
                    <strong>${textoEstado}</strong>
                    ${ingredientesFaltantes === "¡Tienes todos los ingredientes!"
                        ? ingredientesFaltantes
                        : "Te faltan: " + ingredientesFaltantes}
                </p>

                <button type="button" class="boton-detalle">
                    Ver preparación
                </button>

                <div class="detalle-receta">

                    <h4>Ingredientes necesarios</h4>

                    <ul class="tarjeta-receta__ingredientes">
                        ${ingredientesHTML}
                    </ul>

                    <h4>Preparación</h4>

                    <ol>
                        ${pasosHTML}
                    </ol>

                </div>

            </div>
        `;

        const botonDetalle = tarjeta.querySelector(".boton-detalle");
        const detalle = tarjeta.querySelector(".detalle-receta");

        botonDetalle.addEventListener("click", () => {

            detalle.classList.toggle("visible");

            botonDetalle.textContent = detalle.classList.contains("visible")
                ? "Ocultar preparación"
                : "Ver preparación";

        });

        listaRecetas.appendChild(tarjeta);

    });

}


/* OBTENER INGREDIENTES DISPONIBLES NORMALIZADOS */

function ingredientesNormalizadosGlobal() {

    return ingredientesDisponibles.map(normalizar);

}


/* LIMPIAR BÚSQUEDA */

function limpiarBusqueda() {

    ingredientesDisponibles = [];

    campoIngrediente.value = "";

    actualizarIngredientes();

    listaRecetas.innerHTML = `
        <div class="mensaje-inicial">
            <span>🥕</span>
            <h3>¡Empecemos a cocinar!</h3>
            <p>
                Añade algunos ingredientes y descubre
                qué puedes preparar con ellos.
            </p>
        </div>
    `;

    contadorRecetas.textContent = "";

}


/* EVENTOS */

botonAnadir.addEventListener("click", anadirIngrediente);

botonBuscar.addEventListener("click", buscarRecetas);

botonLimpiar.addEventListener("click", limpiarBusqueda);

campoIngrediente.addEventListener("keydown", evento => {

    if (evento.key === "Enter") {
        anadirIngrediente();
    }

});


/* INICIALIZACIÓN */

actualizarIngredientes();
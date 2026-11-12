// CLASE ROLLO AUDITADO
class RolloAuditado {
    constructor(idRollo, mtsTotales, mtsDefecto) {
        this.idRollo = idRollo;
        this.mtsTotales = parseFloat(mtsTotales);
        this.mtsDefecto = parseFloat(mtsDefecto);
        this.porcentaje = (this.mtsDefecto / this.mtsTotales) * 100;
    }
}

// CARGAR DEL DOM LOS INPUTS Y ELEMENTOS
const idRolloInput = document.getElementById("idRollo");
const mtsTotalesInput = document.getElementById("mtsTotales");
const mtsDefectoInput = document.getElementById("mtsDefecto");
const btnAuditar = document.getElementById("btnAuditar");
const tabla = document.getElementById("tablaMermas");

// CARGAR DATOS AL INICIAR
document.addEventListener("DOMContentLoaded", cargarRollos);

function cargarRollos() {
    mostrarRollos();
}

// FUNCION AGREGAR NUEVAS AUDITORIAS
btnAuditar.addEventListener("click", agregarRollo);

function agregarRollo() {
    const idRollo = idRolloInput.value.trim();
    const mtsTotales = parseFloat(mtsTotalesInput.value);
    const mtsDefecto = parseFloat(mtsDefectoInput.value);

    // VALIDACION DE QUE NO HAYA CAMPOS VACIOS 
    if (idRollo === "" || isNaN(mtsTotales) || isNaN(mtsDefecto)) {
        return alert("Escribe todos los datos primero");
    }

    //VALIDAR LOS METROS CON DEFECTOS
    if (mtsDefecto > mtsTotales) {
        return alert("Los metros con defecto no pueden ser mayores a los metros totales"); //[cite: 1]
    }

    //CREAR EL OBJETO Y GUARDARLO
    const nuevoRollo = new RolloAuditado(idRollo, mtsTotales, mtsDefecto); //[cite: 1]
    const rollos = obtenerRollos();
    
    rollos.push(nuevoRollo);
    localStorage.setItem("rollos", JSON.stringify(rollos)); 

    mostrarRollos();
    idRolloInput.value = "";
    mtsTotalesInput.value = "";
    mtsDefectoInput.value = "";
}

// FUNCION MOSTRAR LOS DATOS EN EL DOM
function mostrarRollos() {
    const rollos = obtenerRollos();
    tabla.innerHTML = "";
    
    rollos.forEach((rollo) => {
        const tr = document.createElement("tr");
        
        tr.innerHTML = `
            <td>${rollo.idRollo}</td>
            <td>${rollo.mtsTotales}</td>
            <td>${rollo.porcentaje.toFixed(2)}%</td>
            <td>Auditado</td>
        `;
        
        tabla.appendChild(tr); 
    });
}

// FUNCION OBTENER LOS DATOS DE LOCALSTORAGE
function obtenerRollos() {
    return JSON.parse(localStorage.getItem("rollos")) || []; 
}

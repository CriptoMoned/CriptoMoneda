document.addEventListener("DOMContentLoaded", function () {
    actualizarHistorial();

    // Escuchar cambios en el localStorage
    window.addEventListener("storage", function(event) {
        if (event.key === "historialDepositos") {
            actualizarHistorial();
        }
    });
});

function actualizarHistorial() {
    // Obtener el historial de depósitos del localStorage
    let historial = JSON.parse(localStorage.getItem("historialDepositos")) || [];

    // Obtener la referencia al elemento de la lista en el HTML
    const listaHistorial = document.getElementById("historial-depositos");

    // Limpiar la lista antes de agregar nuevos elementos
    listaHistorial.innerHTML = "";

    // Iterar sobre el historial y agregar cada depósito a la lista
    historial.forEach(deposito => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span class="ganancia">+${deposito.monto} USDT</span>
            <span class="fecha">${deposito.fecha}</span>
        `;
        listaHistorial.appendChild(listItem);
    });
}
document.addEventListener("DOMContentLoaded", function() {
    const historial = JSON.parse(localStorage.getItem("historialDepositos")) || [];
    const historialList = document.getElementById("historial-depositos");


});


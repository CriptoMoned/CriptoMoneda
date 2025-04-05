document.addEventListener("DOMContentLoaded", function () {
    actualizarSaldoEnPantalla(); // Actualizar saldo al cargar la página
    verificarDepositoPendiente(); // Verificar depósitos pendientes
    mostrarMensajeRecarga(); // Mostrar mensaje si hay uno pendiente
});

// 🔹 Verificar depósitos cada 3 segundos
function verificarDepositoPendiente() {
    const depositoPendiente = JSON.parse(localStorage.getItem("depositoPendiente"));

    if (depositoPendiente) {
        const tiempoRestante = depositoPendiente.tiempoFinal - Date.now();

        if (tiempoRestante <= 0) {
            completarDeposito(depositoPendiente.monto);
        }
    }
}

// Ejecutar la verificación automáticamente cada 3 segundos
setInterval(verificarDepositoPendiente, 3000);

// 🔹 Función para completar el depósito
function completarDeposito(monto) {
    let fondos = parseFloat(localStorage.getItem("fondos")) || 0;
    fondos += monto;
    localStorage.setItem("fondos", fondos.toFixed(2));

    // Guardar mensaje para mostrarlo en cualquier página
    localStorage.setItem("mensajeRecarga", `Se ha confirmado el depósito de ${monto} USDT.`);

    // 🔹 Añadir el depósito al historial
    añadirDepositoAlHistorial(monto);

    // Eliminar el depósito pendiente
    localStorage.removeItem("depositoPendiente");

    // Actualizar saldo en pantalla si el usuario está en la página de "Cuenta"
    actualizarSaldoEnPantalla();
    mostrarMensajeRecarga();
}

// 🔹 Función para añadir el depósito al historial
function añadirDepositoAlHistorial(monto) {
    const historial = JSON.parse(localStorage.getItem("historialDepositos")) || [];
    const fecha = new Date().toLocaleString();
    historial.push({ monto, fecha });
    localStorage.setItem("historialDepositos", JSON.stringify(historial));

    // Actualizar historial en pantalla si el usuario está en la página correcta
    actualizarHistorialEnPantalla();
}

// 🔹 Función para actualizar el saldo en pantalla en tiempo real
function actualizarSaldoEnPantalla() {
    const saldoElemento = document.getElementById("fondos");
    if (saldoElemento) {
        let fondos = parseFloat(localStorage.getItem("fondos")) || 0;
        saldoElemento.textContent = fondos.toFixed(2);
    }
}

// 🔹 Función para mostrar el mensaje de recarga sin recargar la página
function mostrarMensajeRecarga() {
    const mensaje = localStorage.getItem("mensajeRecarga");

    if (mensaje) {
        alert(mensaje); // Puedes cambiarlo por un mensaje visual en la página
        localStorage.removeItem("mensajeRecarga");
    }
}

// 🔹 Función para actualizar el historial en pantalla sin recargar
function actualizarHistorialEnPantalla() {
    const historialElemento = document.getElementById("historialDepositos");
    
    if (historialElemento) {
        historialElemento.innerHTML = ""; // Limpiar la lista antes de actualizar
        const historial = JSON.parse(localStorage.getItem("historialDepositos")) || [];

        historial.forEach(deposito => {
            const item = document.createElement("li");
            item.textContent = `Depósito: ${deposito.monto} USDT - Fecha: ${deposito.fecha}`;
            historialElemento.appendChild(item);
        });
    }
}

// Actualizar historial al cargar la página
document.addEventListener("DOMContentLoaded", actualizarHistorialEnPantalla);

function confirmarDeposito() {
    const monto = parseFloat(document.getElementById("monto").value);
    const comprobante = document.getElementById("comprobante").files[0];
    const usuario = document.getElementById("usuario").value.trim();

    if (comprobante) {
        const retraso = Math.floor(Math.random() * (180000 - 60000 + 1)) + 60000; // Entre 1 y 3 minutos
        const tiempoFinal = Date.now() + retraso;

        // Guardar el estado del depósito en localStorage
        localStorage.setItem("depositoPendiente", JSON.stringify({ monto, tiempoFinal }));

        alert(`El depósito de ${monto} USDT está siendo procesado. Esto puede tomar entre 1 y 3 minutos.`);

        return true;
    } else {
        alert("Por favor, sube un comprobante del depósito.");
        return false;
    }

function copiarTexto() {
    var texto = document.getElementById("direccionBinance");  // Obtener el input
    texto.select();  // Seleccionar el contenido
    texto.setSelectionRange(0, 99999);  // Para dispositivos móviles

    try {
        document.execCommand("copy");  // Intentar copiar al portapapeles
        alert("Texto copiado: " + texto.value);  // Opcional: Mostrar un mensaje al usuario
    } catch (err) {
        console.error("No se pudo copiar el texto: ", err);  // Manejo de errores
    }
}



function completarDeposito(monto) {
    let fondos = parseFloat(localStorage.getItem("fondos")) || 0;
    fondos += monto;
    localStorage.setItem("fondos", fondos.toFixed(2));

    // Guardar mensaje para mostrarlo en cualquier página
    localStorage.setItem("mensajeRecarga", `Se ha confirmado el depósito de ${monto} USDT.`);

    // Registrar el depósito en el historial automáticamente
    añadirDepositoAlHistorial(monto);

    // Eliminar el estado del depósito pendiente
    localStorage.removeItem("depositoPendiente");

    // Actualizar interfaz si el usuario está en la página de Cuenta
    actualizarSaldoEnPantalla();
    mostrarMensajeRecarga();
}

function añadirDepositoAlHistorial(monto) {
    const historial = JSON.parse(localStorage.getItem("historialDepositos")) || [];
    const fecha = new Date().toLocaleString();
    historial.push({ monto, fecha });
    localStorage.setItem("historialDepositos", JSON.stringify(historial));
}

// 🔹 Verificar cada 5 segundos si el depósito ya debe completarse
function verificarDepositoPendiente() {
    const depositoPendiente = JSON.parse(localStorage.getItem("depositoPendiente"));

    if (depositoPendiente) {
        const tiempoRestante = depositoPendiente.tiempoFinal - Date.now();

        if (tiempoRestante <= 0) {
            completarDeposito(depositoPendiente.monto);
        }
    }
}

// Ejecutar la verificación cada 5 segundos en TODAS las páginas
setInterval(verificarDepositoPendiente, 5000);

// También ejecutar al cargar la página
window.addEventListener("load", verificarDepositoPendiente);

// 🔹 Función para mostrar el mensaje de confirmación en cualquier página
function mostrarMensajeRecarga() {
    const mensaje = localStorage.getItem("mensajeRecarga");

    if (mensaje) {
        alert(mensaje); // Puedes cambiarlo por una notificación en la interfaz
        localStorage.removeItem("mensajeRecarga");
    }
}

// 🔹 Función para actualizar el saldo en pantalla sin recargar
function actualizarSaldoEnPantalla() {
    const saldoElemento = document.getElementById("saldo"); // Asegúrate de tener un elemento con ID "saldo"
    if (saldoElemento) {
        const fondos = parseFloat(localStorage.getItem("fondos")) || 0;
        saldoElemento.textContent = `Saldo: ${fondos.toFixed(2)} USDT`;
    }
}

// Mostrar mensaje en la página de "Cuenta" si hay uno pendiente
window.addEventListener("load", mostrarMensajeRecarga);

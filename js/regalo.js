const balanceEl = document.getElementById("balance");
const mensajeEl = document.getElementById("mensaje");
const monedasDiv = document.getElementById("monedas");

let balance = localStorage.getItem("balance") ? parseInt(localStorage.getItem("balance")) : 0;
let ultimaFecha = localStorage.getItem("ultimaFecha");
let hoy = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

if (ultimaFecha === hoy) {
    mensajeEl.textContent = "Ya abriste un regalo hoy. ¡Vuelve mañana!";
    let regalos = document.querySelectorAll(".regalo");
    regalos.forEach(regalo => regalo.onclick = null); // Elimina el evento click
}

balanceEl.textContent = balance;

function abrirRegalo(index) {
    if (ultimaFecha === hoy) {
        mensajeEl.textContent = "Solo puedes abrir un regalo por día.";
        return;
    }

    let premios = [1, 2, 3, 4, 5];
    let premio = premios[Math.floor(Math.random() * premios.length)];

    balance += premio;
    balanceEl.textContent = balance;
    localStorage.setItem("balance", balance);
    localStorage.setItem("ultimaFecha", hoy);

    let regalos = document.querySelectorAll(".regalo");
    regalos.forEach(regalo => regalo.onclick = null); // Deshabilitar todos los regalos después de abrir uno
    regalos[index].classList.add("abierto");
    regalos[index].textContent = `${premio} USDT`;

    mensajeEl.textContent = `¡Felicidades! Has ganado ${premio} USDT. Vuelve mañana para abrir otro regalo.`;
    soltarMonedas(10);
}

function transferirFondos() {
    let balance = parseInt(localStorage.getItem("balance")) || 0;
    let fondos = parseInt(localStorage.getItem("fondos")) || 0;
    let paquetesActivos = JSON.parse(localStorage.getItem("paquetes")) || [];

    // Verifica si hay al menos un paquete premium comprado
    if (paquetesActivos.length === 0) {
        alert("Debes comprar un paquete premium antes de poder transferir fondos.");
        return;
    }

    if (balance > 0) {
        fondos += balance;
        localStorage.setItem("fondos", fondos);
        localStorage.setItem("balance", 0);
        balanceEl.textContent = 0;
        alert(`Se han transferido ${balance} USDT a tu cuenta de fondos.`);

        // Registrar la transferencia
        let transferencias = JSON.parse(localStorage.getItem('transferencias')) || [];
        let fechaTransferencia = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
        transferencias.push({
            fecha: fechaTransferencia,
            monto: balance
        });
        localStorage.setItem('transferencias', JSON.stringify(transferencias));

    } else {
        alert("No tienes saldo para transferir.");
    }
}

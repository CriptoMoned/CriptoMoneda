window.onload = function() {
    const registroBody = document.getElementById('registroBody');
    let transferencias = JSON.parse(localStorage.getItem('transferencias')) || [];

    // Si no hay transferencias, muestra un mensaje
    if (transferencias.length === 0) {
        const mensaje = document.createElement('tr');
        mensaje.innerHTML = `<td colspan="2">No se han realizado transferencias aún.</td>`;
        registroBody.appendChild(mensaje);
    } else {
        transferencias.forEach((transferencia) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transferencia.fecha}</td>
                <td>${transferencia.monto} USDT</td>
            `;
            registroBody.appendChild(row);
        });
    }
};

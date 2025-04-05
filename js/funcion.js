let currentIndex = 0;
const images = document.querySelectorAll('.carousel img');
const totalImages = images.length;

function showNextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    const offset = -currentIndex * (100 / totalImages);
    document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
}

setInterval(showNextImage, 4000);

function copiarDireccion() {
    const direccion = document.getElementById("direccionBinance").value;
  
    navigator.clipboard.writeText(direccion)
      .then(() => {
        alert("Dirección copiada al portapapeles");
      })
      .catch(err => {
        console.error("Error al copiar: ", err);
        alert("No se pudo copiar. Copia manualmente.");
      });
}


// Generar una dirección aleatoria simulada
function generateRandomAddress() {
  const chars = "0123456789abcdef";
  let address = "0x";
  for (let i = 0; i < 40; i++) {
      address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address.slice(0, 4) + "*" + address.slice(-4);
}

// Generar un monto aleatorio entre 100 y 500 USDT
function generateRandomAmount() {
  return (Math.random() * (500 - 13) + 13).toFixed(2);
}

// Agregar una nueva transacción a la tabla
function addNewTransaction() {
  const table = document.getElementById("withdrawTable");
  const row = document.createElement("tr");
  row.classList.add("new-row");

  const address = generateRandomAddress();
  const amount = generateRandomAmount();

  row.innerHTML = `
      <td>${address}</td>
      <td>${amount}</td>
  `;

  table.prepend(row); // Agrega la fila al inicio

// Obtener todas las filas y eliminar la última si hay más de 4
const rows = table.getElementsByTagName("tr");
if (rows.length > 4) {
   table.removeChild(rows[rows.length - 1]);
}
}
// Llamar a addNewTransaction para que la primera transacción aparezca de inmediato
addNewTransaction();

// Generar una nueva transacción cada 3 segundos
setInterval(addNewTransaction, 10000);

 // Verificar si el usuario está autenticado
 if (localStorage.getItem('loggedIn') !== 'true') {
  alert('Debes iniciar sesión para acceder a esta página.');
  window.location.href = 'pagina.html'; // Redirigir al inicio de sesión
}

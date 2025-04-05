document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const telefono = document.getElementById('telefono').value;
    const password = document.getElementById('password').value;
    
    // Verificar si el número de teléfono está registrado
    const storedPassword = localStorage.getItem(telefono);
    
    if (!storedPassword) {
        document.getElementById('message').innerText = 'Número de teléfono no registrado.';
        return;
    }
    
    // Verificar la contraseña
    if (storedPassword !== password) {
        document.getElementById('message').innerText = 'Contraseña incorrecta.';
        return;
    }
    
    // Almacenar el estado de inicio de sesión
    localStorage.setItem('loggedIn', 'true');
    window.location.href = 'pagina.html'; // Redirigir a la página principal
});

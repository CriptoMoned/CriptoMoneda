document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const telefono = document.getElementById('telefono').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    
    // Verificar si las contraseñas coinciden
    if (password !== passwordConfirm) {
        document.getElementById('message').innerText = 'Las contraseñas no coinciden.';
        return;
    }
    
    // Verifica si el número de teléfono ya existe
    if (localStorage.getItem(telefono)) {
        document.getElementById('message').innerText = 'El número de teléfono ya está registrado.';
        return;
    }
    
    // Guardar nuevo usuario
    localStorage.setItem(telefono, password);
    document.getElementById('message').innerText = 'Cuenta creada exitosamente. ¡Inicia sesión!';
    
    // Opcional: redirigir a la página de inicio de sesión
    // window.location.href = 'index.html';
});

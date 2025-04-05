// auth.js - Verificación de autenticación global
document.addEventListener("DOMContentLoaded", function() {
    const publicPages = ['index.html', 'crear_usuario.html']; // Páginas accesibles sin login
    
    if (!publicPages.includes(window.location.pathname.split('/').pop())) {
        if (localStorage.getItem('loggedIn') !== 'true') {
            alert('Acceso denegado. Redirigiendo al login...');
            localStorage.setItem('redirectUrl', window.location.href); // Guarda la URL actual
            window.location.href = 'index.html';
        }
    }
});

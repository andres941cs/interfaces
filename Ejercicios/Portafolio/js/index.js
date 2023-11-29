const menuItems = document.querySelectorAll('.texto-menu');
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    console.log('dfs')
    // Elimina la clase 'selected' de todos los elementos del menú
    menuItems.forEach(item => item.classList.remove('selected'));
    
    // Agrega la clase 'selected' solo al elemento clicado
    item.classList.add('selected');
  });
});
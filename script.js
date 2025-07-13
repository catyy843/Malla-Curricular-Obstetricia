// Función para limpiar texto y comparar
function limpiarTexto(texto) {
  return texto.trim().toLowerCase();
}

function desbloquearMaterias() {
  // Escuchar clicks en todas las materias activas
  document.querySelectorAll('li.activa').forEach(li => {
    li.addEventListener('click', () => {
      const abreRaw = li.dataset.abre;
      if (!abreRaw) return;

      // Lista materias que desbloquea
      const materiasQueAbre = abreRaw.split(';').map(s => limpiarTexto(s));

      materiasQueAbre.forEach(nombreMateria => {
        document.querySelectorAll('li').forEach(mat => {
          if (limpiarTexto(mat.dataset.nombre) === nombreMateria) {
            if (mat.classList.contains('bloqueada')) {
              mat.classList.remove('bloqueada');
              mat.classList.add('activa');
              // Para que también pueda desbloquear a su vez
              mat.addEventListener('click', () => {
                mat.click();
              }, { once: true });
            }
          }
        });
      });
    }, { once: true }); // Evita múltiples eventos para el mismo li
  });
}

// Llamar al cargar
desbloquearMaterias();

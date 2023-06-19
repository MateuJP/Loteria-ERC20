const ganador=require('./ganador.js');
function executeScript() {
    // Coloca aquí el código o la función que deseas ejecutar cada día a las 10:00
    ganador();
  }
  
  function scheduleScriptExecution() {
    // Calcula el tiempo restante hasta las 22:00 d
    const now = new Date();
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 0, 0);
    let timeRemaining = targetTime - now;
  
    // Si el tiempo restante es negativo, suma un día completo (24 horas)
    if (timeRemaining < 0) {
      timeRemaining += 24 * 60 * 60 * 1000; // 24 horas en milisegundos
    }
  
    // Establece el intervalo para ejecutar el script después de que haya pasado el tiempo restante
    setTimeout(function() {
      executeScript();
  
      // Configura un intervalo diario para ejecutar el script a las 10:00 cada día
      setInterval(executeScript, 24 * 60 * 60 * 1000); // 24 horas en milisegundos
    }, timeRemaining);
  }
  
  // Inicia la programación de la ejecución del script
  scheduleScriptExecution();
  
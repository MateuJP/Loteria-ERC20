import React, { Component } from 'react';
import '../css/cronometro.css';

class Cronometro extends Component {
  constructor(props) {
    super(props);

    const start = new Date(); // Obtener la fecha y hora actual

    // Comprobar si hay un tiempo de inicio guardado en el almacenamiento local
    const storedStart = localStorage.getItem('cronometro_start');
    if (storedStart) {
      this.startTime = new Date(storedStart); // Utilizar el tiempo de inicio guardado
    } else {
      // Si no hay tiempo de inicio guardado, establecerlo en la hora de inicio deseada (22:00)
      this.startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 22);
      if (start.getHours() >= 22) {
        // Si la hora actual es igual o posterior a las 22:00, incrementar la fecha en 1 día
        this.startTime.setDate(this.startTime.getDate() + 1);
      }
      localStorage.setItem('cronometro_start', this.startTime.getTime()); // Guardar el tiempo de inicio en el almacenamiento local
    }

    this.state = {
      tiempoTranscurrido: this.calcularTiempoTranscurrido()
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        tiempoTranscurrido: this.calcularTiempoTranscurrido()
      });
     
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  calcularTiempoTranscurrido() {
    const now = new Date();
    let diff = this.startTime.getTime() - now.getTime();

    // Si ha pasado más de 24 horas, reiniciar el contador sumando 24 horas al tiempo restante
    if (diff < 0) {
      this.startTime.setDate(this.startTime.getDate() + 1);
      diff = this.startTime.getTime() - now.getTime();
    }

    let horas = Math.floor(diff / (1000 * 60 * 60));
    let minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let segundos = Math.floor((diff % (1000 * 60)) / 1000);

    return { horas, minutos, segundos };
  }

  render() {
   
    const { horas, minutos, segundos } = this.state.tiempoTranscurrido;

    return (
      <div className="cronometro-container">
        <h2 className="display-4 text-danger" style={{ marginBottom: '1rem' }}>
          ¡Próximo Sorteo en!
        </h2>

        <div className="countdown">
          <div className="countdownContainer">
            <div className="time-container">
              <div className="unit">
                <div className="value">{horas.toString().padStart(2, '0')}:</div>
                <div className="label">Horas</div>
              </div>
              <div className="unit">
                <div className="value">{minutos.toString().padStart(2, '0')}:</div>
                <div className="label">Minutos</div>
              </div>
              <div className="unit">
                <div className="value">{segundos.toString().padStart(2, '0')}</div>
                <div className="label">Segundos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cronometro;

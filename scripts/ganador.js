const Loteria = artifacts.require('loteria');
module.exports = async function (callBack) {

    const loteria = await Loteria.deployed();


    await loteria.generarGanador();
    console.log('Ganador Generado');


    // Espera a que otra función se haya ejectuado
    callBack();

}
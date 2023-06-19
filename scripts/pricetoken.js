const Loteria = artifacts.require('loteria');
const axios = require('axios');
const web3= require('web3');
module.exports = async function(callBack) {
    const precioEuros=5; // 5€
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur');
    const valorEtherEnEuros = response.data.ethereum.eur;
    console.log(`El Precio del Ether es ${valorEtherEnEuros}`);
    const cantidadEther = (precioEuros / valorEtherEnEuros).toFixed(18);
    const loteria = await Loteria.deployed();

  // Convertir la cantidad de ether a wei
  const precioWei = web3.utils.toWei(cantidadEther.toString(), 'ether');
  console.log(`Nuevo Precio en Wei ${precioWei}`);

  // Llamar a la función modifyPrice en el contrato loteria
  await loteria.modifyPrice(precioWei);

  console.log(`Precio cambiado a ${cantidadEther}`);
  
  // Obtener el nuevo precio del contrato loteria
  const nuevoPrecio = await loteria.verPrecio();
  
  console.log(`Nuevo precio en ether: ${web3.utils.fromWei(nuevoPrecio, 'ether')}`);
  
    // Espera a que otra función se haya ejectuado
    callBack();

}
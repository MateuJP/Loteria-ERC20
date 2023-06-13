const Loteria = artifacts.require('loteria');
const axios = require('axios');
const web3 = require('web3');
module.exports = async function (callBack) {
    const precioEuros=0.5; // 5€
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur');
    const valorEtherEnEuros = response.data.ethereum.eur;
    console.log(`El Precio del Ether es ${valorEtherEnEuros}`);
    const cantidadEther = precioEuros / valorEtherEnEuros;
    console.log(`El Precio de tus tokens deberia ser de ${cantidadEther*10} ether`)

    const loteria = await Loteria.deployed();
    const precioReal=await loteria.verPrecio();

    console.log(`El Precio de tus tokens es de ${web3.utils.fromWei(precioReal, 'ether')} ethers`)

    const precio = await loteria.precioTokens(3);
    console.log(`Precio de 3 tokens en: ${web3.utils.fromWei(precio, 'ether')}`);
    console.log(`Precio de 3 tokens en euro ${(valorEtherEnEuros*precio) /100}`)


    // Espera a que otra función se haya ejectuado
    callBack();

}
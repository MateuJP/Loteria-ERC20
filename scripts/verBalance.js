const Loteria = artifacts.require('loteria');
const web3 = require('web3');
module.exports = async function (callBack) {

    const loteria = await Loteria.deployed();
    const balance = await loteria.boteEtherSC();
    console.log(`El Balance es de ${balance/10**18} ethers`)


    // Espera a que otra función se haya ejectuado
    callBack();

}
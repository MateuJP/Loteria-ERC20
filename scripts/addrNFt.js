const Loteria = artifacts.require('loteria');
const web3 = require('web3');
module.exports = async function (callBack) {

    const loteria = await Loteria.deployed();


    const nft = await loteria.nft();
    console.log(`nft ${nft}`);


    // Espera a que otra función se haya ejectuado
    callBack();

}
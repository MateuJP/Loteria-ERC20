import React, { Component } from 'react';
import smart_contract from '../abis/loteria.json';
import Web3, { eth } from 'web3';
import Swal from 'sweetalert2';
import '../css/bote.css';

class Bote extends Component {

  async componentDidMount() {
    // 1. Carga de Web3
    await this.loadWeb3()
    // 2. Carga de datos de la Blockchain
    await this.loadBlockchainData()

  }

  // 1. Carga de Web3
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Accounts: ', accounts)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('¡Deberías considerar usar Metamask!')
    }
  }

  // 2. Carga de datos de la Blockchain
  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Ganache -> 5777, Rinkeby -> 4, BSC -> 97
    const networkId = await web3.eth.net.getId() 
    console.log('networkid:', networkId)
    const networkData = smart_contract.networks[networkId]
    console.log('NetworkData:', networkData)

    if (networkData) {
      const abi = smart_contract.abi
      console.log('abi', abi)
      const address = networkData.address
      console.log('address:', address)
      const contract = new web3.eth.Contract(abi, address)
      if(contract){
        this.setState({ contract })
        console.log('Balance de Ethers Smart Contract en ejecucion');
        const _balanceEthersSC=await contract.methods.boteEtherSC().call();
        console.log(`El SC tienen ${_balanceEthersSC} Ethers`)
        const BigNumber = require('bignumber.js');
        let bote = new BigNumber(_balanceEthersSC).div(10 ** 18);
        this.setState({bote : bote.toString()});
        this.setState({loading:false});

        
      }
    } else {
      window.alert('¡El Smart Contract no se ha desplegado en la red!')
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      moneda : 'ether',
      account: '0x0',
      loading: true,
      contract :null,
      errorMessage : "",
      bote : '0'
    }
  }

  _balanceTokens=async()=>{
    try{
      console.log("Balance de tokens en ejecución");
      const _balance = await this.state.contract.methods.numBoletosUser(this.state.account).call();

      Swal.fire({
        icon: 'info',
        title: 'Numero de Participaciones: ',
        width: 800,
        padding : '3em',
        text: `¡¡¡Tines ${_balance} paricipaciones, Suerte!!!`,
        backdrop : `
          rgba(15,238,168,0.2)
          left top
          no-repeat
        `
      });

    }catch(err){
      this.setState({errorMessage : err});
    }finally{
      this.setState({loading:false});
    }
  }


  render() {
    const { bote, loading, moneda } = this.state;
    return (
      <div>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div id="bote-container">
            <h2 className="bote-title">¡Gran Bote Acumulado!</h2>
            <div className="bote-amount">
              <p>{bote} {moneda}</p>
            </div>
            <button onClick={this._balanceTokens} className="check-balance-button">
              Verificar tu Balance
            </button>
          </div>
        )}
      </div>
    );
  }
  
}

export default Bote;

import React, { Component } from 'react';
import smart_contract from '../abis/loteria.json';
import Web3, { eth } from 'web3';
import '../css/ganador.css'
class Ganador extends Component {

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
      console.log(contract);
      if(contract){
        this.setState({ contract })
        const _ganador=await contract.methods.ganador().call();

        this.setState({ganador: _ganador})
        this.setState({loading : false})


      }
    } else {
      window.alert('¡El Smart Contract no se ha desplegado en la red!')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      loading: true,
      contract: null,
      errorMessage: "",
      ganador: '0x0'
    }
  }

  render() {
    const { ganador, loading } = this.state;
    return (
      <div>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div id="ganador-container">
            <h2 className="ganador-title">¡Enhorabuena!</h2>
            <div className="ganador-amount">
              <p>{ganador}</p>
            </div>
           
          </div>
        )}
      </div>
    );
  }
}

export default Ganador;

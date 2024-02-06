import React, { Component } from 'react';
import smart_contract from '../abis/loteria.json';
import Web3, { eth } from 'web3';
import '../css/boletos.css'
import Navigation from './Navbar';
import MyCarousel from './Carousel';
class Boletos extends Component {

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
      if (contract) {
        this.setState({ contract })
        console.log("Visualización de tus boletos en ejecución");
        const _bloetos = await contract.methods.tusBoletos(this.state.account).call();
        console.log(_bloetos);
        this.setState({ boletos: _bloetos });
        this.setState({ loading: false });
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
      boletos: []
    }
  }



  render() {
    const { loading, boletos } = this.state;

    if (loading) {
      return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los boletos
    }

    return (
      <div>
        <Navigation account={this.state.account} />
        <div className='body-boletos'>
          <h1 className="title">Tus Boletos</h1>
          <div className="boletos-container">
            {boletos.length > 0 ? (
              boletos.map((boleto, index) => (
                <div key={index} className="boleto">
                  <div className="numero">{boleto.toString()}</div>
                </div>
              ))
            ) : (
              <div>No se encontraron boletos</div>
            )}
          </div>

        </div>

      </div>
    );
  }
}
export default Boletos;

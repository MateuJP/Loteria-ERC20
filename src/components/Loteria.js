import React, { Component } from 'react';
import smart_contract from '../abis/loteria.json';
import Web3, { eth } from 'web3';
import Swal from 'sweetalert2';
import '../css/loteria.css'
import Navigation from './Navbar';
import MyCarousel from './Carousel';
import {Link} from 'react-router-dom';
import Footer from './Footer';

class Loteria extends Component {

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
      this.setState({ contract })
      this.setState({addressToken : address.toString()});
      const addresNFT = await contract.methods.nft().call();
      this.setState({addressNFT : addresNFT.toString()});
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
      addressToken : '0x0',
      addressNFT : '0x0'
    }
  }

  _compraBoletos = async (_numBoletos) => {
    try {
      console.log('Compra de Boletos en curso');
      await this.state.contract.methods.compraBoleto(_numBoletos).send({
        from: this.state.account
      });

      Swal.fire({
        icon: 'info',
        title: 'Compra de boletos completada, ¡mucha suerte! ',
        width: 800,
        padding: '3em',
        text: `Has comprado ${_numBoletos} boletos`,
        backdrop: `
          rgba(15,238,168,0.2)
          left top
          no-repeat
        `
      });


    } catch (err) {
      this.setState({ errorMessage: err })
    } finally {
      this.setState({ loading: false })
    }
  }
  _precioBoleto = async () => {
    try {
      console.log("Calculando Precio del Boleto");
      const _precio = await this.state.contract.methods.precioBoleto().call();
      Swal.fire({
        icon: 'info',
        title: `El precio del boleto es : ${_precio} tokens`,
        width: 800,
        padding: '3em',
        backdrop: `
          rgba(15,238,168,0.2)
          left top
          no-repeat
        `
      });

    } catch (err) {
      this.setState({ errorMessage: err })
    } finally {
      this.setState({ loading: false })
    }
  }
  _tusBoletos = async () => {
    try {
      console.log("Visualización de tus boletos en ejecución");
      const _bloetos = await this.state.contract.methods.tusBoletos(this.state.account).call();
      Swal.fire({
        icon: 'info',
        title: 'Tus Boletos son :  ',
        width: 800,
        padding: '3em',
        text: `${_bloetos}`,
        backdrop: `
          rgba(15,238,168,0.2)
          left top
          no-repeat
        `
      });

    } catch (err) {
      this.setState({ errorMessage: err })
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    return (
      <div>
        <Navigation account={this.state.account} />
        <MyCarousel />
        <div id="bodyLotery" className="container-fluid mt-5">
       
              <div id="contenedorBody"className="content mr-auto ml-auto">
                <h1>Gestión de la Loteria con ERC-20 y ERC-721</h1>
                <div className="loteria-container">
                  <div className="form-container">
                    <h3>Compra tus boletos</h3>
                    <form onSubmit={(event) => {
                      event.preventDefault();
                      const cantidad = this._numBoletos.value;
                      this._compraBoletos(cantidad);
                    }}>
                      <input
                        type="number"
                        className="form-control mb1"
                        placeholder="Cantidad de boletos a comprar"
                        ref={(input) => (this._numBoletos = input)}
                      />
                      <input
                        type="submit"
                        className="btn btn-block btn-primary btn-sm"
                        value="Comprar Boletos"
                      />
                    </form>
                  </div>
                  <div className="buttons-container">
                    <div>
                      <button className="btn btn-block btn-danger btn-sm" onClick={this._precioBoleto}>
                        Ver Precio del Boleto
                      </button>
                    </div>
                    <div>
                      <Link to='/misBoletos'>
                        <button className="btn btn-block btn-success btn-sm">
                          Ver Mis Boletos
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
           
        </div>
        <Footer nftaddress = {this.state.addressNFT} tokenaddress={this.state.addressToken} />

      </div>
    );
  }
  
}

export default Loteria;
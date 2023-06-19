import React, { Component } from 'react';
import smart_contract from '../abis/loteria.json';
import Web3, { eth } from 'web3';
import Swal from 'sweetalert2';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from './Footer';


import Navigation from './Navbar';
import MyCarousel from './Carousel';
import { Container } from 'react-bootstrap';

class Tokens extends Component {

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
        this.setState({loading : true})
        this.setState({ contract })
        this.setState({addressToken : address.toString()});
        const addresNFT = await contract.methods.nft().call();
        this.setState({addressNFT : addresNFT.toString()});
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
      contract :null,
      errorMessage : "",
      addressToken : '0x0',
      addressNFT : '0x0'
    }
  }

  _balanceTokens=async()=>{
    try{
      console.log("Balance de tokens en ejecución");
      const _balance = await this.state.contract.methods.balanceTokens(this.state.account).call();

      Swal.fire({
        icon: 'info',
        title: 'Balance de tokens del usuario : ',
        width: 800,
        padding : '3em',
        text: `${_balance} tokens`,
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

  _balanceTokensSC=async()=>{
    try{
      console.log('Balance Tokens Smart Contract en ejecucion');
      const _balanceTokensSC=await this.state.contract.methods.balanceTokensSC().call();

      Swal.fire({
        icon: 'info',
        title: 'Balance de tokens del smart contract : ',
        width: 800,
        padding : '3em',
        text: `${_balanceTokensSC} tokens`,
        backdrop : `
          rgba(15,238,168,0.2)
          left top
          no-repeat
        `
      });

    }catch(err){
      this.setState({errorMessage : err})
    }finally{
      this.setState({loading:false})
    }
  }

  _precioTokens=async()=>{
    try{
      console.log('Calculando Precio de los Tokens ...');

      const BigNumber = require('bignumber.js');
      const _precio=await this.state.contract.methods.verPrecio().call();
      let ethers = new BigNumber(_precio).div(10 ** 18);
      Swal.fire({
        icon: 'info',
        title: 'Precio de ChernoFortune : ',
        width: 800,
        padding : '3em',
        text: `${ethers} ethers`,
        backdrop : `
          rgba(15,238,168,0.2)
          left top
          no-repeat
        `
      });

    }catch(err){
      this.setState({errorMessage : err})
    }finally{
      this.setState({loading:false})
    }
  }

  _compraTokens=async( _numTokens) => {
    try{
      const web3 = window.web3
      console.log("Compra de Tokens en ejecución");
      const ethers = await this.state.contract.methods.precioTokens(_numTokens).call();
      const precioFinal=web3.utils.fromWei(ethers, 'wei');
      console.log(`El precio es ${ethers} ethers`);
      await this.state.contract.methods.compraTokens(_numTokens).send({
        from : this.state.account,
        value : precioFinal
      })
      Swal.fire({
        icon: 'success',
        title: 'Compra de Tokens ChernoFortune realizada',
        width: 800,
        padding : '3em',
        text: `Has Comprado ${_numTokens} ChernoFortune/s por un valor de ${ethers / 10**18} ether/s`,
        backdrop : `
          rgba(15,238,168,0.2)
          left top
          no-repeat
        `
      });


    }catch(err){
      this.setState({errorMessage : err});
    }finally{
      this.setState({loading:false})
    }
  }

  _devolverTokens = async(_numTokens) =>{
    try{
      console.log("Compra de Tokens en ejecución");
      await this.state.contract.methods.devolverTokens(_numTokens).send({
        from : this.state.account})
      Swal.fire({
        icon: 'success',
        title: '¡Devolución de ChernoFortune realizada!',
        width: 800,
        padding : '3em',
        text: `Has devuelto ${_numTokens} ChernoFortune/s`,
        backdrop : `
          rgba(15,238,168,0.2)
          left top
          no-repeat
        `
      });


    }catch(err){
      this.setState({errorMessage : err});
    }finally{
      this.setState({loading:false})
    }

  }

  render() {
    if (this.state.loading) {
      return <div>Cargando...</div>;
    }else{
    return (
    
      <div>
        <Navigation account={this.state.account} />
        <MyCarousel />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Gestión de los Tokens ERC-20</h1>
            
                &nbsp;
                <h3>Compra de ChernoFortune</h3>
                <form onSubmit={(event) =>{
                  event.preventDefault();
                  const cantidad = this._numTokens.value;
                  this._compraTokens(cantidad);
                }}>
                  <input type='number' 
                  className='form-control mb-1' 
                  placeholder='Cantidad de ChernoFortune a Comprar' 
                  ref={(input)=> this._numTokens = input}/>
                  <input type='submit' 
                  className='bbtn btn-block btn-primary btn-sm' 
                  value="Comprar Tokens"/>
                </form>
                &nbsp;
                <h3> Devolución ChernoFortune</h3>
                <form onSubmit={(event) =>{
                  event.preventDefault()
                  const cantidad = this._numTokensDevolver.value;
                  this._devolverTokens(cantidad);
                }}>
                  <input type='number' 
                  className='form-control mb-1' 
                  placeholder='Cantidad de ChernoFortune a Devolver' 
                  ref={(input)=> this._numTokensDevolver = input}/>
                  <input type='submit' 
                  className='bbtn btn-block btn-warning btn-sm' 
                  value="Devolver Tokens"/>
                
                </form>
                &nbsp;
                &nbsp;

                <Container>
                  <Row>
                    <Col>
                    <form onSubmit={(event)=>{
                      event.preventDefault();
                      this._balanceTokens();
                    }}>
                      <input type='submit'
                      className='bbtn btn-block btn-success btn-sm'
                      value="BALANCE DE TOKENS"/>                    
                    </form>
                    </Col>                    
                    <Col>
                    <form onSubmit={(event)=>{
                      event.preventDefault();
                      this._balanceTokensSC();
                    }}>
                      <input type='submit' className='bbtn btn-block btn-info btn-sm' value="Balance Tokens SC"/>
                    </form>
                    </Col>

                    <Col>
                    <form onSubmit={(event)=>{
                      event.preventDefault();
                      this._precioTokens();
                    }}>
                      <input type='submit' className='bbtn btn-block btn-danger btn-sm' value="Precio ChernoFortune "/>
                    </form>
                    </Col>
                  </Row>
                </Container>
              </div>
            </main>
          </div>
        </div>
          <Footer nftaddress = {this.state.addressNFT} tokenaddress={this.state.addressToken} />

      </div>
      
    );
  }
}
}

export default Tokens;

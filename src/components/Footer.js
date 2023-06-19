import React from "react";

const MyFooter = ({nftaddress,tokenaddress}) => (

    <footer style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }} className='text-center text-lg-start text-muted'>
      <section className='border-bottom'>
        <div className='container text-center text-md-start mt-5'>
        &nbsp;
          <div className='row mt-3'>
            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <i className='fas fa-gem me-3'></i>ChernoVegas
              </h6>
              <p>
              Accede a los cursos de tecnología más novedosos y destacados del mercado.
              </p>
            </div>

            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contratos</h6>
              <p>
              <a href={'https://etherscan.io/address/' + nftaddress} className='text-reset'>
                  Boletos NFT
                </a>
              </p>
              <p>
              <a href={'https://etherscan.io/address/' + tokenaddress} className='text-reset'>
                ChernoFortune
                </a>
              </p>
             
            </div>
          </div>
        </div>
      </section>

      <div className='text-center p-4 bg-dark text-white' >
        © 2023 Copyright: 
        <a className='text-reset fw-bold text-white' href='/'>
          ChernoVegas.com
        </a>
      </div>
    </footer>
);

export default MyFooter;
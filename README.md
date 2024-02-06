# Loteria ERC20

### Descripción del Proyecto

Este proyecto consiste en un **sistema de loterías descentralizado** desplegado sobre la red de Ganache. Fue desarrollado como parte del curso "Máster Completo de Blockchain y Web3 de cero a experto" de Udemy.

Aprovechando las características de **transparencia**, **inmutabilidad** y **trazabilidad** de la tecnología blockchain, ha sido posible implementar un sistema de loterías justo, transparente y eficiente.

Cada boleto es único, por lo tanto, en el sistema se trata como un token **ERC-721**, es decir, un NFT (Non-Fungible Token), ya que un boleto de lotería es único e indivisible. Para poder comprar un boleto, el usuario primero tiene que disponer de los tokens de la aplicación. Para ello se ha creado un token **ERC-20**, el cual da derecho a los usuarios que poseen tokens a comprar un boleto.

Se ha programado un script para que, de manera automática, cada día a las **22:00 horas** ejecute la función `generarGanador()`, la cual selecciona uno de los boleto ganadores y lo emite como ganador. Este proceso es transparente y cualquier usuario puede auditar los eventos que se van produciendo en la red para comprobar que efectivamente el proceso se está llevando a cabo de manera justa y transparente.

En este proyecto, hemos empleado Truffle como la herramienta principal para compilar, desplegar e interactuar con nuestro contrato inteligente.

Para ejecutar el código, se tienen que seguir los siguientes pasos :

### 1. Install Dependencies:

`$ npm install`

### 2. Arranque de la Blockchain de desarrollo local

Para ello es necesario arrancara Ganache

### 3. Conectar las cuentas del blockchain de desarrollo a Metamask

- Copiar la clave privada de las direcciones e importarla a Metamask
- Conecta tu metamask al hardhat blockchain, 127.0.0.1:8545.

### 4. Migrar los Smart Contracts

`$ truffle migrate --network development`

### 5. Ejecutar los Tests

`$ npx hardhat test`

### 6. Lanzar el Frontend

`$ npm run start`

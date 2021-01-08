import React from 'react';
import styled from 'styled-components';


const DeletarItem = styled.button`
  width: 50px;
  height: 20px;
`
const CaixaProduto = styled.div`
  width: 200px;
  border: 1px solid black;
  padding: 10px;
  background-color: black;
  color: white;
 
`

class Carrinho extends React.Component {

  render() {
    const itensDoCarrinho = this.props.carrinho.map(p => {
      return (
        <CaixaProduto>
          <p> <strong>Quantidade: </strong>{p.quantidade}x</p>
          <p><strong>Produto: </strong>{p.nome}</p>
          <p><strong>Total: </strong>R$ {p.subTotal} </p>
          <p onClick={() => { this.props.excluirItem(p) }}> <DeletarItem>Deletar</DeletarItem> </p>
        </CaixaProduto>
      )
    })
    return (
      <CaixaProduto>
        {itensDoCarrinho}
        <p>Total: R${this.props.totalCarrinho()}</p>
      </CaixaProduto>
    )
  }
}


export default Carrinho;
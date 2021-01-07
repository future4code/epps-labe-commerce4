import React from 'react';
import styled from 'styled-components';


const DivProdutos = styled.div`
  width: 100%;
  padding: 20px;
`

const CaixaProduto = styled.div`
  text-align: center;
  width: 200px;
  height: 200px;
  border-style: dotted;
  border-width: 0px 0px 2px 0px; /* 25px top, 10px right, 4px bottom and 35px left */
`

const CaixaImagem = styled.div`
  width: 200px;
  height: 350px;
  border: 1px dotted black;
  padding: 10px;
`

const BotaoCompra = styled.button`
  width: 200px;
  height: 40px;
  background-color: black;
  color: white;
`

class Produtos extends React.Component {
    render() {
        console.log(this.props.selecionarProduto)
        const listaProdutos = this.props.produtos.map(p => {
            return (
                <CaixaImagem>
                    <img src={p.imageUrl} />
                    <p>{p.nome}</p>
                    <p>R${p.value}</p>
                    <BotaoCompra onClick={() => this.props.selecionarProduto(p.id)}>Adicionar ao carinho</BotaoCompra>
                </CaixaImagem>
            )
        })
        return (
            <DivProdutos>
                {listaProdutos}
            </DivProdutos>
        )
    }
}
export default Produtos;

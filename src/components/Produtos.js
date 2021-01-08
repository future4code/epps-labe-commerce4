import React from 'react';
import styled from 'styled-components';



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
      const tamanhoProdutos = this.props.produtos.length
        console.log(this.props.selecionarProduto)
        const listaProdutos = this.props.produtos.map(p => {
            return (
              <div>
                <h3>Quantidade {tamanhoProdutos}</h3>
                <CaixaImagem>
                    <img src={p.imageUrl} />
                    <p>{p.nome}</p>
                    <p>R${p.value}</p>
                    <BotaoCompra onClick={() => this.props.selecionarProduto(p.id)}>Adicionar ao carinho</BotaoCompra>
                </CaixaImagem>
                </div>
            )
        })
        return (
            <div>
                {listaProdutos}
            </div>
        )
    }
}
export default Produtos;

import React from 'react';
import styled from 'styled-components';


const DivProdutos = styled.div`
  width: 200px;
  height: 350px;
  border: 1px dotted black;
  padding: 10px;
`

const BotaoCompra = styled.button`
  width: 200px;
  height: 40px;
  background-color: grey;
  color: white;
  position: absolute;
`


class Produtos extends React.Component {
    render() {


        const listaProdutos = this.props.produtos.map(p => {
            return (
                <div>
                    <h3>Quantidade {this.props.tamanhoProdutos}</h3>
                    <DivProdutos>
                        <img src={p.imagem} />
                        <p>{p.nome}</p>
                        <p>R${p.preco}</p>
                        <BotaoCompra onClick={() => this.props.selecionarProduto(p.id)}>ADICIONAR AO CARRINHO</BotaoCompra>
                    </DivProdutos>
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

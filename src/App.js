
import React from 'react';
import './App.css';
import styled from 'styled-components'
import Carrinho from './components/Carrinho'

const DivMain = styled.div`
    width: 300px;
    height: 300px;
    border: 1px solid black;
  `
const DivFiltro = styled.div`
  width: 300px;
  height: 500px;
  border: 1px solid black;
`

const InputMinimo = styled.input`
  width: 100px;
  height: 10px;
`

const InputProduto = styled.input`
  width: 100px;
  height: 10px;
`

const DivProdutos = styled.div`
  width: 100%;
  padding: 20px;
`

const CaixaImagem = styled.div`
  width: 200px;
  height: 350px;
  border: 1px solid black;

`

const BotaoCompra = styled.button`
  width: 200px;
  height: 20px;
  background-color: black;
  color: white;
`

const DivCarrinho = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    width: 800px;
    height: 500px;
    border: 1px solid black;
`
const soma = 0
let total = 0

export default class App extends React.Component {

  state = {
    produtos: [{
      id: 1,
      nome: "teste1",
      value: 85,
      quantidade: 0,
      subTotal:0,
      imageUrl: "https://picsum.photos/id/3/200/200"
    },
    {
      id: 2,
      nome: "teste2",
      value: 85,
      quantidade: 0,
      subTotal:0,
      imageUrl: "https://picsum.photos/id/2/200/200"
    },
    {
      id: 3,
      nome: "teste3",
      value: 150,
      quantidade: 0,
      subTotal:0,
      imageUrl: "https://picsum.photos/id/5/200/200"
    },
    ], 
    carrinho: [],
  }

  excluirItem = (item) => {
    const listaProdutos = this.state.carrinho.filter((p) => {
      return p.id !== item.id;
    });

    this.setState({ carrinho: listaProdutos });
  };


  selecionarProduto = (id) => {

    let novoCarrinho = [...this.state.carrinho]

    const existeProduto = this.state.produtos.find((p) => {
      if (id === p.id) {
        return true
      }
      return false
    })

    const existeProdutoNoCarrinho = novoCarrinho.find((item) => {
      if (id === item.id) {
        return true
      }
      return false
    })

    if (existeProdutoNoCarrinho === undefined) {
      const novoProduto = {
        ...existeProduto,
        quantidade: 1,
        subTotal: existeProduto.value,
      }
      novoCarrinho = [novoProduto, ...novoCarrinho]; 
    } else {
      novoCarrinho = novoCarrinho.map((item) => {
        if (id === item.id) {
          return {
            ...item,
            quantidade: item.quantidade + 1, 
            subTotal: item.value + item.subTotal,
          }
        } else {
          return item
        }
      });
    }
    this.setState({ carrinho: novoCarrinho })
  }

  totalCarrinho = () => {
    let total = 0
    this.state.carrinho.map((item) => {
      total += item.subTotal
    })
    return total
  }
  render() {
    const tamanhoProdutos = this.state.produtos.length

    const exibirCarrinho = () => {
      const itensDoCarrinho = this.state.carrinho.map((p) => {
        return (
          <div>
            <span> {p.quantidade} </span>
            <span> {p.nome} </span>
            <span>R$ {p.subTotal} </span>
            <span onClick={()=>{this.excluirItem(p)}}> x </span>
          </div>
        )
      })
      return itensDoCarrinho;
    }
    return (
      <main>
        <DivFiltro>
          <h3>Filtros:</h3>
          <label>Valor minimo</label>
          <InputMinimo type="number" value="teste" />
          <label>Buscar Produto</label>
          <InputProduto type="text" />
        </DivFiltro>

        <h3>Quantidade {tamanhoProdutos}</h3>
        {this.state.produtos.map(p => {
          return (

            <DivProdutos>
              <CaixaImagem>
                <img src={p.imageUrl} />
                <p>{p.nome}</p>
                <p>R${p.value}</p>
                <BotaoCompra onClick={() => this.selecionarProduto(p.id)}>Adicionar carinho</BotaoCompra>
              </CaixaImagem>
            </DivProdutos>
          )
        })}
        <DivCarrinho>
          {exibirCarrinho()}
          <p>Total: {this.totalCarrinho()}</p>
        </DivCarrinho>
      </main>
    )
  }
}

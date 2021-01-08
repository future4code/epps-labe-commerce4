import React from 'react';
import './App.css';
import styled from 'styled-components';
import Filtro from './components/Filtro'
import Carrinho from './components/Carrinho';
import Produtos from './components/Produtos';


// const BotaoComprar = styled.div`
//   width: 100px;
//   height: 100px;
//   border: 1px solid black;
//   background-color: red;
// `

export default class App extends React.Component {

  state = {
    produtos: [{
      id: 1,
      nome: "teste1",
      value: 85,
      quantidade: 0,
      subTotal: 0,
      imageUrl: "https://picsum.photos/id/3/200/200"
    },
    {
      id: 2,
      nome: "teste2",
      value: 85,
      quantidade: 0,
      subTotal: 0,
      imageUrl: "https://picsum.photos/id/2/200/200"
    },
    {
      id: 3,
      nome: "teste3",
      value: 150,
      quantidade: 0,
      subTotal: 0,
      imageUrl: "https://picsum.photos/id/5/200/200"
    },
    ],
    carrinho: [],
    carrinhoMostrar: false,
    valorMinInput: 0,
    valorMaxInput: Infinity,
    valorBuscaInput: "",
  }

  onChangeValorMin = (e) => {
    this.setState({
      valorMinInput: Number(e.target.value)
    })
    console.log(this.state.valorMinInput)
  }

  onChangeValorMax = (e) => {
    this.setState({
      valorMaxInput: Number(e.target.value)
    });
    console.log(this.state.valorMaxInput)
  }

  onChangeValorBusca = (e) => {
    this.setState({
      valorBuscaInput: e.target.value
    });
  }
  onChangeFiltro = (e) => {
    this.setState({
      filtro: e.target.value
    });
  }

  excluirItem = (item) => {
    const listaProdutos = this.state.carrinho.filter((p) => {
      return p.id !== item.id;
    });

    this.setState({ carrinho: listaProdutos });
  };


  aoClicarNoCarrinho = () => {
    this.setState({ carrinhoMostrar: !this.state.carrinhoMostrar });
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


    const filtrarProdutos = () => {
      let listaFiltrada
      if (this.state.valorBuscaInput !== "") {
        listaFiltrada = this.state.produtos.filter((p) => {
          const novoNome = p.nome.toLowerCase();
          const input = this.state.valorBuscaInput.toLowerCase();
          if (novoNome.includes(input)) {
            return true
          } else {
            return false
          }
        })
      } else if ((this.state.valorMaxInput !== "") || (this.state.valorMinInput !== "")) {
        listaFiltrada = this.state.produtos.filter((p) => {
          if ((p.value >= this.state.valorMinInput) && (p.value <= this.state.valorMaxInput)) {
            return true
          } else {
            return false
          }
        })
      } else {
        listaFiltrada = this.state.produtos
      }
      console.log(listaFiltrada)
      return listaFiltrada
    };

    

    // const exibirCarrinho = () => {
    //   const itensDoCarrinho = this.state.carrinho.map((p) => {
    //     return (
    //       // <CaixaProduto>
    //       //   <p> <strong>Quantidade:</strong>{p.quantidade}x</p>
    //       //   <p><strong>Produto:</strong>{p.nome}</p>
    //       //   <p><strong>Total:</strong>R$ {p.subTotal} </p>
    //       //   <p onClick={()=>{this.excluirItem(p)}}> <DeletarItem>Deletar</DeletarItem> </p>
    //       // </CaixaProduto>

    //     )
    //   })
    //   return itensDoCarrinho;
    // }
    return (
      <main>
        <Filtro
          filtrarProdutos={this.filtrarProdutos}
        />
        <Produtos
          produtos={this.state.produtos}
          selecionarProduto={this.selecionarProduto}
        />
        <Carrinho
          produtos={this.state.produtos}
          carrinho={this.state.carrinho}
          excluirItem={this.excluirItem}
          exibirCarrinho={this.exibirCarrinho}
          totalCarrinho={this.totalCarrinho}
        />



      {filtrarProdutos().map(p => {
          return (
              <div>
                <img src={p.imageUrl} />
                <p>{p.nome}</p>
                <p>R${p.value}</p>
                <button onClick={() => this.selecionarProduto(p.id)}>Adicionar carinho</button>
              </div>
          )
        })}

      </main>
    )
  }
}
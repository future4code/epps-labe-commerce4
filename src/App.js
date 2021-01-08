import React from 'react';
import './App.css';
import styled from 'styled-components';
import Filtro from './components/Filtro'
import Carrinho from './components/Carrinho';
import Produtos from './components/Produtos';
import Imagem1 from '../src/img/img1.jpg';
import Imagem2 from '../src/img/img2.jpg';
import Imagem3 from '../src/img/img3.jpg';
import Imagem4 from '../src/img/img4.jpg';
import Imagem5 from '../src/img/img5.jpg';
import Imagem6 from '../src/img/img6.jpg';



const ContainerProdutos = styled.div`
  width: 70%;
  display:flex;
  flex-wrap:wrap;
  padding: 10px;
`
const CaixaProduto = styled.div`
  width: 200px;
  height: 300px;
  border: 1px dotted black;
  padding: 20px 15px 15px 15px;
  margin:10px;
  background-color: black;
  color: white;
  border-radius: 1%;
`
const BotaoCompra = styled.button`
  width: 200px;
  height: 40px;
  background-color: grey;
  color: white;
`
const BotaoMostrarCarrinho = styled.button`
  background-color: transparent;
  position: absolute;
  bottom:0;
  right:0;
  border: none;
`

const IconeCarrinho = styled.img`
  margin: auto;
  align-self: center;
  width: 100px;
  object-fit: none;

`

export default class App extends React.Component {
  state = {
    produtos: [{
      id: 1,
      nome: "Avanhandava",
      preco: 1200,
      quantidade: 0,
      subTotal: 0,
      imagem: Imagem1
    },
    {
      id: 2,
      nome: "Buritizal",
      preco: 3000,
      quantidade: 0,
      subTotal: 0,
      imagem: Imagem2
    },
    {
      id: 3,
      nome: "Campos Sales",
      preco: 1500,
      quantidade: 0,
      subTotal: 0,
      imagem: Imagem3
    }, {
      id: 4,
      nome: "Conquista",
      preco: 1800,
      quantidade: 0,
      subTotal: 0,
      imagem: Imagem4
    },
    {
      id: 5,
      nome: "Hermenegildo",
      preco: 5000,
      quantidade: 0,
      subTotal: 0,
      imagem: Imagem5
    },
    {
      id: 6,
      nome: "Iguaraçu",
      preco: 2300,
      quantidade: 0,
      subTotal: 0,
      imagem: Imagem6
    },
    ],
    carrinho: [],
    carrinhoMostrar: false,
    valorMinInput: 0,
    valorMaxInput: Infinity,
    valorBuscaInput: "",
  }
  valorMinimo = (e) => {
    if (e.target.preco > 0) {

      this.setState({
        valorMinInput: Number(e.target.preco)
      })
    }
  }
  valorMaximo = (e) => {
    if (e.target.preco > 0) {
      this.setState({
        valorMaxInput: Number(e.target.preco)
      });
    }
  }
  valorBusca = (e) => {
    this.setState({
      valorBuscaInput: e.target.preco
    });
  }
  mudarFiltro = (e) => {
    this.setState({
      filtro: e.target.preco
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
        subTotal: existeProduto.preco,
      }
      novoCarrinho = [novoProduto, ...novoCarrinho];
    } else {
      novoCarrinho = novoCarrinho.map((item) => {
        if (id === item.id) {
          return {
            ...item,
            quantidade: item.quantidade + 1,
            subTotal: item.preco + item.subTotal,
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
          if ((p.preco >= this.state.valorMinInput) && (p.preco <= this.state.valorMaxInput)) {
            return true
          } else {
            return false
          }
        })
      } else {
        listaFiltrada = this.state.produtos
      }
      return listaFiltrada
    };
    const tamanhoProdutos = this.state.produtos.length

    return (
      <main>
        <Filtro
          tamanhoProdutos={tamanhoProdutos}
          valorMinimo={this.valorMinimo}
          valorMaximo={this.valorMaximo}
          valorBusca={this.valorBusca}
        />
        <ContainerProdutos>
          {(this.state.valorBuscaInput !== "" || this.state.valorMaxInput > 0 || this.state.valorMinInput > 0) ?

            filtrarProdutos().map(p => {
              return (
                <CaixaProduto>
                  <img src={p.imagem} />
                  <p>{p.nome}</p>
                  <p>R${p.preco}</p>
                  <BotaoCompra onClick={() => this.selecionarProduto(p.id)}>Adicionar ao carrinho</BotaoCompra>
                </CaixaProduto>
              )
            })
            :
            <Produtos
              produtos={this.state.produtos}
              selecionarProduto={this.selecionarProduto}
            />
          }
        </ContainerProdutos>

        {this.state.carrinhoMostrar && (
          <Carrinho
            produtos={this.state.produtos}
            carrinho={this.state.carrinho}
            excluirItem={this.excluirItem}
            exibirCarrinho={this.exibirCarrinho}
            totalCarrinho={this.totalCarrinho}
          />)
        }
        <BotaoMostrarCarrinho onClick={() => this.setState({ carrinhoMostrar: !this.state.carrinhoMostrar })}>
          <IconeCarrinho src="https://img.icons8.com/pastel-glyph/64/000000/shopping-cart--v2.png" />
        </BotaoMostrarCarrinho>
      </main>

    )
  }
}


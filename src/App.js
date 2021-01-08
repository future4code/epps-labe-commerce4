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
import Imagem7 from '../src/img/img7.jpg';
import Imagem8 from '../src/img/img8.jpg';


const ContainerProdutos = styled.div`
  width: 70%;
  display:flex;
  flex-wrap:wrap;
  border: 1px solid black;
  padding: 10px;
`
const CaixaProduto = styled.div`
 
  width: 200px;
  height: 350px;
  border: 1px dotted black;
  padding: 10px;
  margin:10px;
`
const BotaoCompra = styled.button`
  width: 200px;
  height: 40px;
  background-color: black;
  color: white;
`
const BotaoMostrarCarrinho = styled.button`
  width: 200px;
  height: 40px;
  background-color: black;
  color: white;
  position: absolute;
  bottom:0;
  right:0;
`
export default class App extends React.Component {
  state = {
    produtos: [{
      id: 1,
      nome: "Avanhandava",
      value: 1200,
      quantidade: 0,
      subTotal: 0,
      imageUrl: Imagem1
    },
    {
      id: 2,
      nome: "Buritizal",
      value: 3000,
      quantidade: 0,
      subTotal: 0,
      imageUrl: Imagem2
    },
    {
      id: 3,
      nome: "Campos Sales",
      value: 1500,
      quantidade: 0,
      subTotal: 0,
      imageUrl: Imagem3
    }, {
      id: 4,
      nome: "Conquista",
      value: 1800,
      quantidade: 0,
      subTotal: 0,
      imageUrl: Imagem4
    },
    {
      id: 5,
      nome: "Hermenegildo",
      value: 5000,
      quantidade: 0,
      subTotal: 0,
      imageUrl: Imagem5
    },
    {
      id: 6,
      nome: "Iguaraçu",
      value: 2300,
      quantidade: 0,
      subTotal: 0,
      imageUrl: Imagem6
    },
    {
      id: 7,
      nome: "Ipiranga",
      value: 4200,
      quantidade: 0,
      subTotal: 0,
      imageUrl: Imagem7
    },
    {
      id: 8,
      nome: "Itapicurú-Mirim",
      value: 5000,
      quantidade: 0,
      subTotal: 0,
      imageUrl: Imagem8
    },
    ],
    carrinho: [],
    carrinhoMostrar: false,
    valorMinInput: 0,
    valorMaxInput: Infinity,
    valorBuscaInput: "",
  }
  onChangeValorMin = (e) => {
    if(e.target.value>0){

      this.setState({
        valorMinInput: Number(e.target.value)
      })
    }
    console.log(this.state.valorMinInput)
  }
  onChangeValorMax = (e) => {
    if(e.target.value>0){

    this.setState({
      valorMaxInput: Number(e.target.value)
    });
  }
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
    const tamanhoProdutos = this.state.produtos.length
    return (
      <main>
        <Filtro
          tamanhoProdutos={tamanhoProdutos}
          onChangeValorMin={this.onChangeValorMin}
          onChangeValorMax={this.onChangeValorMax}
          onChangeValorBusca={this.onChangeValorBusca}
        />
        
        <ContainerProdutos>
          {(this.state.valorBuscaInput !== "" || this.state.valorMaxInput > 0 || this.state.valorMinInput > 0) ?

            filtrarProdutos().map(p => {
              return (
                <CaixaProduto>
                  <img src={p.imageUrl} />
                  <p>{p.nome}</p>
                  <p>R${p.value}</p>
                  <BotaoCompra onClick={() => this.selecionarProduto(p.id)}>Adicionar carinho</BotaoCompra>
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
        <BotaoMostrarCarrinho onClick={() => this.setState({ carrinhoMostrar: !this.state.carrinhoMostrar })}>Mostrar carrinho</BotaoMostrarCarrinho>

      </main>
    )
  }
}
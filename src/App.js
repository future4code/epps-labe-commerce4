import React from 'react';
import './App.css';
import styled from 'styled-components';
import Carrinho from './components/Carrinho';
import Produtos from './components/Produtos';
import Filtro from './components/Filtro'

const DivCarrinho = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    width: 800px;
    height: 600px;
    border: 1px dotted black;
`
const DeletarItem =  styled.button`
  width: 50px;
  height: 20px;
`

const CaixaProduto = styled.div`
  text-align: center;
  width: 200px;
  height: 200px;
  border-style: dotted;
  border-width: 0px 0px 2px 0px; /* 25px top, 10px right, 4px bottom and 35px left */
`

const BotaoComprar = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  background-color: red;
`

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
    const tamanhoProdutos = this.state.produtos.length


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

    const exibirCarrinho = () => {
      const itensDoCarrinho = this.state.carrinho.map((p) => {
        return (
          <CaixaProduto>
            <p> <strong>Quantidade:</strong>{p.quantidade}x</p>
            <p><strong>Produto:</strong>{p.nome}</p>
            <p><strong>Total:</strong>R$ {p.subTotal} </p>
            <p onClick={()=>{this.excluirItem(p)}}> <DeletarItem>Deletar</DeletarItem> </p>
          </CaixaProduto>

        )
      })
      return itensDoCarrinho;
    }

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
  

    return (
      <main>
        {/* <BotaoComprar onClick={this.aoClicarNoCarrinho}/> */}
        {/* <DivFiltro>
          <h3>FILTROS:</h3>
          <label>Valor Minimo</label>
          <InputMinimo type="number"  value={this.state.valorMinInput} onChange={this.onChangeValorMin}/>
          <label>Valor Máximo:</label>
          <InputMinimo type="number" value={this.state.valorMaxInput} onChange={this.onChangeValorMax}/>
          <label>Buscar Produto</label>

          <InputBuscarProduto type="text" value={this.state.valorBuscaInput} onChange={this.onChangeValorBusca}/>
        </DivFiltro>

        <h3>Quantidade {tamanhoProdutos}</h3>
        {filtrarProdutos().map(p => {
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
        })} */}
        {/* {this.state.carrinhoMostrar&&(
          <DivCarrinho>
            {exibirCarrinho()}
            <p>Total: {this.totalCarrinho()}</p>
          </DivCarrinho>
        )} */}
      <Carrinho/>
      <Produtos
          produtos={this.state.produtos}
          selecionarProduto={this.selecionarProduto}
      />
      <Filtro/>
      </main>
    )
  }
}
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

export default class App extends React.Component {

  state = {
    carrinho: [],
    produtos: [{
      id: 1,
      nome: "teste1",
      value: 85,
      imageUrl: "https://picsum.photos/id/3/200/200"
    },
  {
    id: 2,
      nome: "teste2",
      value: 85,
      imageUrl: "https://picsum.photos/id/2/200/200"
  },
  {
    id: 3,
    nome: "teste3",
    value: 150,
    imageUrl: "https://picsum.photos/id/5/200/200"
  }
]
  }

selecionarProduto = (id) =>{
  const item = this.state.produtos.map((p)=>{
    if(id===p.id){
       this.setState({
         carrinho: [...this.state.carrinho, p]
       })
    }
  })
 console.log(this.state.carrinho)
}

  render() {
    return (
      <main>
        <DivFiltro>
          <h3>Filtros:</h3>
          <label>Valor minimo</label>
          <InputMinimo type="number" value="teste"/>
          <label>Buscar Produto</label>
          <InputProduto type="text"/>
        </DivFiltro>

        {this.state.produtos.map(p=>{
                    return (
                        <DivProdutos>
                          <CaixaImagem>
                          <img src={p.imageUrl}/>
                          <p>{p.nome}</p>
                          <p>R${p.value}</p>
                          <BotaoCompra onClick={()=>this.selecionarProduto(p.id)}>Adicionar carinho</BotaoCompra>
                          </CaixaImagem>
                        </DivProdutos>
                    )
                })}
                {/* <Carrinho/> */}
                <DivCarrinho>
                {this.state.carrinho.map(x=>{
                    return (
                        
                          <p>{x.nome}</p>
                        
                    )
                })}
                </DivCarrinho>
      </main>
    )
  }
}

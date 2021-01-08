import React from 'react';
import styled from 'styled-components';

const DivFiltro = styled.div`
  width: 200px;
  height: 100vh;
  border: 1px solid black;
  padding: 10px;
  background-color: black;
  color: white;
`
const InputMinimo = styled.input`
  width: 200px;
  height: 10px;
`
const InputBuscarProduto = styled.input`
  width: 200px;
  height: 10px;
`

class Filtro extends React.Component {
  render() {

    return (
      <DivFiltro>
        <h3>FILTROS:</h3>
        <label>Valor Minimo</label>
        <InputMinimo type="number" onChange={this.props.valorMinimo} />
        <label>Valor Máximo:</label>
        <InputMinimo type="number" onChange={this.props.valorMaximo} />
        <label>Buscar Produto</label>
        <InputBuscarProduto type="text" onChange={this.props.valorBusca} />
        <h3>Quantidade: {this.props.tamanhoProdutos}</h3>
        <precoCrescente>
          <select id="precoCrescente">
            <option value={this.props.valorMaximo}>Crescente</option>
            <option value={this.props.valorMinimo}>Descrecente</option>
          </select>
        </precoCrescente>
      </DivFiltro>
    )
  }

}

export default Filtro;


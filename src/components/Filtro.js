import React from 'react';
import styled from 'styled-components';

const DivFiltro = styled.div`
  width: 200px;
  height: 500px;
  border: 1px solid black;
  padding: 10px;
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
                <InputMinimo type="number" />
                <label>Valor Máximo:</label>
                <InputMinimo type="number" />
                <label>Buscar Produto</label>
                <InputBuscarProduto type="text" />
            </DivFiltro>
        )
    }

}

export default Filtro;


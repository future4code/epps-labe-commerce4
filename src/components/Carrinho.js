import React from 'react';
import styled from 'styled-components';

const DivCarrinho = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    width: 800px;
    height: 600px;
    border: 1px dotted black;
`

const DeletarItem = styled.button`
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

class Carrinho extends React.Component {
    render() {
        return (
            <div>
                <DivCarrinho>
                </DivCarrinho>
            </div>

        )
    }
}

export default Carrinho;
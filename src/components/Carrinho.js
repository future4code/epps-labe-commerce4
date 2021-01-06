import React from 'react';
import styled from 'styled-components'


const DivCarrinho = styled.div`
    margin-top: 10px;
    width: 800px;
    height: 500px;
    border: 1px solid black;
`

export default class Carrinho extends React.Component{
    render(){
        return(
            <DivCarrinho>
                {this.props.carrinho}
            </DivCarrinho>
        )
    }

}
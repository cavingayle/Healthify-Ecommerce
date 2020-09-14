import styled from 'styled-components'

const InvButton = styled.button`

  
border: 2px solid;
  outline: none;
  background: white;
  color: #333;
  width: 100%;
  height: 40px;
  display: block;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 15px 0;

  &:hover{
      color: gray;
  }

`;

export {InvButton}
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'



function Welcome() {



    return (
        <Container>
            <Wrapper>
                <Title>Healthy living made easy</Title>
                <p>Your favorite organic and non-GMO brands,<br></br>
                    plus guaranteed savings—delivered to your door</p>
                <div className="btn-container">
                    <Link to="/register" ><Button>Get Started</Button></Link>  {/*Link to register page */}
                    <Link to="/login"><Button>Login</Button></Link>  {/*Link to login page */}
                </div>
            </Wrapper>
        </Container>
    )
}


const background = 'https://i.imgur.com/ySjU7fn.jpg'

const Container = styled.div`
/* height: 100vh; */
background-image: url(${background}) ;
-webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100%;
  overflow: hidden;
`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
height: 100vh;
justify-content: center;
margin: 0 10rem; 


`

const Title = styled.h1`

`

const Button = styled.button`
  
  border: 2px solid;
  outline: none;
  background: white;
  color: #333;
  height: 40px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 15px 0;

  &:hover{
      color: gray;
  }



`;


export default Welcome

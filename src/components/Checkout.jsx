import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout' 
import { connect } from 'react-redux'
import { clearCart } from '../ducks/reducer'
import styled from 'styled-components'

function Checkout(props) {

    const onToken = (token) => {
        token.card = void 0;
        console.log('token', token);
        axios.post('http://localhost:3535/api/payment', { token, amount: props.total } ).then(response => {
          alert('we are in business')
        });
    }
    
    const stripe = 'pk_test_51HPFlWE0l2QvNKBIwjAqNN0ag9bEgPfbTQvT13Zhn4t1WuFYfqzaQNEvFJ7cMEtJWg6HQs3IIhMrKxBMy9dwOkP000vPZlQMuj'
// need to pass props down from cart component so I can get the total . must calll it total in parent component
    return (
        <Container>
            <StripeCheckout
                token={onToken}
                stripeKey={stripe}
                amount={props.total * 100}
                
            />
        </Container>
    )
}

const Container = styled.div`
margin-bottom: 10px;
`

const mapStateToProps = state => state

export default connect(mapStateToProps,{clearCart})(Checkout)

import React, { useState } from 'react'
import axios from 'axios'
import { Form, TextArea, Button } from "./styles";
import styled from 'styled-components'


function ContactTxt() {
    const [data, setData] = useState({
        recipient: '',
        textmessage: ''
    })
    
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        sendText()
    }
    
    
    const sendText = () => {
        const { recipient, textmessage } = data
        axios.post('/send-text', { recipient, textmessage })
            .then(res => {
                alert('Message Sent')
            }).catch(err => {
                alert('Message Failed')
            })
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    console.log(data.recipient, data.textmessage)
        return (
            <FormContainer>
                                

                <Form id="contact-form" onSubmit={handleSubmit} method="POST">
                    
                        <Title>Text</Title>
                    
                    <div className="form-group">
                        <label for="message">Message</label>
                        <TextArea className="form-control" rows="5" name="textmessage" onChange={(e) => handleChange(e)}></TextArea>
                    </div>
                    <Button type="submit" className="btn btn-primary">Submit</Button>
                </Form>
          
            
            </FormContainer>
        
        )
    }


export default ContactTxt

const Title = styled.h2`
text-align: center;
margin: .8em 0;
color: #3d3d3d;

`


const FormContainer = styled.div`
justify-content: center;
margin: 0 auto;
display: flex;
font-family: 'Roboto';

`
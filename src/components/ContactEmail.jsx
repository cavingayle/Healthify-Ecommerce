import React, { useState } from "react";
import axios from "axios";
import { Form, Input, TextArea, Button } from "./styles";
import styled from 'styled-components'

function ContactEmail() {
  const [data, setData] = useState({
    name: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, message } = data;
    axios.post("/send", { name, message }).then((res) => {
      res.data.msg === "success"
        ? alert("Message Sent")
        : alert("Message failed");
      setData({
        name: "",
        message: "",
      });
    });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  console.log(data.message, data.name);
  return (
    <FormContainer>
      <Form id="contact-form" onSubmit={handleSubmit} method="POST">
        <header>
          <Title>Email</Title>
        </header>
        <div className="form-group">
          <label for="name">Name</label>
                  <Input
                      value={data.name}
            type="text"
            className="form-control"
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="form-group">
          <label for="message">Message</label>
          <TextArea
            className="form-control"
            rows="5"
            name="message"
            onChange={(e) => handleChange(e)}
          ></TextArea>
        </div>
        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ContactEmail;


const Title = styled.h2`
text-align: center;
margin: .8em 0;
color: #3d3d3d;
`

const FormContainer = styled.div`
justify-content: center;
margin: 0 auto;
display: flex;
`
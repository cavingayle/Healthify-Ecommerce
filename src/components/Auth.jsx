import React from 'react'
import { useFormik } from 'formik'
import { connect } from "react-redux";
import * as Yup from 'yup'
import axios from 'axios'
import { updateUser } from '../ducks/reducer'
import styled from 'styled-components'
import { Form, Container, Input, Error, InvButton } from './styles'

function Auth(props) {
    const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: Yup.object({
          email: Yup.string().required('Valid email required'),
          password: Yup.string().required('Password is required')
        }),
        onSubmit: () => {
          login();
        }
      })

    //Set up routes for history on props objectnodemon
    const login = () => {
        const { email, password} = values
        axios.post("/login", { email, password })
          .then(res => {
              console.log('Data Im looking for userId', res.data)
                props.updateUser(res.data.customer_id)
                props.history.push('/food') // set where you are pushing to after login..HOME?
            }).catch(err => {
          alert('Login Failed', err)
        })
    }

    
console.log(values.login, values.password)
  return (
  <ColorContainer>
    <Form onSubmit={handleSubmit}>
        <header>
          <Title>Login</Title>
          
      </header>
      <label htmlFor="email">Email</label>
      <Input
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        id="email"
        name="email"
        type="text"
      />
      {touched.email && errors.email ? (
        <Error>{errors.email}</Error>
      ): null}
      <label htmlFor="password">Password</label>
      <Input
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        id="password"
        name="password"
        type="password"
      />
      {touched.password && errors.password ? (
        <Error>{errors.password}</Error>
      ): null}
      <InvButton type="submit">Log in</InvButton>
      </Form>
      </ColorContainer>
  );
}

const ColorContainer = styled(Container)`
background: #f8f8ff;
`
const Title = styled.h1`
text-align: center;
margin: .8em 0;
`


export default connect(null, {updateUser})(Auth)

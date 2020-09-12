import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from 'styled-components'
import { Button, Form, Container, Input, Error } from './footer'
import { connect } from 'react-redux'
import { updateUser } from '../ducks/reducer'

function Register(props) {
  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format!").required("Email required"),
      password: Yup.string()
        .min(6, "Password should be longer than 6 characters")
        .required(),
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
    }),
    onSubmit: () => {
      registerFn();
    },
  });

  const registerFn = () => {
    const { email, password, firstName, lastName } = values;
    axios
      .post("/register", { email, password, firstName, lastName })
      .then((res) => {
        props.updateUser(res.data);
        props.history.push("/food"); //pu
      });
  };
  return (
    <ColorContainer>
    <Form onSubmit={handleSubmit}>
      <header></header>
      <label htmlFor="email">Email:</label>
      <Input
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        id="email"
        name="email"
        type="text"
      />
      {touched.email && errors.email ? <Error>{errors.email}</Error> : null}
      <label htmlFor="password">Password:</label>
      <Input
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        id="password"
        name="password"
        type="password"
      />
      {touched.password && errors.password ? (
        <Error>Password required</Error>
      ) : null}
      <label htmlFor="FirstName">First Name:</label>
      <Input
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        id="firstName"
        name="firstName"
        type="text"
      />
      {touched.firstName && errors.firstName ? (
        <Error>First Name required</Error>
      ) : null}
      <label htmlFor="lastName">Last Name:</label>
      <Input
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        id="lastName"
        name="lastName"
        type="text"
      />
      {touched.lastName && errors.lastName ? (
        <Error>Last Name required</Error>
      ) : null}
      <Button type="submit">Register</Button>
      </Form>
      </ColorContainer>
  );
}

const ColorContainer = styled(Container)`
background: #FCE5CF;
`

const mapStateToProps = state => state

export default connect(mapStateToProps, {updateUser})(Register);

import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import axios from 'axios';
import * as Yup from 'yup';
import styled from 'styled-components';
import User from './User';

const FormDiv = styled.div`
  margin: auto;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const UsersDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const API = 'https://reqres.in/api/users';

function RegisterForm({ values, errors, touched, isSubmitting, status }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if(status) setUsers([...users, status]);
  }, [status]);

  return (
      <FormDiv>
        <Form>
          <div>
            {touched.username && errors.username && <p>{errors.username}</p>}
            <Field type='text' name='username' placeholder='Username' />
          </div>
          <div>
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field type='email' name='email' placeholder='Email' />
          </div>
          <div>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field type='password' name='password' placeholder='Password' />
          </div>
          <label>
            <Field type='checkbox' name='tos' checked={values.tos} />
            Accept TOS
          </label>
          <br />
          <button disabled={isSubmitting}>Submit</button>
        </Form>
        <UsersDiv className='users'>
          {users.map(u => <User key={u.id} user={u} />)}
        </UsersDiv>
      </FormDiv>
  );
}

const FormikRegisterForm = withFormik({
  mapPropsToValues({username, email, password, tos}) {
    return {
      username: username || '',
      email: email || '',
      password: password || '',
      tos: tos || false
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
        .min(6, 'Your username must be at least 6 characters long.')
        .required('Username is required.'),
    email: Yup.string()
        .email('Not a valid email.')
        .required('Email is required.'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long.')
        .required('A password is required.'),
    tos: Yup.boolean()
        .required('You must accept the terms of service to proceed.')
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
    axios.post(API, values)
        .then(res => {
          console.log(res);
          setStatus(res.data);
          resetForm();
          setSubmitting(false);
        })
        .catch(e => {
          console.log(e);
          setErrors(e);
          setSubmitting(false);
        });
  }
})(RegisterForm);

export default FormikRegisterForm;
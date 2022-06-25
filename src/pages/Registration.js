import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Registration = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios
      .post("https://social-media-api-josscodes.herokuapp.com/auth", data)
      .then(() => {
        console.log(data);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="formContainer">
        <label>Username: </label>
        <ErrorMessage name="username" component="span" />
        <Field
          id="inputCreatePost"
          name="username"
          placeholder="(Example Jhon123...)"
        />

        <label>Password: </label>
        <ErrorMessage name="password" component="span" />
        <Field
          type="password"
          id="inputCreatePost"
          name="password"
          placeholder="(Your password..)"
        />

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

export default Registration;

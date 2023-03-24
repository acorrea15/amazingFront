import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LOGIN_SCHEMA } from "../utils/validationSchemas";
import { handleToast } from "../components/Notifications";
import { useLoginMutation } from "../services/appApi";

const LoginForm = () => {
  console.log("LoginForm")
  const [login, { isError, isLoading, error }] = useLoginMutation();

  return (
    <div className="login_container">
        <div className="login_title">
        <h2>Iniciar Sesión</h2>
        </div>
    <Formik
      initialValues={{ documento: "", email: "", password: "" }}
      validationSchema={LOGIN_SCHEMA}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values, "<<<--Values OnSubmit LOGIN");
        if (values.documento===12345678 && values.email==="admin@gmail.com" && values.password==="Admin123*"){
          
          let email = values.email;
          let password = values.password;

          setSubmitting(false);
          handleToast("success", "Bienvenido")
          login({ email, password })
          resetForm({
            documento: "",
            email: "",
            password: "",
          });
        } else{
          handleToast("error", "Usuario y/o contraseña incorrecta")
        }
      }}
    >
      {props => (
        //los props son los valores que se envian al formulario y se pueden usar en el formulario
        <Form className="container">
        <div className="form-group mb-3 w-100">
          <label htmlFor="documento">Documento</label>
          <Field name="documento" type="number" className="form-control" />
          <ErrorMessage
            name="documento"
            component="p"
            className="text-danger mt-1"
          />
        </div>
        <div className="form-group mb-3 w-100">
          <label htmlFor="email">Email</label>
          <Field name="email" type="email" className="form-control" />
          <ErrorMessage
            name="email"
            component="p"
            className="text-danger mt-1"
          />
        </div>
        <div className="form-group mb-3 w-100">
          <label htmlFor="password">Password</label>
          <Field name="password" type="password" className="form-control" />
          <ErrorMessage
            name="password"
            component="p"
            className="text-danger mt-1"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Iniciar Sesión
        </button>
      </Form>
      )}
    </Formik>
    </div>
  );
};

export default LoginForm;

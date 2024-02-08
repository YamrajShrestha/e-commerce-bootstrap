"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import "../css/form.css";
import Link from "next/link";

const SignupSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const ValidationSchemaExample = () => (
  <div className="con">
    <Image
      src="/logo.png"
      width={120}
      height={100}
      alt="Picture of the author"
      className="img"
    />
    <h2>Log In Page</h2>
    <Formik
      initialValues={{
        phoneNumber: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            className="input"
            name="phoneNumber"
            placeholder="Phone number"
          />
          {errors.phoneNumber && touched.phoneNumber ? (
            <div>{errors.phoneNumber}</div>
          ) : null}
          <Field
            className="input"
            name="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          Don't have an account yet?{" "}
          <span>
            <Link href="/register">REGISTER</Link>
          </span>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default ValidationSchemaExample;
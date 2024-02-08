"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import "../css/form.css";
import Link from "next/link";
import { message } from "antd";

const SignupSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const ValidationSchemaExample = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const handleRegister = async (values) => {
    const res = await fetch("https://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    messageApi.open({
      type: res.status == 200 ? "success" : "error",
      content: data.msg,
    });
    console.log(res);
  };

  return (
    <div className="con">
      <Image
        src="/logo.png"
        width={120}
        height={120}
        alt="Picture of the author"
        className="img"
      />
      <h2 className="section-title">Register Page</h2>
      <Formik
        initialValues={{
          phoneNumber: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          handleRegister(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {contextHolder}
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
              name="email"
              type="email"
              placeholder="Email address"
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field
              className="input"
              name="password"
              type="password"
              placeholder="Password"
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            Already have an account?{" "}
            <span>
              <Link href="/login">LOG IN</Link>
            </span>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ValidationSchemaExample;

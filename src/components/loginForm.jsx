import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" }, //you can not set them to null or undefined as a role of thumb but empty strings or some value you get from the server
    errors: {}
  };
  //   username = React.createRef(); // to access DOM we add ref to the input

  schema = {
    username: Joi.string()
      .required()
      .label("Username")
      .alphanum(),
    password: Joi.string()
      .required()
      .label("Password") // labels the error message with the format we desired
  };

  doSubmit = () => {
    // call the server
    console.log("Submitted");

    // const username = this.username.current.value; // to get the value
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;

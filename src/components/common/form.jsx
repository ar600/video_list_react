import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const { data } = this.state;
    const options = { abortEarly: false };

    /*
        // we will rewrite this with Joi
            if (data.username.trim() === "")
            errors.username = "Username is required!!";
            if (data.password.trim() === "")
            errors.password = "Password is required!!";
    
            return Object.keys(errors).length === 0 ? null : errors;
        */
    const { error } = Joi.validate(data, this.schema, options); //abortEarly will show all the errors not the first catched error

    if (!error) return null;

    const errors = {};
    for (const item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    //e.currentTarget.name / value
    const obj = { [name]: value }; //computed property, we use ES6 {[name]: value} = {name: something}
    const schema = { [name]: this.schema[name] }; // We cannot use this.schema for the next argyument, as it is the schema for the entire form. we need to use sub-schema for the data usernmae or password.
    const { error } = Joi.validate(obj, schema); // we can not use this.state.data since it is the entire data so we use obj instead.
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} }); // we need to write like this so if no errors it will not mess up our login with the null value of errors
    if (errors) return;

    this.doSubmit();
  };

  handleChange = e => {
    const { currentTarget: input } = e;

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    /*to dynamically work with the properties like username or password instead of writing separate datas you can use bracket notations
        1. data[e.currentTarget.name]
        2. add name to input tags on your code
    */
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;

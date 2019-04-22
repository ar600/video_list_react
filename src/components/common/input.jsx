import React from "react";

// we need label, name and error and we can pass the others with the rest operator from the props object
// const Input = ({ type, name, label, value, error, onChange }) => {
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        /*
          // we will use ...rest instead
          value={value} //to bind to the state.account
          onChange={onChange}
          // ref={this.username} //React.createRef()
          type={type}
        */
        {...rest} //any other attributes from the props object
        name={name}
        id={name}
        className="form-control"
        autoComplete="off"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;

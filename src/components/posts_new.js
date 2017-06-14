import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    // Below is a compacted syntax in ES6 for destructuring to access properties
    const { meta: { touched, error } } = field;
    const css = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={css}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          // This is the redux requirement
          // It has all of the event handlers like onChange and etc.
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    console.log(values);
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      // Equivalent to writing old javascript of:
      // {handleSubmit(this.onSubmit.bind(this))}
      <form onSubmit={handleSubmit((values) => this.onSubmit(values))}>
        <Field
          label="Title for Post"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories of Post"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
        <Link to="/" className="btn btn-danger"> Cancel </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  // validate the inputs from 'values' object
  for (let check of ['title', 'categories', 'content']) {
    if (!values[check]) {
      errors[check] = `Please enter a value for ${check}`;
    }
  }

  // If erros is empty, the form is valid.
  // however, if errors has any objects, then redux will think it's not valid and not submit it
  return errors;
}

export default reduxForm({
  validate, // same as validate: validate
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);

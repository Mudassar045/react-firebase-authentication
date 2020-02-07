import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
	passwordOne: '',
	passwordTwo: '',
  error: null
}

class PasswordChangeForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    }
  }

  onSubmit = e => {
		const { passwordOne } = this.state
		this.props.firebase 
			.doPasswordUpdate(passwordOne)
			.then(() => {
			  this.setState({...INITIAL_STATE});
  		})
			.catch(error => {
			  this.setState({ error });
			})
			e.preventDefault();
  }

  onChange = e => {
    this.setState({[e.target.name] : e.target.value})
  };

  render() {
    const {
      passwordOne, passwordTwo, error
		} = this.state;
		
		const isInvalid =
			passwordOne === ''
			|| passwordTwo === '';

    return (
      <form onSubmit={this.onSubmit}>
				<input
					name="password"
					value={passwordOne}
					onChange={this.onChange}
					type="password"
					placeholder="Password">
				</input>

				<input
					name="password"
					value={passwordTwo}
					onChange={this.onChange}
					type="password"
					placeholder="Password">
				</input>

				<button type="submit" disabled={isInvalid}>Change My Password</button>

				{error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import PasswordForgetForm from '../PasswordForget';
import { withAuthorization, AuthUserContext } from '../Session';
import CatCreate from '../Cats';

const AccountPage = () => (
  <AuthUserContext.Consumer>
		{authUser => (
			<div>
				<h1>Account: {authUser.email}</h1>
				<PasswordChangeForm />
				<PasswordForgetForm />
        <CatCreate/>
			</div>
		)}
	</AuthUserContext.Consumer>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
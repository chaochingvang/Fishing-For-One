import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  //initial state of registration info
  const initialState = {
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  }
  
  const [newUser, setNewUser] = useState(initialState);




  const registerUser = (event) => {
    event.preventDefault();
    
    //checks if user has enter the same password twice
    //dispatch registration if pw is correct
    if (newUser.password === newUser.confirmPassword) {
      dispatch({
        type: 'REGISTER',
        payload: {
          username: newUser.username,
          password: newUser.password,
          email: newUser.email,
        },
      });
      //if not, reset pw input and prompt user to re-enter both pw
    } else {
      alert(`Passwords don't match! Please re-enter matching passwords.`);
      setNewUser({...newUser, password: '', confirmPassword: ''})
    }
  }; // end registerUser

  console.log(newUser);

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={newUser.username}
            required
            onChange={(event) => setNewUser({...newUser, username: event.target.value})}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={newUser.password}
            required
            onChange={(event) => setNewUser({...newUser, password: event.target.value})}
          />
        </label>
      </div>
      <div>
        <label htmlFor="confirmPassword">
          Re-enter Password:
          <input
            type="password"
            name="confirmPassword"
            value={newUser.confirmPassword}
            required
            onChange={(event) => setNewUser({...newUser, confirmPassword: event.target.value})}
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            value={newUser.email}
            required
            onChange={(event) => setNewUser({ ...newUser, email: event.target.value })}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;

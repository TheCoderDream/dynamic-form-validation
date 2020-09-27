import './style.css';
import { FormGroup } from './FormGroup';
import { validators } from './validators';
console.clear();

const formElement = document.forms['registerForm'] as HTMLFormElement;

const formGroup = new FormGroup({
  username: {
    value: '',
    validators: [validators.required],
    errorMessage: 'Username is required'
  }, 
  email: {
    value: '',
    validators: [validators.isEmail],
    errorMessage: 'Invalid email'
  },
  password: {
    value: '',
    validators: [validators.required, validators.checkLength(6)],
    errorMessage: 'Must contain at least 6 characters'
  },
  password2: {
    value: '',
    validators: [validators.required],
    match: 'password',
    errorMessage: 'Password doesn\'t match'
  }
  }, formElement, 'submit'
)
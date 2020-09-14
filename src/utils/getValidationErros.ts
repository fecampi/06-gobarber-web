import { ValidationError } from 'yup';

interface Errors {
  // chave pode ser qualquer coisa, desde que seja string
  [key: string]: string;
}
export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};
  // percorrer os erros.
  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}

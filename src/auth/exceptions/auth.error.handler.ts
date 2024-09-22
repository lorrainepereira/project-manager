export enum AUTH_USER_ERRORS {
  WrongAuth = "E-mail ou senha estão incorretos"
}

export class WrongAuthError extends Error {
  constructor(message: AUTH_USER_ERRORS) {
    super(message.toString());
  }
}

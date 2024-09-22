export enum USER_ERRORS {
  UserNotFound = "Usuário não encontrado",
}

export class UserNotFoundError extends Error {
  constructor(message: USER_ERRORS) {
    super(message.toString());
  }
}

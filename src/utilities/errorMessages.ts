interface IErrorMessages {
  [key: string]: string;
}

export const errorMessages: IErrorMessages = {
  shortEmail: 'E-mail cannot be shorter than 10 characters',
  longEmail: 'E-mail cannot be longer than 50 characters',
  invalidEmail: 'Invalid email address',
  shortPassword: 'Password cannot be shorter than 5 characters',
  longPassword: 'Password cannot be longer than 50 characters',
  shortNickName: 'Nick name cannot be shorter than 3 characters',
  longNickName: 'Nick name cannot be longer than 50 characters',
  wrongLoginOrPassword: 'Wrong login or password',
  checkNetworkConnection: 'Check your network connection',
  userAlreadyExists: 'User with this email address already exists',
  undefinedError: 'Undefined error',
};

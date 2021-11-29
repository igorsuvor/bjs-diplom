'use strict'

const userForm = new UserForm();

userForm.loginFormCallback = data => {
  ApiConnector.login(data, response => {
    if (response.success === true) {
      location.reload();
    } else {
        userForm.setLoginErrorMessage(`Пользователь ${data.login} не найден или введен неверный пароль`)
      }
    })
}

userForm.registerFormCallback = data => {
  ApiConnector.register(data, response => {
    if (response.success === true) {
      location.reload();
    } else {
        userForm.setRegisterErrorMessage('Неверно ввели логин и/или пароль')
      }
  })
}
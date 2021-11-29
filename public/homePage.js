'use strict'

// Выход из аккаунта
const userLogout = new LogoutButton();

userLogout.action = () => {
  ApiConnector.logout(response => {
    if (response.success === true) location.reload();
  })
}

// Просмотр профиля
ApiConnector.current((response) => {
  if (response.success === true) ProfileWidget.showProfile(response.data)
})

// Курсы валют
const ratesBoard = new RatesBoard();

function getRatesBoard() {
  ApiConnector.getStocks(response => {
    if (response.success === true) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  })
}

getRatesBoard();

setInterval(getRatesBoard, 60000);

// Пополнение кошелька
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, `Счёт успешно пополнен на ${data.amount} ${data.currency}`);
    } else {
        moneyManager.setMessage(response.success, response.error);
      }
  })
}

// Обмен валюты
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, 'Валюта успешно конвертирована');
    } else {
        moneyManager.setMessage(response.success, response.error);
      }
  })
}

// Перевод средств
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, 'Успешная транзакция!');
    } else {
        moneyManager.setMessage(response.success, response.error);
      }
  })
}
// Добавление пользователя в избранные
const favoritesWidget = new FavoritesWidget();

const getFavorites = () => {
  ApiConnector.getFavorites(response => {
    if (response.success === true) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }
  })
}

getFavorites();

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success === true) {
      getFavorites();
      favoritesWidget.setMessage(response.success, 'Пользователь добавлен в избранное!');
    } else {
        favoritesWidget.setMessage(response.success, response.error);
      }
  })
}

// Удаление пользователя из избранных
favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success === true) {
      getFavorites();
      favoritesWidget.setMessage(response.success, 'Пользователь  успешно удален!');
    } else {
        favoritesWidget.setMessage(response.success, response.error);
      }
  })
}
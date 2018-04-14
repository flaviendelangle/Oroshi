import API from './index'


class Users extends API {
  config = {
    root: '/users',
  }

  retrieveByUsername = username => super.detailRoute(username, 'username')
}

export const UsersAPI = new Users()
export const UsersClass = Users

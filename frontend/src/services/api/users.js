import API from './index'

class Users extends API {
  
  config = {
    root: '/users'
  };
  
}

export const UsersAPI = new Users();
export const UsersClass = Users;
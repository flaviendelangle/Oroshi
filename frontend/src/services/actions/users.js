import { UsersAPI } from 'services/api/users';
import { users } from 'services/titles/api';


export const create = data => {
  return {
    type: users.create,
    payload: UsersAPI.create(data).catch(error => {
      return {
        error
      }
    })
  };
};
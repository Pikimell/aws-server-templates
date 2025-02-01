import { response } from '../helpers/response';
import * as authServices from '../services/authService';

export const login = async (event) => {
  const data = event.body;
  const user = await authServices.login(data);
  return response(200)(user);
};

export const register = async (event) => {
  const data = event.body;
  const user = await authServices.register(data);
  return response(200)(user);
};
export const confirmRegister = async (event) => {
  const data = event.body;
  const user = await authServices.confirmRegister(data);
  return response(200)(user);
};

export const logout = async (event) => {
  const data = event.body;
  const user = await authServices.logout(data);
  return response(200)(user);
};
export const updateGroup = async (event) => {
  const data = event.body;
  const user = await authServices.updateUserGroup(data);
  return response(200)(user);
};

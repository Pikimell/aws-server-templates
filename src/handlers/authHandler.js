import { ctrlWrapper } from '../utils/ctrlWrapper';
import * as authController from '../controllers/authController';

export const loginHandler = async (event, context) => {
  const ctrl = ctrlWrapper(authController.login);
  return await ctrl(event, context);
};
export const registerHandler = async (event, context) => {
  const ctrl = ctrlWrapper(authController.register);
  return await ctrl(event, context);
};
export const confirmRegisterHandler = async (event, context) => {
  const ctrl = ctrlWrapper(authController.confirmRegister);
  return await ctrl(event, context);
};
export const logoutHandler = async (event, context) => {
  const ctrl = ctrlWrapper(authController.logout);
  return await ctrl(event, context);
};
export const updateGroupHandler = async (event, context) => {
  const ctrl = ctrlWrapper(authController.updateGroup);
  return await ctrl(event, context);
};

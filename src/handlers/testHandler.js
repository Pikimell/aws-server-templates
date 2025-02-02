import { testController } from '../controllers/testController';
import { ctrlWrapper } from '../utils/ctrlWrapper';

export const testHandler = async (event, context) => {
  const ctrl = ctrlWrapper(testController);
  return await ctrl(event, context);
};

export const testHandler2 = async (event, context) => {
  const ctrl = ctrlWrapper(testController);
  return await ctrl(event, context);
};

export const testHandler3 = async (event, context) => {
  const ctrl = ctrlWrapper(testController);
  return await ctrl(event, context);
};

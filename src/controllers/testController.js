import { response } from '../helpers/response';
import { testService } from '../services/testService';

export const testController = async (event) => {
  const data = event.body;
  const user = await testService(data);
  return response(200)(user);
};

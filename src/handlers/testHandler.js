export const updateGroupHandler = async (event, context) => {
  const ctrl = ctrlWrapper(authController.updateGroup);
  return await ctrl(event, context);
};

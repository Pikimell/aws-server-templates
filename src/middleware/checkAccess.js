export const freeUserAccess = (event) => {
  const claims = event.requestContext.authorizer.claims;
  const groups = claims['cognito:groups']
    ? claims['cognito:groups'].split(',')
    : [];
};

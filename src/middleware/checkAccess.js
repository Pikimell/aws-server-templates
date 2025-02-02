const parseGroups = (event) => {
  const claims = event.requestContext.authorizer.claims;
  const groups = claims['cognito:groups']
    ? claims['cognito:groups'].split(',')
    : [];
  return groups;
};

export const freeUserAccess = (event) => {
  const groups = parseGroups(event);
  const isFreeUser = groups.includes('freeUser');
  const isAdmin = adminAccess(event);
  return isFreeUser || isAdmin;
};

export const paidUserAccess = (event) => {
  const groups = parseGroups(event);
  const isPaidUser = groups.includes('paidUser');
  const isAdmin = adminAccess(event);
  return isPaidUser || isAdmin;
};

export const agencyAccess = (event) => {
  const groups = parseGroups(event);
  const isAgencyUser = groups.includes('agencyUser');
  const isAdmin = adminAccess(event);
  return isAgencyUser || isAdmin;
};

export const adminAccess = (event) => {
  const groups = parseGroups(event);
  const isAdmin = groups.includes('admin');
  return isAdmin;
};

export const userAcces = (userGroups) => {
  return (event) => {
    const groups = parseGroups(event);
    const hasAccess = userGroups.some((el) => {
      return groups.includes(el);
    });
    return hasAccess || adminAccess(event);
  };
};

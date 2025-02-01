import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  GlobalSignOutCommand,
  AdminAddUserToGroupCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { CLIENT_ID, USER_POOL_ID } from '../helpers/constants';
import { generateSecretHash } from '../helpers/seecretHash';

const client = new CognitoIdentityProviderClient({ region: 'us-east-1' });

const clientId = CLIENT_ID;

export const register = async ({ username, password, email }) => {
  const command = new SignUpCommand({
    ClientId: clientId,
    Username: username,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'nickname', Value: username },
    ],
    SecretHash: generateSecretHash(username),
  });

  try {
    const user = await client.send(command);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const confirmRegister = async ({ username, code, group }) => {
  const command = new ConfirmSignUpCommand({
    ClientId: clientId,
    Username: username,
    ConfirmationCode: code,
    SecretHash: generateSecretHash(username),
  });

  try {
    const result = await client.send(command);
    await updateUserGroup({ username, group });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const login = async ({ username, password }) => {
  const command = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: generateSecretHash(username),
    },
  });

  try {
    const response = await client.send(command);
    console.log('Login successful:', response.AuthenticationResult);
    return {
      accessToken: response.AuthenticationResult.AccessToken,
      idToken: response.AuthenticationResult.IdToken,
      refreshToken: response.AuthenticationResult.RefreshToken,
    };
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

export const logout = async (accessToken) => {
  const command = new GlobalSignOutCommand({
    AccessToken: accessToken,
  });

  try {
    const response = await client.send(command);
    console.log('Logout successful:', response);
    return response;
  } catch (error) {
    throw new Error(`Logout failed: ${error.message}`);
  }
};

// Функція для оновлення токенів за допомогою refreshToken
export const refreshToken = async (refreshToken) => {
  const command = new InitiateAuthCommand({
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    ClientId: clientId,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
      SecretHash: generateSecretHash(refreshToken),
    },
  });

  try {
    const response = await client.send(command);
    console.log('Tokens refreshed:', response.AuthenticationResult);
    return {
      accessToken: response.AuthenticationResult.AccessToken,
      idToken: response.AuthenticationResult.IdToken,
    };
  } catch (error) {
    throw new Error(`Token refresh failed: ${error.message}`);
  }
};

export const updateUserGroup = async ({ username, group }) => {
  if (!group) return;

  const addUserToGroupCommand = new AdminAddUserToGroupCommand({
    UserPoolId: USER_POOL_ID,
    Username: username,
    GroupName: group,
  });

  const res = await client.send(addUserToGroupCommand);
  console.log(`User added to group: ${group}`);
  return res;
};

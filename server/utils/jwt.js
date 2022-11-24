import jwt from 'jsonwebtoken';

const generateAccessToken = user => {
  const config = useRuntimeConfig();

  return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
    expiresIn: '10m',
  });
};

const generateRefreshToken = user => {
  const config = useRuntimeConfig();

  return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
    expiresIn: '4h',
  });
};

export const decodeRefreshToken = token => {
  const config = useRuntimeConfig();

  try {
    return jwt.verify(token, config.jwtRefreshSecret);
  } catch (err) {
    return null;
  }
};

export const decodeAccessToken = token => {
  const config = useRuntimeConfig();

  try {
    return jwt.verify(token, config.jwtAccessSecret);
  } catch (err) {
    return null;
  }
};

export const genereateTokens = user => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};

export const sendRefreshToken = e => {
  //EVENT.RES?!
  setCookie(e, 'refresh_token', token, {
    httpOnly: true,
    sameSite: true,
  });
};

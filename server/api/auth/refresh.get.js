import { sendError } from 'h3';
import { getRefreshTokenByToken } from '~~/server/db/refreshTokens';
import { decodeRefreshToken, genereateTokens } from '~~/server/utils/jwt';
import { getUserById } from '~~/server/db/users';

export default defineEventHandler(async e => {
  const cookies = parseCookies(e);

  const refreshToken = cookies.refresh_token;

  if (!refreshToken) {
    return sendError(
      e,
      createError({
        statusCode: 401,
        statusMessage: 'Refresh token is invalid',
      })
    );
  }

  const rToken = await getRefreshTokenByToken(refreshToken);

  if (!rToken) {
    return sendError(
      e,
      createError({
        statusCode: 401,
        statusMessage: 'Refresh token is invalid',
      })
    );
  }

  const token = decodeRefreshToken(refreshToken);

  try {
    const user = await getUserById(token.userId);
    const { accessToken } = genereateTokens(user);
    return {
      access_token: accessToken,
    };
  } catch (err) {
    return sendError(
      e,
      createError({
        statusCode: 401,
        statusMessage: 'Something went wrong',
      })
    );
  }
});

import { getUserByUsername } from '~~/server/db/users';
import { genereateTokens, sendRefreshToken } from '~~/server/utils/jwt';
import bcrypt from 'bcrypt';
import { userTransformer } from '~~/server/transformers/user';
import { createRefreshToken } from '~~/server/db/refreshTokens';
import { sendError } from 'h3';

export default defineEventHandler(async e => {
  const body = await useBody(e);

  const { username, password } = body;

  if (!username || !password) {
    return sendError(
      e,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid Params',
      })
    );
  }

  //Check if the user is registered
  const user = await getUserByUsername(username);
  if (!user)
    return sendError(
      e,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid password or username',
      })
    );

  //Compare passwords

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch)
    return sendError(
      e,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid password or username',
      })
    );
  //Generate tokens
  //Access token
  //Refresh token

  const { accessToken, refreshToken } = genereateTokens(user);

  //Save refresh token inside db
  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });

  //Add http only cookie
  sendRefreshToken(e, refreshToken);

  return {
    access_token: accessToken,
    user: userTransformer(user),
  };
});

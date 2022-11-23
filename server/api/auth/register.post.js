import { sendError } from 'h3';
import { createUser } from '~~/server/db/users';
import { userTransformer } from '~~/server/transformers/user';

export default defineEventHandler(async e => {
  const body = await useBody(e);

  const { userName, email, password, repeatPassword, name } = body;
  if (!userName || !email || !password || !repeatPassword || !name) {
    return sendError(
      e,
      createError({ statusCode: 400, statusMessage: 'Invalid params' })
    );
  }
  if (password !== repeatPassword) {
    return sendError(
      e,
      createError({ statusCode: 400, statusMessage: 'Passwords do not match' })
    );
  }

  const userData = {
    userName,
    email,
    password,
    name,
    profileImage: 'https://picsum.photos/200/200',
  };

  const user = await createUser(userData);

  return {
    body: userTransformer(user),
  };
});

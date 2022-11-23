import { sendError } from 'h3';

export default defineEventHandler(async e => {
  const body = await useBody(e);

  const { userName, email, password, repeatPassword, name } = body;
  if (!userName || !email || !password || !repeatPassword || !name) {
    return sendError(
      e,
      createError({ statusCode: 400, statusMessage: 'Invalid params' })
    );
  }
  return {
    body,
  };
});

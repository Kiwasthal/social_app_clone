import UrlPattern from 'url-pattern';
import { decodeAccessToken } from '../utils/jwt';
import { sendError } from 'h3';
import { getUserById } from '../db/users';

export default defineEventHandler(async e => {
  const endpoints = [
    '/api/auth/user',
    '/api/user/tweets',
    '/api/tweets',
    '/api/tweets/:id',
  ];

  const isHandledByMiddleware = endpoints.some(endpoint => {
    const pattern = new UrlPattern(endpoint);

    return pattern.match(e.req.url);
  });

  if (!isHandledByMiddleware) return;

  const token = e.req.headers['authorization']?.split(' ')[1];

  const decoded = decodeAccessToken(token);

  if (!decoded)
    return sendError(
      e,
      createError({
        statusCode: 401,
        statusMessage: 'Unothorized',
      })
    );

  try {
    const userId = decoded.userId;
    const user = await getUserById(userId);
    e.context.auth = { user };
  } catch (err) {
    return;
  }
});

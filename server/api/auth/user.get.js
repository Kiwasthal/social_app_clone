import { userTransformer } from '~~/server/transformers/user';

export default defineEventHandler(async e => {
  return {
    user: userTransformer(e.context.auth?.user),
  };
});

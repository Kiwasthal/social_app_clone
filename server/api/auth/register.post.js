export default defineEventHandler(async e => {
  const body = await useBody(e);

  return {
    body,
  };
});

/**
 *
 * @param {*} user : authData
 * @returns filtered data so we do not expose sensitive information
 */

export const userTransformer = user => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    profileImage: user.profileImage,
  };
};

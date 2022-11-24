export default (url, options = {}) => {
  const { useAuthToken } = useAuth();
  const token = useAuthToken().value;

  return $fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export default () => {
  const postTweet = formData => {
    const form = new FormData();

    form.append('text', formData.text);

    formData.mediaFiles.forEach((mediaFIle, index) => {
      form.append('media_file' + index, mediaFIle);
    });

    return useFetchApi('/api/user/tweets', {
      method: 'POST',
      body: form,
    });
  };

  return {
    postTweet,
  };
};

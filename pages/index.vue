<template>
  <MainSection title="Home" :loading="loading">
    <Head>
      <Title>Home / Twitter</Title>
    </Head>
    <div class="border-b" :class="twitterBorderColor">
      <TweetForm :user="user" />
    </div>

    <TweetListFeed :tweets="homeTweets" />
  </MainSection>
</template>
<script setup>
const { twitterBorderColor } = useTailwindConfig();
const { getHomeTweets } = useTweets();
const loading = ref(false);
const homeTweets = ref([]);
const { useAuthUser } = useAuth();
const user = useAuthUser();

onBeforeMount(async () => {
  loading.value = true;
  try {
    const { tweets } = await getHomeTweets();
    homeTweets.value = tweets;
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <MainSection title="Home" :loading="loading">
    <TweetForm />
  </MainSection>
</template>
<script setup>
const loading = ref(false);
const { useAuthUser } = useAuth();
const user = useAuthUser();
</script>

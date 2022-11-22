<template>
  <div class="h-screen flex flex-col">
    <div
      class="p-2 my-2 rounded-full w-min hover:bg-blue-50 dark:hover:bg-white/20"
      :class="defaultTransition"
    >
      <NuxtLink to="/">
        <div class="w-8 h-8">
          <LogoTwitter />
        </div>
      </NuxtLink>
    </div>
    <SidebarLeftTab active>
      <template v-slot:icon>
        <HomeIcon />
      </template>
      <template v-slot:name> Home</template>
    </SidebarLeftTab>
  </div>
</template>

<script setup>
import { HomeIcon } from '@heroicons/vue/20/solid';
const { defaultTransition } = useTailwindConfig();
</script>

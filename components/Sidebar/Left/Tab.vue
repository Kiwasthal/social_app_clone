<template>
  <NuxtLink
    to="#"
    class="flex items-center p-3 w-min hover:bg-gray-200 rounded-full"
    :class="defaultTransition"
  >
    <div class="h-6 w-6 text-dark">
      <slot name="icon" />
    </div>
    <div class="ml-4 text-xl" :class="textClasses">
      <slot name="name"></slot>
    </div>
  </NuxtLink>
</template>

<script setup>
const { defaultTransition } = useTailwindConfig();
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const textClasses = computed(() =>
  props.active ? 'font-semibold' : 'font-normal'
);
</script>

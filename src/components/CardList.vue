<template>
  <!-- Main container for virtual scrolling -->
  <div
    class="space-y-6 w-full max-w-3xl m-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200"
  >
    <!-- Spacer for the top padding -->
    <div :style="{ height: `${topSpacerHeight}px` }"></div>

    <!-- Render only visible users -->
    <div
      v-for="user in visibleUsers"
      :key="user.login"
      class="hover:shadow-md hover:border-gray-300 transition-shadow"
    >
      <Card :user="user" />
    </div>

    <!-- Spacer for the bottom padding -->
    <div :style="{ height: `${bottomSpacerHeight}px` }"></div>

    <!-- Loading Spinner -->
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <div
        class="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"
      ></div>
    </div>

    <!-- Intersection Observer Trigger for infinite scroll -->
    <div ref="observer" class="h-1"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useUserStore } from "../store/userStore";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import Card from "./Card.vue";

/**
 * Constants
 */
const ITEM_HEIGHT = 96; // Height of each card in pixels (matches h-24 in Card component)
const VISIBLE_COUNT = 10; // Number of users to display in the viewport
const BUFFER = 5; // Additional items to render above and below the viewport

/**
 * Store and States
 */
const store = useUserStore();
const observer = ref(null); // Ref for the `.h-1` element
const startIndex = ref(0);
const endIndex = ref(VISIBLE_COUNT + BUFFER * 2);

/**
 * Compute visible users dynamically based on the current scroll position.
 */
const visibleUsers = computed(() =>
  store.users.slice(startIndex.value, endIndex.value)
);

/**
 * Compute spacers for the virtual scroll effect.
 */
const topSpacerHeight = computed(() => startIndex.value * ITEM_HEIGHT);
const bottomSpacerHeight = computed(
  () => Math.max(0, store.users.length - endIndex.value) * ITEM_HEIGHT
);

/**
 * Infinite scroll setup.
 */
const { isLoading, observeBottom } = useInfiniteScroll(async () => {
  await store.fetchUsers();
});

/**
 * Handle main document scroll and dynamically update the visible range.
 */
const onScroll = () => {
  const scrollTop = window.scrollY; // Current scroll position
  const viewportHeight = window.innerHeight; // Height of the viewport

  // Calculate new visible range
  const newStartIndex = Math.max(
    0,
    Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER
  );
  const newEndIndex = Math.min(
    store.users.length,
    Math.ceil((scrollTop + viewportHeight) / ITEM_HEIGHT) + BUFFER
  );

  if (newStartIndex !== startIndex.value || newEndIndex !== endIndex.value) {
    startIndex.value = newStartIndex;
    endIndex.value = newEndIndex;
  }
};

/**
 * Attach scroll event listeners and set up infinite scroll observer.
 */
onMounted(() => {
  window.addEventListener("scroll", onScroll);
  if (observer.value) {
    observeBottom(observer.value); // Use the Vue ref directly to avoid null issues
  }
});

/**
 * Clean up event listeners to prevent memory leaks.
 */
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

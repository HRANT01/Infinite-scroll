<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- Application Title -->
    <h1 class="text-3xl font-bold text-center mb-8">
      User List With Infinite Scroll
    </h1>

    <!-- Display the CardList Component -->
    <CardList />
  </div>
</template>

<script setup>
/**
 * Lifecycle hook to fetch data when the application is mounted.
 * Imports the `useUserStore` to manage user data and the `CardList` component to display the user list.
 */

import { onMounted } from "vue"; // Vue's lifecycle hook
import { useUserStore } from "./store/userStore"; // User store for state management
import CardList from "./components/CardList.vue"; // CardList component to display the list of user cards

// Get the user store instance
const store = useUserStore();

/**
 * Fetches the first page of user data when the application is mounted.
 * Ensures the app starts with an initial set of users.
 */
onMounted(() => {
  store.fetchUsers(1); // Fetch users for page 1
});
</script>

<style scoped></style>

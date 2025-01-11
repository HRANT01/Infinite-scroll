<template>
  <!-- 
    A user card component to display basic user information, including
    a profile picture, name, and email address.
    Tailwind CSS classes are used for styling the card.
  -->
  <div
    class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg shadow-sm h-24 hover:shadow-md hover:border-gray-300 transition-shadow"
  >
    <!-- Profile picture of the user -->
    <img
      :src="user.picture.medium"
      :alt="`${user.name.first} ${user.name.last}`"
      class="w-16 h-16 rounded-full"
    />
    <div>
      <!-- Display the user's first and last name -->
      <p class="text-lg font-semibold">
        {{ user.name.first }} {{ user.name.last }}
      </p>
      <!-- Display the user's email address -->
      <p class="text-sm text-gray-600">{{ user.email }}</p>
    </div>
  </div>
</template>

<script setup>
/**
 * Defines the structure of the `user` prop.
 * @typedef {Object} User
 * @property {Name} name - An object containing the user's first and last name.
 * @property {string} email - The user's email address.
 * @property {Picture} picture - An object containing URLs to the user's profile pictures.
 */

/**
 * Defines the structure of the `name` property.
 * @typedef {Object} Name
 * @property {string} first - The user's first name.
 * @property {string} last - The user's last name.
 */

/**
 * Defines the structure of the `picture` property.
 * @typedef {Object} Picture
 * @property {string} medium - The URL for the medium-sized profile picture.
 */

/**
 * Props passed to the `userCard` component.
 * @type {User}
 */
defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

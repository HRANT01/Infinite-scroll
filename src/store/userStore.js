// src/stores/userStore.js
import { defineStore } from "pinia";
import axios from "axios";

/**
 * Store for managing user data.
 * This store is used to fetch, store, and manage the list of users for the infinite scroll functionality.
 *
 * @module userStore
 */

/**
 * User store definition.
 * Stores the users array and the loading state.
 */
export const useUserStore = defineStore("userStore", {
  state: () => ({
    /**
     * Array to store the fetched user data.
     * @type {Array<Object>} - Each object contains user details like name, picture, and email.
     */
    users: [],

    /**
     * Boolean flag to indicate whether data is being fetched.
     * @type {boolean}
     */
    isLoading: false,
  }),

  actions: {
    /**
     * Fetches user data from the randomuser.me API and appends it to the existing users list.
     * @async
     * @function fetchUsers
     * @param {number} [page=1] - The page number to fetch (defaults to 1).
     * @returns {Promise<void>} - Returns a promise that resolves when the data has been fetched.
     */
    async fetchUsers(page = 1) {
      try {
        this.isLoading = true;

        // Fetch data from the API
        const response = await axios.get(
          `https://randomuser.me/api/?page=${page}&results=10`
        );

        // Append the newly fetched users to the existing list
        this.users = [...this.users, ...response.data.results];
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    /**
     * Returns the list of users.
     * @returns {Array<Object>} - The array of fetched users.
     */
    getUsers() {
      return this.users;
    },

    /**
     * Returns the current loading state.
     * @returns {boolean} - True if data is being fetched, false otherwise.
     */
    getLoadingState() {
      return this.isLoading;
    },
  },
});

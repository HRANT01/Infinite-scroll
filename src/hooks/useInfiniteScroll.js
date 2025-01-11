import { ref, onMounted, watch } from "vue";

/**
 * Hook to handle infinite scroll functionality.
 * This hook sets up an infinite scrolling mechanism by monitoring the bottom of the scrollable content
 * and loading more data when the user reaches it.
 *
 * @param {Function} fetchData - Function to fetch data (e.g., fetchUsers in userStore).
 * @param {number} [pageSize=10] - Number of items to fetch per request.
 * @returns {Object} - An object containing:
 *  - {Ref<boolean>} isLoading - Indicates whether data is currently being fetched.
 *  - {Function} observeBottom - Sets up an IntersectionObserver to detect when the bottom is reached.
 *  - {Ref<boolean>} hasMore - Indicates whether there is more data to load.
 */
export function useInfiniteScroll(fetchData, pageSize = 10) {
  /**
   * @type {Ref<boolean>}
   * Tracks whether a fetch operation is in progress to prevent duplicate requests.
   */
  const isLoading = ref(false);

  /**
   * @type {Ref<boolean>}
   * Indicates whether there is more data to fetch.
   */
  const hasMore = ref(true);

  /**
   * @type {Ref<number>}
   * Tracks the current page number for paginated requests.
   */
  const page = ref(1);

  /**
   * Function to load more data when needed.
   * - Prevents multiple concurrent fetches using `isLoading`.
   * - Fetches the next page of data using the `fetchData` function.
   * - Updates the `page` value after a successful fetch.
   * - Handles errors gracefully.
   */
  const loadMore = async () => {
    if (isLoading.value || !hasMore.value) return; // Exit if already loading or no more data
    isLoading.value = true;

    try {
      await fetchData(page.value); // Fetch data for the current page
      page.value += 1; // Increment the page counter
    } catch (error) {
      console.error("Error loading more data:", error); // Log any errors during the fetch
    } finally {
      isLoading.value = false; // Reset loading state after the fetch
    }
  };

  /**
   * Watches `hasMore` to trigger data loading if it becomes true.
   * This ensures that the fetch mechanism works reactively if `hasMore` is dynamically updated.
   */
  watch(hasMore, (newVal) => {
    if (newVal) {
      loadMore();
    }
  });

  /**
   * Sets up an IntersectionObserver to detect when the bottom of the scrollable content is in view.
   * When the observed element becomes visible, it triggers `loadMore`.
   *
   * @param {Element} element - The DOM element to observe for intersection with the viewport.
   */
  const observeBottom = (element) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 } // Fully visible element triggers the callback
    );
    observer.observe(element);
  };

  // Return reactive states and methods for external use
  return {
    isLoading,
    observeBottom,
    hasMore,
  };
}

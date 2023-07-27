<template>
  <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <a
          v-if="currentPage > 1"
          @click="handlePageChange(currentPage - 1)"
          href="#"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Previous
      </a>
      <a
          v-if="currentPage < totalPages"
          @click="handlePageChange(currentPage + 1)"
          href="#"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Next
      </a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          {{ ' ' }}
          <span class="font-medium">{{ currentPage }}</span>
          {{ ' ' }}
          to
          {{ ' ' }}
          <span class="font-medium">{{ totalPages }}</span>
          {{ ' ' }}
          results
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <a
              v-if="currentPage > 1"
              @click="handlePageChange(currentPage - 1)"
              href="#"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </a>
          <template v-for="page in visiblePages" :key="page">
            <button
                v-if="page !== '...'"
                @click="handlePageChange(page)"
                :class="[
                  currentPage === page
                    ? 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                ]"
            >
              {{ page }}
            </button>
            <span v-else class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">{{ page }}</span>
          </template>
          <button
              v-if="currentPage < totalPages"
              @click="handlePageChange(currentPage + 1)"
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRouter } from "vue-router";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";
const router = useRouter();

// eslint-disable-next-line vue/no-setup-props-destructure
const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
    default: 1,
  },
  currentPage: {
    type: Number,
    required: true,
    default: 1,
  },
});

const visiblePages = computed(() => {
  const pageNumbers = [];

  // always add first page
  pageNumbers.push(1);

  // if there are more than 5 pages
  if (props.totalPages > 5) {
    // add current page and 2 pages on each side if they exist
    for (let i = props.currentPage - 2; i <= props.currentPage + 2; i++) {
      if (i > 1 && i < props.totalPages) pageNumbers.push(i);
    }

    // always add last page
    pageNumbers.push(props.totalPages);

    // add "..." where needed
    for (let i = 1; i < pageNumbers.length - 1; i++) {
      if (pageNumbers[i] - pageNumbers[i - 1] > 1) {
        pageNumbers.splice(i, 0, "...");
      }
    }
  } else {
    // just add all pages
    for (let i = 2; i <= props.totalPages; i++) {
      pageNumbers.push(i);
    }
  }

  return pageNumbers;
});

const emit = defineEmits(['changePage']);
const handlePageChange =  (page) => {
  if (typeof page === "number") {
    console.log(page)
    emit("changePage", page);
  }
};
</script>

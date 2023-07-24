<template>
  <div>
    <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div class="-mt-px flex w-0 flex-1">
        <a
            v-if="currentPage > 1"
            @click="handlePageChange(currentPage - 1)"
            href="#"
            class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </a>
      </div>
      <div class="hidden md:-mt-px md:flex">
        <template v-if="totalPages > 1">
          <a
              v-if="currentPage > 1"
              @click="handlePageChange(1)"
              href="#"
              :class="[
              currentPage === 1
                ? 'inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600'
                : 'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
            ]"
          >
            1
          </a>

          <a
              @click="handlePageChange(currentPage)"
              href="#"
              :class="[
              currentPage === currentPage
                ? 'inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600'
                : 'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
            ]"
          >
            {{ currentPage }}
          </a>
          <a
              v-if="currentPage < totalPages"
              @click="handlePageChange(totalPages)"
              href="#"
              :class="[
              currentPage === totalPages
                ? 'inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600'
                : 'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
            ]"
          >
            {{ totalPages }}
          </a>
        </template>
      </div>
      <div class="-mt-px flex w-0 flex-1 justify-end">
        <a
            v-if="currentPage < totalPages"
            @click="handlePageChange(currentPage + 1)"
            href="#"
            class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          Next
          <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </a>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import {useRouter} from "vue-router";
import {ArrowLongLeftIcon, ArrowLongRightIcon} from "@heroicons/vue/20/solid";
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

const emit = defineEmits(['changePage']);

const handlePageChange = (newPage) => {
  emit('changePage', newPage);
};

</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Recent Calls</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the calls in your account.</p>
      </div>
      <!-- <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add user
        </button>
      </div> -->

    </div>
    <div class="flex gap-4 w-full" >
      <div v-for="(option, key) in filterOptions" :key="key" class="w-full">
        <SelectMenus v-model="option.selected" :options="option.options" @modelValueUpdated="handleSelectChange" />
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                >
                  Call ID
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                >
                  Application
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                >
                  from
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  to
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  answer_at
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  hangup_at
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  duration
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  cost
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  status
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                >
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody v-if="!loading && (calls?.data?.length > 0)">
              <tr v-for="(call, index) in calls.data" :key="call.call_id">
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                  ]"
                >
                  {{ call.call_id }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                  ]"
                >
                  {{ call.application_id }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                  ]"
                >
                  {{ call.from }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                  ]"
                >
                  {{ call.to }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                  ]"
                >
                  {{ call.answer_at }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                  ]"
                >
                  {{ call.hangup_at }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                  ]"
                >
                  {{ call.duration }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                  ]"
                >
                  {{ call.cost }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                  ]"
                >
                  {{ call.status }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                  ]"
                >
                  <button @click="handleShowDeleteModal(call.call_id)" class="text-indigo-600 hover:text-indigo-900"
                    >Edit<span class="sr-only">, {{ call.call_id }}</span></button
                  >
                </td>
              </tr>
            </tbody >
            <tbody v-else>
              <tr>
                <td colspan="10" class="text-center py-4 text-sm font-medium text-gray-900">
                  No calls found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <CustomPagination :totalPages="getTotalPages" @changePage="changePage" :currentPage="currentPage" v-if="(calls?.data?.length > 0) && !loading" />
    <DeleteModal :isShowDeleteModal="isShowDeleteModal" @handleCloseDeleteModal="handleCloseDeleteModal" @handleDelete="handleDelete" />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import {computed, onMounted, ref} from 'vue'
import { useCallsStore } from '../../stores/CallsStore'
const callsStore = useCallsStore()
const { loading, calls } = storeToRefs(callsStore)
import { useRouter} from "vue-router";
import CustomPagination from "@/components/shared/CustomPagination.vue";
import DeleteModal from "@/components/shared/DeleteModal.vue";
import SelectMenus from "@/components/shared/SelectMenus.vue";

const router = useRouter();
const isShowDeleteModal = ref(false);
const deleteId = ref(null);
const filterOptions = ref({
    form: {
      options: [
        { label: 'From', value: '' },
        { label: '+918878588555', value: '+918878588555' },
      ],
      selected: '',
    },
    to: {
      options: [
        { label: 'To', value: '' },
        { label: '12295987906', value: '12295987906' },
      ],
      selected: '',
    },
  call_id: {
    options: [
      { label: 'Call ID', value: '' },
      { label: 'call_6486ceb01337e0.13116668', value: 'call_6486ceb01337e0.13116668' },
    ],
    selected: '',
  },
})

// Get the current query parameter for the page number
const currentPage = ref(parseInt(router.currentRoute.value.query.page) || 1);

const handleSelectChange = async (value, key) => {
  const query = { ...router.currentRoute.value.query };
  const keyMap = { 'from': 'from', 'to': 'to', 'Call ID': 'call_id' };

  const queryKey = keyMap[key.toLowerCase()];
  if (queryKey) {
    if (value) {
      query[queryKey] = value;
    } else {
      delete query[queryKey];
    }
  }

  // Reset the page number
  currentPage.value = 1;
  query.page = currentPage.value;

  // Update the URL with the new query parameters
  await router.push({ query });

  const newQuery = handleFormQueryParams();
  console.log(newQuery);
  await handleGetCalls(newQuery);
};


const handleShowDeleteModal = (id) => {
  console.log(id)
  deleteId.value = id;
  isShowDeleteModal.value = true;
}

const handleCloseDeleteModal = () => {
  isShowDeleteModal.value = false;
  deleteId.value = null;
}

const handleDelete = async () => {
  try {
    loading.value = true;
    if (deleteId.value) {
      await callsStore.delete_call(deleteId.value);
      handleCloseDeleteModal();
      const pageFromQuery = handleFormQueryParams();
      //add the page number to the query params
      let newQuery = ""
      if (!router.currentRoute.value.query.page) {
       newQuery = pageFromQuery ? `${pageFromQuery}&page=1` : '?page=1';
      } else {
        newQuery = pageFromQuery;
      }
     await handleGetCalls(newQuery);
    }
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}

// Method to change the page number
const changePage = async (newPage)=> {
  console.log(newPage)
  currentPage.value = newPage
  const query = { ...router.currentRoute.value.query };
  if (newPage > 0) {
    query.page = newPage;
    await router.push({ query });
  } else {
    delete query.page;
    await router.push({ query });
  }
  const newQuery = handleFormQueryParams();
  await handleGetCalls(newQuery);
}

//get total pages
const getTotalPages = computed(() => {
  let page = calls.value.total / calls.value.per_page;
  page = Math.ceil(page);
  return page > 0 ? page : 1;
});

const handleGetCalls = async (queryParamsList) => {
  await callsStore.get_calls(queryParamsList);
};
const handleFormQueryParams = () => {
  const queryParams = router.currentRoute.value.query;
  const queryParamsList = [];
  console.log(queryParams)

if (queryParams.page) {
    let page = parseInt(queryParams.page) || 1;
    queryParamsList.push(`page=${page}`);
  }
  if (queryParams.from) {
    filterOptions.value.form.selected = queryParams.from;
    queryParamsList.push(`from=${queryParams.from}`);

  }
  if (queryParams.to) {
    filterOptions.value.to.selected = queryParams.to;
    queryParamsList.push(`to=${queryParams.to}`);
  }
  if (queryParams.call_id) {
    filterOptions.value.call_id.selected = queryParams.call_id;
    queryParamsList.push(`call_id=${queryParams.call_id}`);
  }

  return queryParamsList.length > 0 ? `?${queryParamsList.join('&')}` : '';
};

const handleSetFilterOptions = () => {
  const queryParams = router.currentRoute.value.query;
  if (queryParams.from) {
    filterOptions.value.form.selected = queryParams.from;
  }
  if (queryParams.to) {
    filterOptions.value.to.selected = queryParams.to;
  }
  if (queryParams.call_id) {
    filterOptions.value.call_id.selected = queryParams.call_id;
  }
};

onMounted( () => {

  let queryParamsList = handleFormQueryParams();

  //page number is not present in the query params then add it
  if (!router.currentRoute.value.query.page) {
    queryParamsList = queryParamsList ? `${queryParamsList}&page=1` : '?page=1';
  }
  handleSetFilterOptions();
  handleGetCalls(queryParamsList);
});
</script>

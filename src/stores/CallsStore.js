import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeToRefs } from 'pinia'
import axiosInstance from '../config.js'
import router from '../router/index.js'

import { useAuthenticationStore } from '../stores/Authentication'
const authenticationStore = useAuthenticationStore()
const { token, flashMessage } = storeToRefs(authenticationStore)

export const useCallsStore = defineStore('calls', () => {
  const calls = ref({})
  const loading = ref(false)

  function get_calls(query, limit = 20) {
    loading.value = true
    axiosInstance
      .get('/api/call' + query + '&limit=' + limit, {
        headers: {
          Authorization: 'Bearer ' + token.value
        }
      })
      .then((res) => {
        calls.value = res.data
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          authenticationStore.logout
        }
        if (error.response && error.response.status == 404) {
          router.push({
            name: '404Resource',
            params: { resource: 'calls' }
          })
        } else {
          router.push({ name: 'NetworkError' })
        }
      })
      .finally(() => {
        loading.value = false
      })
  }
   function delete_call (id) {
    loading.value = true
      axiosInstance
      .delete('/api/call/' + id, {
        headers: {
          Authorization: 'Bearer ' + token.value
        }
      })
      .then((res) => {
        flashMessage.value = 'Call deleted successfully'
        setTimeout(() => {
          flashMessage.value = ''
        }, 3000)
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          authenticationStore.logout
        }
        if (error.response && error.response.status == 404) {
          router.push({
            name: '404Resource',
            params: {resource: 'calls'}
          })
        } else {
          router.push({name: 'NetworkError'})
        }

      })
      .finally(() => {
        loading.value = false
      })
  }
  return { calls, loading, get_calls, delete_call }
})
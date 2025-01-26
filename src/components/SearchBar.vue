<template>
  <div class="flex flex-row border border-gray-400 rounded-lg overflow-hidden bg-white">
    <input
      type="text"
      :placeholder="placeholder"
      v-model="search"
      class="border-r border-gray-400 py-1.5 px-3"
    />
    <SearchIcon :classes="'m-1.5'" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import SearchIcon from './icons/SearchIcon.vue'
import { bookApi } from '@/services/bookApi'
import { useSelectSearchStore } from '@/stores/useSelectSearchStore'
import { storeToRefs } from 'pinia'

const apiService = bookApi()

const placeholder = ref<string>('Escribe el nombre del libro')

const search = ref<string>('')

const store = useSelectSearchStore()
const {valueSelected} = storeToRefs(store)

watch(search, async (newValue) => {

  if(valueSelected.value === 'title'){
    await apiService.getBooks(newValue)
  } else if(valueSelected.value === 'author'){
    await apiService.getByAuthors(newValue)
  } else if(valueSelected.value === 'isbn'){
    await apiService.getByISBN(newValue)
  }

})
</script>

<template>
  <header class="flex flex-col gap-1 items-center py-4 bg-primary">
    <router-link to="/" class="outline-hidden">
      <h1 class="text-4xl font-black tracking-wider text-white">Found Books</h1>
    </router-link>

    <section class="flex flex-row gap-4">

      <InputSelect
        :selected="selected"
        :selectValues="valuesSelect"
        :functionChangeValue = "setValueSelected"
        :functionChangeSelect = "setSelected"
      />

      <div class="flex flex-row border border-gray-400 rounded-lg overflow-hidden bg-white">
        <input
          type="text"
          :placeholder="placeholder"
          class="border-r border-gray-400 py-1.5 px-3"
        />
        <SearchIcon :classes="'m-1.5'"/>
      </div>
    </section>
  </header>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import SearchIcon from './icons/SearchIcon.vue'
import { useSelectSearchStore } from '@/stores/useSelectSearchStore'
import type { selectOption } from '@/interfaces/selectOption'
import InputSelect from '@/components/InputSelect.vue'
const placeholder = ref<string>('Escribe el nombre del libro')

const valuesSelect : selectOption[] = [
  {
    value: 'title',
    text: 'Título'
  },
  {
    value: 'author',
    text: 'Autor'
  },
  {
    value: 'isbn',
    text: 'ISBN'
  },
]

const { selected ,setSelected, setValueSelected} = useSelectSearchStore()

</script>

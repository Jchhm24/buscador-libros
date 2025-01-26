<template>
  <header class="flex flex-col items-center gap-1 py-4 bg-primary">
      <h1 class="text-4xl font-black tracking-wider text-white">Found Books</h1>
    <section class="flex flex-row gap-4">
      <InputSelect
        :selected="selected"
        :selectValues="valuesSelect"
        :functionChangeValue="setValueSelected"
        :functionChangeSelect="setSelected"
      />

      <SearchBar />
    </section>
  </header>
  <HomeView/>
</template>

<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import { useSelectSearchStore } from '@/stores/useSelectSearchStore'
import type { selectOption } from '@/interfaces/selectOption'
import InputSelect from '@/components/InputSelect.vue'
import HomeView from './views/HomeView.vue'

const valuesSelect: selectOption[] = [
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
  }
]

const { selected, setSelected, setValueSelected } = useSelectSearchStore()
</script>

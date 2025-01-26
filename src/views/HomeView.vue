<template>
  <main class="grid grid-cols-(--grid-cols-response) gap-4 py-6 px-30">
    <div
      v-for="(item, index) in paginatedItems"
      :key="index"
      class="flex flex-row gap-4 border-2 border-gray-600/25 rounded-lg overflow-hidden p-4"
    >
      <img
        :src="item.coverUrl"
        :alt="item.title"
        class="object-cover min-w-[160px] rounded-lg shadow-lg"
        v-if="item.coverUrl"
      />

      <div v-else class="min-w-[160px] bg-gray-200 rounded-lg shadow-lg"></div>

      <article class="flex flex-col gap-2">
        <h2 class="text-xl font-bold">
          {{ item.title }}
        </h2>

          <span>
            Por:
            <span class="text-sky-500 underline">
              {{ item.author_name.join(', ') }}
            </span>
          </span>

        <span> Publicado el: {{ item.first_publish_year }} </span>
      </article>
    </div>
  </main>

  <!-- Sección de paginación -->
  <div class="flex justify-center gap-4 my-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-sky-500 text-white rounded-lg disabled:opacity-50"
      >
        Anterior
      </button>
      <span class="py-2">Página {{ currentPage }} de {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-sky-500 text-white rounded-lg disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>

</template>
<script setup lang="ts">
import { useSearchFoundStore } from '@/stores/useSearchFoundStore'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const store = useSearchFoundStore()
const { searchFound } = storeToRefs(store)

// Configuración de la paginación
const itemsPerPage = 12
const currentPage = ref<number>(1)

// Cálculos de paginación
const totalPages = computed(() => Math.ceil(searchFound.value.length / itemsPerPage))
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return searchFound.value.slice(start, end)
})

// Métodos de paginación
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

</script>

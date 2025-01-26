<template>
  <main class="grid grid-cols-(--grid-cols-response) gap-4 py-6 px-30">
    <div
      v-for="(item, index) in searchFound"
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

        <router-link to="/[author]" :params="{ author: item.author_name.join(', ') }">
          <span>
            Por:
            <span class="text-sky-500 underline">
              {{ item.author_name.join(', ') }}
            </span>
          </span>
        </router-link>

        <span> Publicado el: {{ item.first_publish_year }} </span>
      </article>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useSearchFoundStore } from '@/stores/useSearchFoundStore'
import { storeToRefs } from 'pinia'

const store = useSearchFoundStore()
const { searchFound } = storeToRefs(store)
</script>

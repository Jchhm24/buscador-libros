<template>
  <div class="flex flex-col gap-4 items-center relative">
    <button
      @click="openSelect"
      class="flex flex-row gap-4 py-1.5 px-3 text-white rounded-lg outline-hidden w-max border-2 border-white/50"
      :class="state ? 'bg-white/15' : 'bg-white/25'"
    >
      {{ optionSelected }}
      <div
        class="transition-transform duration-300 w-max"
        :class="state ? 'transform rotate-180' : 'transform rotate-0'"
      >
        <ArrowICon :classes="'fill-white'" />
      </div>
    </button>

    <Transition name="slide-fade">
      <div
        v-if="state"
        class="flex flex-col absolute mt-12 border-2 bg-white/50 backdrop-blur-2xl border-gray-300 w-full rounded-lg overflow-hidden options-select"
      >
        <button
          v-for="selectValue in selectValues"
          :key="selectValue.value"
          @click="changeSelect(selectValue.text, selectValue.value)"
          class="py-1.5 px-3 outline-hidden"
          :class="optionSelected === selectValue.text ? 'bg-gray-300 text-white' : 'text-black'"
        >
          {{ selectValue.text }}
        </button>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { useState } from '@/hooks/useState'
import ArrowICon from './icons/ArrowICon.vue'
import type { selectOption } from '@/interfaces/selectOption'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  selected: string
  selectValues: selectOption[]
  functionChangeValue: (value: string) => void
  functionChangeSelect: (value: string) => void
}>()

const { state, changeState, changeStateTo } = useState()

const openSelect = () => {
  changeState()
}

const optionSelected = ref<string>(props.selectValues[0].text)

const changeSelect = (text: string, value: string) => {
  props.functionChangeSelect(text)
  props.functionChangeValue(value)
  optionSelected.value = text
}

onMounted(() => {
  // Asignar un valor por defecto o ya seleccionado
  if (props.selected === '') {
    props.functionChangeSelect(props.selectValues[0].text)
    props.functionChangeValue(props.selectValues[0].value)
  } else {
    optionSelected.value = props.selected
  }

  //Cerrar haciendo click fuera del select
  window.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.options-select') && !target.closest('.w-max')) {
      changeStateTo
      (false
        
      )
    }
  })
})
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>

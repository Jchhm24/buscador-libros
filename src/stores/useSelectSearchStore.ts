import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSelectSearchStore = defineStore('selectSearch', () => {
  const selected = ref<string>('')
  const valueSelected = ref<string>('')

  const setSelected = (value: string) => {
    selected.value = value
  }

  const setValueSelected = (value: string) => {
    valueSelected.value = value
  }

  return {
    selected,
    valueSelected,
    setSelected,
    setValueSelected
  }
})

import { ref } from "vue"

export const useState = (initState?: boolean) => {
  const state = ref<boolean>(initState || false)

  const changeState = () => {
    state.value = !state.value
  }

  const changeStateTo = (value: boolean) => {
    state.value = value
  }

  return {
    state,
    changeState,
    changeStateTo
  }
}

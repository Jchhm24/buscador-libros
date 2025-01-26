import type { Book } from "@/interfaces/Books";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchFoundStore = defineStore('searchFound',() => {
  const searchFound = ref<Book[]>([])

  const setSearchFound = (books: Book[]) : void => {
    searchFound.value = books
  }

  const getSearchFound = () : Book[] => {
    return searchFound.value
  }

  return {
    searchFound,
    setSearchFound,
    getSearchFound
  }

})

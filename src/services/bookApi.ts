import type { Book } from '@/interfaces/Books'
import { api } from './api'
import { useSearchFoundStore } from '@/stores/useSearchFoundStore'

export const bookApi = () => {
  const getBooks = async (book: string): Promise<Book[]> => {
    const query = book.trim()
    try {
      const response = await api.get('', {
        params: {
          title: query
        }
      })

      const booksFound = response.data.docs.map((book: Book) => ({
        title: book.title,
        author_name: book.author_name,
        first_publish_year: book.first_publish_year,
        cover_i: book.cover_i,
        coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null
      }))

      //console.log('Books found:', booksFound)

      useSearchFoundStore().setSearchFound(booksFound)
      return booksFound
    } catch (error) {
      throw error
    }
  }

  const getAuthors = async (author: string) => {
    try {
      const response = await api.get('', {
        params: {
          author: author
        }
      })
      return response.data.docs
    } catch (error) {
      throw error
    }
  }

  return {
    getBooks,
    getAuthors
  }
}

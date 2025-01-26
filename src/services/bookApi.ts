import type { Book } from '@/interfaces/Books'
import { api } from './api'
import { useSearchFoundStore } from '@/stores/useSearchFoundStore'
import axios from 'axios'

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

      useSearchFoundStore().setSearchFound(booksFound)
      return booksFound
    } catch (error) {
      console.error('Error buscando libros:', error)
      return []
    }
  }

  const getByAuthors = async (author: string): Promise<Book[]> => {
    const query = author.trim()
    try {
      const response = await api.get('', {
        params: {
          author: query,
          sort: 'new'
        }
      })

      const booksFound = response.data.docs.map((book: Book) => ({
        title: book.title,
        author_name: book.author_name,
        first_publish_year: book.first_publish_year,
        cover_i: book.cover_i,
        coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null
      }))

      useSearchFoundStore().setSearchFound(booksFound)
      return booksFound
    } catch (error) {
      console.error('Error buscando autores:', error)
      return []
    }
  }

    const getByISBN = async (isbn: string): Promise<Book[]> => {
    const query = isbn.trim();
    try {
      const response = await axios.get(`https://openlibrary.org/api/books`, {
        params: {
          bibkeys: `ISBN:${query}`,
          format: 'json',
          jscmd: 'data'
        }
      });

      const bookData = response.data[`ISBN:${query}`];

      if (!bookData) {
        console.warn(`No se encontró información para el ISBN: ${query}`);
        return [];
      }

      interface OpenLibraryAuthor {
        name: string;
        url?: string;
      }
      const book: Book = {
        title: bookData.title || 'Sin título',
        // Mapear array de autores a array de nombres
        author_name: bookData.authors?.map((author: OpenLibraryAuthor) => author.name) || ['Autor desconocido'],
        first_publish_year: bookData.publish_date,
        cover_i: undefined,
        // Usar URL de imagen mediana o grande si está disponible
        coverUrl: bookData.cover
          ? bookData.cover.medium || bookData.cover.large
          : null
      };

      useSearchFoundStore().setSearchFound([book]);
      return [book];
    } catch (error) {
      console.error('Error buscando por ISBN:', error);
      return [];
    }
  };

  return {
    getBooks,
    getByAuthors,
    getByISBN
  }
}

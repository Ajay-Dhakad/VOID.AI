// hooks/useFetch.js
import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url:any) => axios.get(url).then(res => res.data)

export default function useFetch(key:any, options = {}) {
  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    ...options,
  })

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

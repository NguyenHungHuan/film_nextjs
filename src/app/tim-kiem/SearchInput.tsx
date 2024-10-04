'use client'
import { useRouter } from 'next-nprogress-bar'
import PATH from '@/constants/path'

const SearchInput = () => {
  const router = useRouter()
  return (
    <input
        onChange={(e) => {
          const params = new URLSearchParams({
            keyword: e.target.value.trim(),
              page: '1'
          });
          router.push(`${PATH.search}?${params}`)
        }}
        type='text'
        defaultValue=''
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        placeholder='Nhập tên phim...'
        className='w-full p-3 rounded-[0.375rem] text-xl outline-none text-black'
      />
  )
}

export default SearchInput
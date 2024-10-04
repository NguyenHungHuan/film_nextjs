'use client'
import filmApis from '@/apis/filmApis'
import PATH from '@/constants/path'
import { useRouter } from 'next-nprogress-bar'
import { useEffect, useState } from 'react';

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
  paramType?: { type: string };
}

const Filter = ({ searchParams, paramType }: Props) => {
  const router = useRouter()
  const [dataGenres, setDataGenres] = useState<any[]>([]);
  const [dataCountries, setDataCountries] = useState<any[]>([]);

  useEffect(() => {
    const fetchGenresAndCountries = async () => {
      try {
        const [genresRes, countriesRes] = await Promise.all([
          filmApis.getGenres(),
          filmApis.getCountry(),
        ]);
        setDataGenres(genresRes.data.data.items);
        setDataCountries(countriesRes.data.data.items);
      } catch (error) {
        console.error('Error fetching genres or countries:', error);
      }
    };
    fetchGenresAndCountries();
  }, []);

  const handleChangeType = (value: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams({
      ...searchParams,
      page: '1',
    });
    router.push(`${PATH.list}/${value.target.value}?${params}`)
  }

  const handleChangeCategory = (value: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams({
      ...searchParams,
      page: '1',
      category: value.target.value
    });
    router.push(`${PATH.list}/${paramType ? paramType.type : 'phim-moi'}?${params}`)
  }

  const handleChangeCountry = (value: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams({
      ...searchParams,
      page: '1',
      country: value.target.value
    });
    router.push(`${PATH.list}/${paramType ? paramType.type : 'phim-moi'}?${params}`)
  }

  const handleChangeYear = (value: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams({
      ...searchParams,
      page: '1',
      year: value.target.value
    });
    router.push(`${PATH.list}/${paramType ? paramType.type : 'phim-moi'}?${params}`)
  }

  const handleChangeSort = (value: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams({
      ...searchParams,
      page: '1',
      sort_field: value.target.value
    });
    router.push(`${PATH.list}/${paramType ? paramType.type : 'phim-moi'}?${params}`)
  }

  return (
    <div className='bg-[#0e274073] py-4 px-[22px] grid grid-cols-2 md:grid-cols-5 items-center gap-[22px] rounded-[0.375rem] text-black'>
      <div className='text-lg flex flex-col'>
        <label htmlFor='typeFilm' className='mb-2 text-white'>
          Loại phim:
        </label>
        <div className='relative w-full before:content-[""] before:absolute before:border-[3px] before:rounded-sm before:rotate-45 before:w-3 before:h-3 before:top-[25%] before:right-4 before:border-t-transparent before:border-l-transparent before:border-blue-600 before:z-[4]'>
          <select
            onChange={(value) => handleChangeType(value)}
            name='type of film'
            id='typeFilm'
            className='cursor-pointer appearance-none w-full rounded-[0.375rem] outline-none py-[7px] pl-[11px] pr-[40px]'
            value={paramType ? paramType.type : 'phim-moi'}
          >
            <option value='phim-moi'>- Tất cả -</option>
            <option value='phim-le'>Phim lẻ</option>
            <option value='phim-bo'>Phim bộ</option>
            <option value='hoat-hinh'>Hoạt hình</option>
            <option value='tv-shows'>TV shows</option>
          </select>
        </div>
      </div>
      <div className='text-lg flex flex-col'>
        <label htmlFor='genreFilm' className='mb-2 text-white'>
          Thể loại:
        </label>
        <div className='relative w-full before:content-[""] before:absolute before:border-[3px] before:rounded-sm before:rotate-45 before:w-3 before:h-3 before:top-[25%] before:right-4 before:border-t-transparent before:border-l-transparent before:border-blue-600 before:z-[4]'>
          <select
            onChange={(value) => handleChangeCategory(value)}
            name='genre of film'
            id='genreFilm'
            className='cursor-pointer appearance-none w-full rounded-[0.375rem] outline-none py-[7px] pl-[11px] pr-[40px]'
            value={searchParams?.category}
          >
            <option value=''>- Tất cả -</option>
            {dataGenres &&
              dataGenres.map((item) => (
                <option key={item._id} value={item.slug}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className='text-lg flex flex-col'>
        <label htmlFor='countryFilm' className='mb-2 text-white'>
          Quốc gia:
        </label>
        <div className='relative w-full before:content-[""] before:absolute before:border-[3px] before:rounded-sm before:rotate-45 before:w-3 before:h-3 before:top-[25%] before:right-4 before:border-t-transparent before:border-l-transparent before:border-blue-600 before:z-[4]'>
          <select
            onChange={(value) => handleChangeCountry(value)}
            value={searchParams?.country}
            name='country of film'
            id='countryFilm'
            className='cursor-pointer appearance-none w-full rounded-[0.375rem] outline-none py-[7px] pl-[11px] pr-[40px]'
          >
            <option value=''>- Tất cả -</option>
            {dataCountries &&
              dataCountries.map((item) => (
                <option key={item._id} value={item.slug}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className='text-lg flex flex-col'>
        <label htmlFor='yearFilm' className='mb-2 text-white'>
          Năm:
        </label>
        <div className='relative w-full before:content-[""] before:absolute before:border-[3px] before:rounded-sm before:rotate-45 before:w-3 before:h-3 before:top-[25%] before:right-4 before:border-t-transparent before:border-l-transparent before:border-blue-600 before:z-[4]'>
          <select
            onChange={(value) => handleChangeYear(value)}
            value={searchParams?.year}
            name='year of film'
            id='yearFilm'
            className='cursor-pointer appearance-none w-full rounded-[0.375rem] outline-none py-[7px] pl-[11px] pr-[40px]'
          >
            <option value=''>- Tất cả -</option>
            {Array(15)
              .fill(0)
              .map((_, i) => (
                <option key={i} value={Number(new Date().getFullYear()) - i}>
                  {Number(new Date().getFullYear()) - i}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className='text-lg flex flex-col'>
        <label htmlFor='sortFilm' className='mb-2 text-white'>
          Sắp xếp:
        </label>
        <div className='relative w-full before:content-[""] before:absolute before:border-[3px] before:rounded-sm before:rotate-45 before:w-3 before:h-3 before:top-[25%] before:right-4 before:border-t-transparent before:border-l-transparent before:border-blue-600 before:z-[4]'>
          <select
            onChange={(value) => handleChangeSort(value)}
            value={searchParams?.sort_field}
            name='sort film'
            id='sortFilm'
            className='cursor-pointer appearance-none w-full rounded-[0.375rem] outline-none py-[7px] pl-[11px] pr-[40px]'
          >
            <option value='_id'>Ngày phát hành</option>
            <option value='modified.time'>Ngày cập nhật</option>
            <option value='view'>Lượt xem</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Filter

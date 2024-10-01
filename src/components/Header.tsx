'use client'
import PATH from '../constants/path'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()
  const [OpenNav, setOpenNav] = useState<boolean>(false)
  const [header, setHeader] = useState<boolean>(false)

  useEffect(() => {
    document.body.style.overflow = OpenNav ? 'hidden' : 'unset'
  }, [OpenNav])

  useEffect(() => {
    setOpenNav(false)
  }, [pathname])

  const handleChangeHeader = () => {
    if (window.scrollY >= 80) {
      setHeader(true)
    } else {
      setHeader(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleChangeHeader)
    return () => {
      window.removeEventListener('scroll', handleChangeHeader)
    }
  }, [])

  return (
    <header
      className={`text-white sticky top-0 z-20 left-0 right-0 transition-all duration-300 ${
        header ? 'bg-black/95' : 'bg-transparent'
      }`}
    >
      <div className='px-4 h-[56px] overflow-hidden flex items-center justify-between'>
        <div className='h-full flex items-center gap-4'>
          <Link
            href={PATH.home}
            title='VPhim'
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })
            }
          >
            <h1 title='Web xem phim miễn phí lớn nhất Việt Nam' className={`font-bold active:scale-90 text-4xl hover:text-rose-600 ${pathname === PATH.home ? 'text-rose-600' : 'text-rose-800'}`}>
              VNPhim
            </h1>
          </Link>
          <div className='hidden md:block'>
            <Navbar />
          </div>
        </div>
        {/* hamburger button */}
        <div className='flex md:hidden items-center gap-1'>
          <Link
            title='Tìm phim miễn phí tại VPhim'
            href={{
              pathname: PATH.search,
              query: {
                keyword: '',
                page: '1'
              }
            }}
            className={`hover:text-blue-600 hover:bg-blue-600/20 text-lg flex items-center justify-center gap-2 px-2 py-4 ${
                pathname === PATH.search && ' text-blue-600'
              }`}
          >
            <svg className='w-4 h-4 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
              <path d='M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z' />
            </svg>
            Tìm Kiếm
          </Link>
          <button
            title='Menu phim VPhim'
            onClick={() => setOpenNav((prev) => !prev)}
            className='flex flex-col gap-[5px] p-2'
          >
            <span
              className={`block w-6 h-[3px] rounded-full bg-gray-400 transition-all duration-300 ${OpenNav ? 'rotate-45 translate-y-2' : 'rotate-0'}`}
            />
            <span
              className={`block w-6 h-[3px] rounded-full bg-gray-400 transition-all duration-300 ${OpenNav ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`block w-6 h-[3px] rounded-full bg-gray-400 transition-all duration-300 ${OpenNav ? '-rotate-45 -translate-y-2' : 'rotate-0'}`}
            />
          </button>
        </div>
        {/* hamburger button open */}
        <div
          className={`${
            OpenNav ? 'translate-x-0' : 'translate-x-full'
          } duration-200 transition-all bg-[#06121e] h-full block md:hidden p-4 pt-10 fixed z-50 inset-0 overflow-y-auto top-[56px]`}
        >
          <ul className='flex flex-col text-2xl'>
            <li>
              <Link
                title='Xem phim hot nhất tại VPhim'
                href={{
                  pathname: PATH.hot,
                  query: {
                    type: `${PATH.odd}`,
                  }
                }}
                className={`hover:text-blue-600 hover:bg-blue-600/20 block text-center p-4 ${pathname === PATH.hot && ' text-blue-600'}`}
              >
                Phim Hot
              </Link>
            </li>
            <li>
              <Link
                title='Xem phim mới nhất tại VPhim'
                href={{
                  pathname: `${PATH.list}/${PATH.new}`,
                  query: {
                    page: '1',
                    sort_field: '',
                    category: '',
                    country: '',
                    year: ''
                  }
                }}
                className={`hover:text-blue-600 hover:bg-blue-600/20 block text-center p-4 ${pathname === `${PATH.list}/${PATH.new}` && ' text-blue-600'}`}
              >
                Phim Mới
              </Link>
            </li>
            <li>
              <Link
                title='Xem phim bộ hay nhất tại VPhim'
                href={{
                  pathname: `${PATH.list}/${PATH.series}`,
                  query: {
                    page: '1',
                    sort_field: '',
                    category: '',
                    country: '',
                    year: ''
                  }
                }}
                className={`hover:text-blue-600 hover:bg-blue-600/20 block text-center p-4 ${pathname === `${PATH.list}/${PATH.series}` && ' text-blue-600'}`}
              >
                Phim Bộ
              </Link>
            </li>
            <li>
              <Link
                title='Xem phim lẻ hay nhất tại VPhim'
                href={{
                  pathname: `${PATH.list}/${PATH.odd}`,
                  query: {
                    page: '1',
                    sort_field: '',
                    category: '',
                    country: '',
                    year: ''
                  }
                }}
                className={`hover:text-blue-600 hover:bg-blue-600/20 block text-center p-4 ${pathname === `${PATH.list}/${PATH.odd}` && ' text-blue-600'}`}
              >
                Phim Lẻ
              </Link>
            </li>
            <li>
              <Link
                title='Xem tv shows hay nhất tại VPhim'
                href={{
                  pathname: `${PATH.list}/${PATH.tvShows}`,
                  query: {
                    page: '1',
                    sort_field: '',
                    category: '',
                    country: '',
                    year: ''
                  }
                }}
                className={`hover:text-blue-600 hover:bg-blue-600/20 block text-center p-4 ${pathname === `${PATH.list}/${PATH.tvShows}` && ' text-blue-600'}`}
              >
                TV Shows
              </Link>
            </li>
            <li>
              <Link
                title='Xem phim hoạt hình hay nhất tại VPhim'
                href={{
                  pathname: `${PATH.list}/${PATH.anime}`,
                  query: {
                    page: '1',
                    sort_field: '',
                    category: '',
                    country: '',
                    year: ''
                  }
                }}
                className={`hover:text-blue-600 hover:bg-blue-600/20 block text-center p-4 ${pathname === `${PATH.list}/${PATH.anime}` && ' text-blue-600'}`}
              >
                Hoạt Hình
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
export default Header

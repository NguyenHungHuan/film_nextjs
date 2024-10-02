"use client"
import Link from 'next/link'
import PATH from '../constants/path'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  return (
    <nav className='text-white'>
      <ul className='flex items-center font-semibold text-base lg:text-lg'>
        <li>
          <Link
            title='Tìm phim miễn phí tại VNPhim'
            href={{
              pathname: PATH.search,
              query: {
                keyword: '',
                page: '1'
              }
            }}
            className={`hover:text-blue-600 hover:bg-blue-600/20 ${usePathname() === PATH.search ? 'text-blue-600 bg-blue-600/20' : ''} transition-all duration-200 flex items-center justify-center gap-2 px-2 py-4`
            }
          >
            <svg className='w-4 h-4 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
              <path d='M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z' />
            </svg>
            Tìm Kiếm
          </Link>
        </li>
        <li>
          <Link
            title='Xem phim hot nhất tại VNPhim'
            href={{
              pathname: PATH.hot,
              query: {
                type: `${PATH.odd}`,
              }
            }}
            className={`hover:text-blue-600 hover:bg-blue-600/20 ${usePathname() === PATH.hot ? 'text-blue-600 bg-blue-600/20' : ''} transition-all duration-200 px-2 py-4`}
          >
            Phim Hot
          </Link>
        </li>
        <li>
          <Link
            title='Xem phim mới nhất tại VNPhim'
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
            className={`hover:text-blue-600 hover:bg-blue-600/20 ${usePathname() === `${PATH.list}/${PATH.new}` ? 'text-blue-600 bg-blue-600/20' : ''} transition-all duration-200 px-2 py-4`}
          >
            Phim Mới
          </Link>
        </li>
        <li>
          <Link
            title='Xem phim bộ hay nhất tại VNPhim'
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
            className={`hover:text-blue-600 hover:bg-blue-600/20 ${usePathname() === `${PATH.list}/${PATH.series}` ? 'text-blue-600 bg-blue-600/20' : ''} transition-all duration-200 px-2 py-4`}
          >
            Phim Bộ
          </Link>
        </li>
        <li>
          <Link
            title='Xem phim lẻ hay nhất tại VNPhim'
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
            className={`hover:text-blue-600 hover:bg-blue-600/20 ${usePathname() === `${PATH.list}/${PATH.odd}` ? 'text-blue-600 bg-blue-600/20' : ''} transition-all duration-200 px-2 py-4`}
          >
            Phim Lẻ
          </Link>
        </li>
        <li>
          <Link
            title='Xem tv shows hay nhất tại VNPhim'
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
            className={`hover:text-blue-600 hover:bg-blue-600/20 ${usePathname() === `${PATH.list}/${PATH.tvShows}` ? 'text-blue-600 bg-blue-600/20' : ''} transition-all duration-200 px-2 py-4`}
          >
            TV Shows
          </Link>
        </li>
        <li>
          <Link
            title='Xem phim hoạt hình hay nhất tại VNPhim'
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
            className={`hover:text-blue-600 hover:bg-blue-600/20 ${usePathname() === `${PATH.list}/${PATH.anime}` ? 'text-blue-600 bg-blue-600/20' : ''} transition-all duration-200 px-2 py-4`}
          >
            Hoạt Hình
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default Navbar

import filmApis from "@/apis/filmApis"
import Card from "@/components/Card"
import PATH from "@/constants/path"
import Link from "next/link"

export default async function ListFilmHome() {
  const response = await Promise.all([
    filmApis.getListFilm(PATH.series, { sort_field: 'view', year: new Date().getFullYear().toString() }),
    filmApis.getListFilm(PATH.odd, { sort_field: 'view', year: new Date().getFullYear().toString() }),
     filmApis.getListFilm(PATH.series),
     filmApis.getListFilm(PATH.odd),
   ])
   const dataFilmSeries = response[0].data.data
   const dataFilmOdd = response[1].data.data
   const dataFilmSeriesNew = response[2].data.data
   const dataFilmOddNew = response[3].data.data

return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3'>
            {
              dataFilmSeries.items.slice(0, 5).map((item) => <Card key={item._id} data={item} />)
            }
            {
              dataFilmOdd.items.slice(0, 5).map((item) => <Card key={item._id} data={item} />)
            }
      </div>
      <div className='mt-8'>
        {title({ title: 'Phim lẻ mới cập nhật', titleSmall: 'Phim lẻ mới', link: `${PATH.odd}` })}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3'>
          {dataFilmOddNew.items.slice(0, 10).map((item) => <Card key={item._id} data={item} />)
            }
        </div>
      </div>
      <div className='mt-8'>
        {title({ title: 'Phim bộ mới cập nhật', titleSmall: 'Phim bộ mới', link: `${PATH.series}` })}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3'>
          {dataFilmSeriesNew.items.slice(0, 10).map((item) => <Card key={item._id} data={item} />)
            }
        </div>
      </div>
    </>
)}

const title = ({
  title,
  titleSmall = '',
  isHiddenArrow = false,
  link = ''
}: {
  title: string
  titleSmall?: string
  isHiddenArrow?: boolean
  link?: string
}) => {
  return (
    <div className='flex justify-between items-end pb-1 border-b border-[#1b3c5d]'>
      <h2 className='uppercase text-[#b1a21e] text-2xl font-display font-medium'>
        <span className='hidden sm:inline'>{title}</span>
        <span className='inline sm:hidden'>{titleSmall === '' ? title : titleSmall}</span>
      </h2>
      {!isHiddenArrow && (
        <Link
          href={{
            pathname: `${PATH.list}/${link}`,
            query: {
              page: '1',
              sort_field: 'modified.time',
              category: '',
              country: '',
              year: ''
            }
          }}
          className='text-white/80 hover:text-white text-lg p-1 whitespace-nowrap'
        >
          <span className='hidden sm:inline'>Xem tất cả</span>
          <span className='sm:hidden inline'>Thêm</span>
          <svg
            className='ml-1 w-2 h-[17px] fill-current inline'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 192 512'
          >
            <path d='M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z' />
          </svg>
        </Link>
      )}
    </div>
  )
}
import filmApis from '@/apis/filmApis'
import Card from '@/components/Card'
import Filter from '@/components/Filter'
import Pagination from '@/components/Pagination'
import PATH from '@/constants/path'
import { cache } from 'react'

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { type: string };
}

const getListFilm = cache(filmApis.getListFilm)

export async function generateMetadata({ searchParams, params }: Props) {
  const type = params.type;
  const response = await getListFilm(type, { ...searchParams })
  const dataFilm = response.data.data
  return {
    title: dataFilm.seoOnPage.titleHead.replace('2022', `${new Date().getFullYear()}`),
    description: dataFilm.seoOnPage.descriptionHead.replace('2022', `${new Date().getFullYear()}`),
    keywords: 'Xem phim, Xem phim online, Film, Films, TV shows, Anime, anime, tv shows, series, film series, Phim goc, Xem phim gốc, xem phim gốc, xem phim, Xem phim hot, Xem phim hay, Xem phim ngôn tình, Xem phim hành động, Xem phim kinh dị, Xem phim Hàn quốc, xem phim nhật bản, xem phim trung quốc, xem phim thái lan, xem phim ma, xem phim mới nhất, xem phim mới, xem phim hay, xem phim âu mỹ, xem phim anh, vphim, VPhim, motphim, dongphim, dongphym, motchill, xemphim, phimblur, phimblu',
    authors: [{ name: 'Xem phim VPhim - Nguyễn Hùng Huân', url: 'https://vnphim.vercel.app/' }],
    openGraph: {
      title: dataFilm.seoOnPage.titleHead.replace('2022', `${new Date().getFullYear()}`),
      description: dataFilm.seoOnPage.descriptionHead.replace('2022', `${new Date().getFullYear()}`),
      url: `https://vnphim.vercel.app${PATH.list}/${type}?${new URLSearchParams({
      ...searchParams,
      page: `${dataFilm.params.pagination.currentPage}`,
    })}`,
      siteName: 'Xem phim VPhim - Nguyễn Hùng Huân - Nextjs Project',
      images: [
        {
          url: `/share.png`,
        },
      ],
      locale: 'vi_VN',
      type: 'website',
    },
    alternates: {
      canonical: `https://vnphim.vercel.app${PATH.list}/${type}?${new URLSearchParams({
      ...searchParams,
      page: `${dataFilm.params.pagination.currentPage}`,
    })}`,
    },
  }
}

const List = async ({ searchParams, params }: Props) => {
  const response = await getListFilm(params.type, { ...searchParams })
  const dataFilm = response.data.data

  return (
      <div className='container px-2 md:px-6 mt-[45px]'>
        <Filter searchParams={searchParams} paramType={params}/>
        {dataFilm.items.length > 0 && (
          <>
            <div className='mt-4'>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3'>
                {dataFilm.items.map((item) => (
                  <Card key={item._id} data={item} />
                ))}
              </div>
            </div>
            <div className='mt-4'>
              <Pagination
                queryConfig={{...searchParams}}
                page={dataFilm.params.pagination.currentPage}
                totalPage={Math.ceil(
                  dataFilm.params.pagination.totalItems / dataFilm.params.pagination.totalItemsPerPage
                )}
              />
            </div>
          </>
        )}
        {dataFilm && dataFilm.items.length <= 0 && (
          <p className='w-full h-[50vh] text-center text-xl text-white flex justify-center items-center'>
            Không tìm thấy phim với kết quả tìm kiếm.
          </p>
        )}
      </div>
  )
}
export default List

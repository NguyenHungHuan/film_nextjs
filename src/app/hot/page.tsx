import filmApis from "@/apis/filmApis"
import List from "@/app/hot/list";
import PATH from "@/constants/path"
import Link from "next/link"
import { Suspense } from "react";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ searchParams }: Props) {
  const type = typeof searchParams.type === 'string' ? searchParams.type : `${PATH.odd}`;
  const response = await filmApis.getListFilm(type, { page: '1', sort_field: 'view' })
  const dataFilmHotPage1 = response.data.data
  return {
    title: dataFilmHotPage1.seoOnPage.titleHead.replace('2022', `${new Date().getFullYear()}`),
    description: dataFilmHotPage1.seoOnPage.descriptionHead.replace('2022', `${new Date().getFullYear()}`),
    keywords: 'Xem phim, Xem phim online, Film, Films, TV shows, Anime, anime, tv shows, series, film series, Phim goc, Xem phim gốc, xem phim gốc, xem phim, Xem phim hot, Xem phim hay, Xem phim ngôn tình, Xem phim hành động, Xem phim kinh dị, Xem phim Hàn quốc, xem phim nhật bản, xem phim trung quốc, xem phim thái lan, xem phim ma, xem phim mới nhất, xem phim mới, xem phim hay, xem phim âu mỹ, xem phim anh, vphim, VPhim, motphim, dongphim, dongphym, motchill, xemphim, phimblur, phimblu',
    authors: [{ name: 'Xem phim VPhim - Nguyễn Hùng Huân', url: 'https://vnphim.vercel.app/' }],
    openGraph: {
      title: dataFilmHotPage1.seoOnPage.titleHead.replace('2022', `${new Date().getFullYear()}`),
      description: dataFilmHotPage1.seoOnPage.descriptionHead.replace('2022', `${new Date().getFullYear()}`),
      url: `https://vnphim.vercel.app${PATH.hot}?type=${type}`,
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
      canonical: `https://vnphim.vercel.app${PATH.hot}?type=${type}`,
    },
  }
}

const Hot = ({ searchParams }: Props) => {
  const type = typeof searchParams.type === 'string' ? searchParams.type : `${PATH.odd}`;

  return (
    <div className='container mt-14 px-4'>
      <h2 className='text-4xl font-medium text-white text-center'>Top phim hot nhất</h2>
      <div className='bg-[#0e274073] pt-1 grid grid-cols-2 md:grid-cols-4 items-center justify-center mt-4 text-white text-lg'>
        <Link
        href={{
          query: {
            type: `${PATH.odd}`
          }
        }}
          title='Top phim lẻ hot nhất'
          className={`hover:border-blue-600 text-center hover:text-blue-600 transition-all duration-200 py-2 px-12 border-b whitespace-nowrap ${type === PATH.odd ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
        >
          Phim lẻ
        </Link>
        <Link
        href={{
          query: {
            type: `${PATH.series}`
          }
        }}
          title='Top phim bộ hot nhất'
          className={`hover:border-blue-600 text-center hover:text-blue-600 transition-all duration-200 py-2 px-12 border-b whitespace-nowrap ${type === PATH.series ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
        >
          Phim bộ
        </Link>
        <Link
        href={{
          query: {
            type: `${PATH.anime}`
          }
        }}
          title='Top phim hoạt hình hot nhất'
          className={`hover:border-blue-600 text-center hover:text-blue-600 transition-all duration-200 py-2 px-12 border-b whitespace-nowrap ${type === PATH.anime ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
        >
          Hoạt hình
        </Link>
        <Link
        href={{
          query: {
            type: `${PATH.tvShows}`
          }
        }}
          title='Top tv shows hot nhất'
          className={`hover:border-blue-600 text-center hover:text-blue-600 transition-all duration-200 py-2 px-12 border-b whitespace-nowrap ${type === PATH.tvShows ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
        >
          TV shows
        </Link>
      </div>
      <div className='mt-4'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3'>
          <Suspense key={type} fallback={skeleton()}>
            <List type={type}/>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
export default Hot
const skeleton = () => (
  <>
    {Array(20)
      .fill(0)
      .map((_, i) => (
        <div key={i} className='flex flex-col animate-pulse'>
          <div className='h-[210px] sm:h-[384px] w-full mb-1 bg-slate-700' />
          <div className='h-2 w-[80%] mt-1 rounded-full bg-slate-700' />
          <div className='h-2 w-[60%] mt-2 rounded-full bg-slate-700' />
        </div>
      ))}
  </>
)
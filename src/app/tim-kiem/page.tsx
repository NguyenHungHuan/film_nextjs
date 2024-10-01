import filmApis from '@/apis/filmApis';
import List from '@/app/tim-kiem/list';
import SearchInput from '@/app/tim-kiem/SearchInput'
import PATH from '@/constants/path';
import { Suspense, cache } from 'react'

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ searchParams }: Props) {
  const keyword = typeof searchParams.keyword === 'string' ? searchParams.keyword : '';
  const page = typeof searchParams.page === 'string' ? searchParams.page : '1';
  const response = await filmApis.getSearchFilm({
    keyword: keyword.trim(),
    page: page,
  })
  const dataSearch = response.data.data
  return {
    title: `${dataSearch.seoOnPage.titleHead.replace('2022', `${new Date().getFullYear()}`)}`,
    description: `${dataSearch.seoOnPage.descriptionHead.replace('2022', `${new Date().getFullYear()}`)}`,
    keywords: 'Xem phim, Xem phim online, Film, Films, TV shows, Anime, anime, tv shows, series, film series, Phim goc, Xem phim gốc, xem phim gốc, xem phim, Xem phim hot, Xem phim hay, Xem phim ngôn tình, Xem phim hành động, Xem phim kinh dị, Xem phim Hàn quốc, xem phim nhật bản, xem phim trung quốc, xem phim thái lan, xem phim ma, xem phim mới nhất, xem phim mới, xem phim hay, xem phim âu mỹ, xem phim anh, vphim, VPhim, motphim, dongphim, dongphym, motchill, xemphim, phimblur, phimblu',
    authors: [{ name: 'Xem phim VPhim - Nguyễn Hùng Huân', url: 'https://vphim.onrender.com/' }],
    openGraph: {
      title: dataSearch.seoOnPage.titleHead.replace('2022', `${new Date().getFullYear()}`),
      description: dataSearch.seoOnPage.descriptionHead.replace('2022', `${new Date().getFullYear()}`),
      url: `https://vnphim.vercel.app${PATH.search}?keyword=${keyword}&page=${page}`,
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
      canonical: `https://vnphim.vercel.app${PATH.search}?keyword=${keyword}&page=${page}`,
    },
  }
}

const Search = ({ searchParams }: Props) => {
  const keyword = typeof searchParams.keyword === 'string' ? searchParams.keyword : '';
  const page = typeof searchParams.page === 'string' ? searchParams.page : '1';
  const queryParams = { keyword, page }; 
  return (
    <>
      <div className='container px-4 mt-14'>
        <SearchInput />
        <Suspense key={queryParams.page} fallback={skeleton()}>
        <Suspense key={queryParams.keyword} fallback={skeleton()}>
          <List queryParams={queryParams}/>
        </Suspense>
        </Suspense>
      </div>
    </>
  )
}
export default Search
const skeleton = () => (
  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3'>
    {Array(10)
      .fill(0)
      .map((_, i) => (
        <div key={i} className='flex flex-col animate-pulse'>
          <div className='h-[210px] sm:h-[384px] w-full mb-1 bg-slate-700' />
          <div className='h-2 w-[80%] mt-1 rounded-full bg-slate-700' />
          <div className='h-2 w-[60%] mt-2 rounded-full bg-slate-700' />
        </div>
      ))}
  </div>
)
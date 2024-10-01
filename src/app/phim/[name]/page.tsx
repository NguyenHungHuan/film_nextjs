import Link from 'next/link'
import PATH from '@/constants/path'
import filmApis from '@/apis/filmApis'
import Image from 'next/image'
import TrailerModal from '@/app/phim/[name]/trailerModal'
import { cache } from 'react'
import DOMPurify from "isomorphic-dompurify"

const getFilm = cache(filmApis.getFilm)

export async function generateMetadata({params} : {params: {name: string}}) {
  const response = await getFilm(params.name)
  const dataFilm = response.data.data
  return {
    title: `${dataFilm.seoOnPage.titleHead}`,
    description: `${dataFilm.seoOnPage.descriptionHead}`,
    keywords: 'Xem phim, Xem phim online, Film, Films, TV shows, Anime, anime, tv shows, series, film series, Phim goc, Xem phim gốc, xem phim gốc, xem phim, Xem phim hot, Xem phim hay, Xem phim ngôn tình, Xem phim hành động, Xem phim kinh dị, Xem phim Hàn quốc, xem phim nhật bản, xem phim trung quốc, xem phim thái lan, xem phim ma, xem phim mới nhất, xem phim mới, xem phim hay, xem phim âu mỹ, xem phim anh, vphim, VPhim, motphim, dongphim, dongphym, motchill, xemphim, phimblur, phimblu',
    authors: [{ name: 'Xem phim VPhim - Nguyễn Hùng Huân', url: 'https://vphim.onrender.com/' }],
    openGraph: {
      title: dataFilm.seoOnPage.titleHead,
      description: dataFilm.seoOnPage.descriptionHead,
      url: `https://vnphim.vercel.app${PATH.film}/${params.name}`,
      siteName: 'Xem phim VPhim - Nguyễn Hùng Huân - Nextjs Project',
      images: [
        {
          url: `http://img.ophim1.com/uploads/movies/${dataFilm.item.thumb_url}`,
        },
      ],
      locale: 'vi_VN',
      type: 'website',
    },
    alternates: {
      canonical: `https://vnphim.vercel.app${PATH.film}/${params.name}`,
    },
  }
}

const  Detail = async ({params} : {params: {name: string}})  => {
  const response = await getFilm(params.name)
  const dataFilm = response.data.data
  console.log(dataFilm)

  return (
    <>
      <div
        className='h-[600px] overflow-hidden -mt-[56px] bg-cover bg-no-repeat bg-[50%_0] relative before:content-[""] before:absolute before:w-full before:top-0 before:bottom-0 before:bg-[#020d18bf]'>
        <Image
          title={dataFilm.item.name}
          src={`http://img.ophim1.com/uploads/movies/${dataFilm.item.poster_url}`}
          width={640}
          height={360}
          priority
          alt={dataFilm.item.name}
          className='w-full h-full object-cover object-top'
          />
      </div>
      <div className='container px-4 -mt-[360px] pt-3 relative z-10'>
        <div className='flex-col md:flex-row flex gap-11 md:gap-[64px]'>
          <div className='flex-shrink-0 flex flex-col items-center'>
            <Image
              title={dataFilm.item.name}
              src={`http://img.ophim1.com/uploads/movies/${dataFilm.item.thumb_url}`}
              width={256}
              height={384}
              priority
              alt={dataFilm.item.name}
              className='w-[282px] h-[432px] object-cover'
            />
            {dataFilm.item.episode_current.toLowerCase() === 'trailer' ? (
              <div
                title={`Xem phim ${dataFilm.item.name}`}
                className='flex items-center justify-center gap-3 text-white uppercase text-xl bg-red-700/40 w-full rounded p-[7px] mt-4'
              >
                chưa có phim
              </div>
            ) : (
              <Link
                href={`${PATH.watch}/${dataFilm.item.slug}`}
                title={`Xem phim ${dataFilm.item.name}`}
                className='active:scale-90 flex items-center justify-center gap-3 text-white uppercase text-xl bg-red-700/80 hover:bg-red-700 w-full rounded p-[7px] mt-4'
              >
                <svg className='fill-white w-5 h-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                  <path d='M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z' />
                </svg>
                xem phim
              </Link>
            )}
          </div>
          <div className='flex-1 pt-3'>
            <h1 title={dataFilm.item.origin_name} className='text-white text-5xl font-heading1 leading-[45px] mb-3'>
              {dataFilm.item.origin_name}
            </h1>
            <h2 title={dataFilm.item.name} className='text-[#b5b5b5] text-2xl break-all leading-[30px] mb-8'>
              {dataFilm.item.name} (<strong className='text-[#428bca] font-normal'>{dataFilm.item.year}</strong>)
            </h2>
            <span
              title={`Thời lượng phim ${dataFilm.item.time}`}
              className='inline-block cursor-help mb-8 md:mb-10 text-white text-lg'
            >
              {dataFilm.item.time ? dataFilm.item.time : 'Đang cập nhật'}
            </span>
            {dataFilm.item.episode_current.toLowerCase() === 'trailer' ? (
              <span
                title={`Cập nhật ${dataFilm.item.episode_current}`}
                className='text-white mb-8 md:mb-10 cursor-help w-max block p-[2px] px-[10px] rounded-[4px] bg-yellow-400/80'
              >
                {dataFilm.item.episode_current}
              </span>
            ) : (
              <div className='flex gap-3 mb-8 md:mb-10'>
                <span
                  title={`Độ phân giải ${dataFilm.item.quality}`}
                  className='text-white cursor-help w-max block p-[2px] px-[10px] rounded-[4px] bg-rose-600/80'
                >
                  {dataFilm.item.quality}
                </span>
                <span
                  title={`Cập nhật ${dataFilm.item.episode_current} - ${dataFilm.item.lang}`}
                  className='text-white cursor-help w-max block p-[2px] px-[10px] rounded-[4px] bg-yellow-400/80'
                >
                  {dataFilm.item.episode_current} {dataFilm.item.lang}
                </span>
              </div>
            )}

            <div className='block lg:flex items-start justify-between gap-6'>
              <div className='flex items-center flex-wrap gap-2 mt-3 mb-6 md:mb-12'>
                {dataFilm.item.category.map((item) => (
                  <Link
                    title={`Thể loại ${item.name}`}
                    key={item.id}
                    href={{
                      pathname: `${PATH.list}/${PATH.new}`,
                      query: {
                        category: item.slug
                      }
                    }}
                    className='border border-white py-[5px] px-[15px] text-white text-xs rounded-full hover:text-blue-600 hover:bg-white'
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className='mb-6'>
              <p className='mb-1 text-[#7a7a7a] flex'>
                <span className='w-[120px] flex-shrink-0 inline-block uppercase'>Đạo diễn</span>
                <span className='text-white font-medium'>
                  {dataFilm.item.director[0] !== '' ? dataFilm.item.director.join(', ') : 'Đang cập nhật'}
                </span>
              </p>
              <p className='mb-1 text-[#7a7a7a] flex'>
                <span className='w-[120px] flex-shrink-0 inline-block uppercase'>Diễn viên</span>
                <span className='text-white font-medium break-all'>
                  {dataFilm.item.actor[0] !== '' ? dataFilm.item.actor.join(', ') : 'Đang cập nhật'}
                </span>
              </p>
              <p className='mb-1 text-white uppercase'>
                <span className='w-[120px] inline-block text-[#7a7a7a]'>Quốc gia</span>
                {dataFilm.item.country.map((item, index) =>
                  index > 0 ? (
                    <div key={item.id}>
                      {', '}{' '}
                      <Link
                        title={`Tìm kiếm ${item.name}`}
                        href={{
                          pathname: `${PATH.list}/${PATH.new}`,
                          query: {
                            country: item.slug
                          }
                        }}
                        className='font-medium capitalize hover:underline'
                      >
                        {item.name}
                      </Link>
                    </div>
                  ) : (
                    <Link
                      title={`Tìm kiếm ${item.name}`}
                      key={item.id}
                      href={{
                        pathname: `${PATH.list}/${PATH.new}`,
                        query: {
                          country: item.slug
                        }
                      }}
                      className='font-medium capitalize hover:underline'
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </p>
              <p className='mb-1 text-[#7a7a7a] uppercase'>
                <span className='w-[120px] inline-block'>Khởi chiếu</span>
                <Link
                  title={`Tìm kiếm ${dataFilm.item.year}`}
                  href={{
                    pathname: `${PATH.list}/${PATH.new}`,
                    query: {
                      year: dataFilm.item.year.toString() as string
                    }
                  }}
                  className='text-white font-medium capitalize hover:underline'
                >
                  {dataFilm.item.year}
                </Link>
              </p>
            </div>
            <p
              className='text-[#b5b5b5]'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(dataFilm.item.content)
              }}
            />
            <h3 className='text-white uppercase font-semibold mt-7 mb-4'>Trailer</h3>
            <TrailerModal dataFilm={dataFilm} />
          </div>
        </div>
      </div>
    </>
  )
}
export default Detail

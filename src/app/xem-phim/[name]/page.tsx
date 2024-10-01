import filmApis from '@/apis/filmApis';
import PATH from '@/constants/path';
import Link from 'next/link';
import { cache } from 'react';

const getFilm = cache(filmApis.getFilm)

export async function generateMetadata({ params }: { params: { name: string } }) {
  const response = await getFilm(params.name);
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
      canonical: `https://vnphim.vercel.app${PATH.film}/${params.name}`
    },
  }
}

const Film = async ({ params }: { params: { name: string } }) => {
  // Fetch film data on the server
  const response = await getFilm(params.name);
  const dataFilm = response.data.data;

  // Determine initial server name and episode link
  const initialNameServer = dataFilm.item.episodes[0]?.server_name;
  const initialEpisode = dataFilm.item.episodes.find(
    (item) => item.server_name === initialNameServer
  )?.server_data[0]?.link_embed;

  return (
    <div>
      <div className='relative w-full h-[36vh] sm:h-[56vh] md:h-[66vh] lg:h-[76vh] xl:h-[86vh] bg-black'>
        <iframe
          className='w-full h-full'
          title={dataFilm.item.name}
          src={initialEpisode}
          frameBorder={0}
          loading='eager'
          allowFullScreen
        ></iframe>
      </div>

      <div className='mt-6 flex items-center justify-center gap-2'>
        {dataFilm.item.episodes.map((item) => (
          <button
            title={`Server ${item.server_name}`}
            key={item.server_name}
            className={`rounded px-2 py-1 flex items-center justify-center gap-1 ${
              item.server_name === initialNameServer ? 'bg-white/20' : 'bg-white'
            }`}
          >
            {item.server_name}
          </button>
        ))}
      </div>

      <div className='container px-4 mt-6'>
        <div className='block md:flex items-center justify-between mb-6'>
          <div>
            <h1
              title={dataFilm.item.origin_name}
              className='text-white text-5xl font-heading1 leading-[45px] mb-3'
            >
              {dataFilm.item.origin_name}
            </h1>
            <h2
              title={dataFilm.item.name}
              className='text-[#b5b5b5] text-2xl break-all leading-[30px] mb-6'
            >
              {dataFilm.item.name} (
              <Link
                title={`Tìm kiếm ${dataFilm.item.year}`}
                href={{
                  pathname: `${PATH.list}/${PATH.new}`,
                  query: {
                    year: dataFilm.item.year.toString(),
                  },
                }}
                className='text-[#428bca] hover:underline'
              >
                {dataFilm.item.year}
              </Link>
              )
            </h2>
          </div>

          <Link
            href={`${PATH.film}/${params.name}`}
            className='flex items-center gap-2 text-[#428bca] hover:text-lime-400 pt-6 md:pt-0'
          >
            <svg className='w-7 h-7 fill-white' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'>
              <path d='M11.093 251.65l175.998 184C211.81 461.494 256 444.239 256 408v-87.84c154.425 1.812 219.063 16.728 181.19 151.091-8.341 29.518 25.447 52.232 49.68 34.51C520.16 481.421 576 426.17 576 331.19c0-171.087-154.548-201.035-320-203.02V40.016c0-36.27-44.216-53.466-68.91-27.65L11.093 196.35c-14.791 15.47-14.791 39.83 0 55.3zm23.127-33.18l176-184C215.149 29.31 224 32.738 224 40v120c157.114 0 320 11.18 320 171.19 0 74.4-40 122.17-76.02 148.51C519.313 297.707 395.396 288 224 288v120c0 7.26-8.847 10.69-13.78 5.53l-176-184a7.978 7.978 0 0 1 0-11.06z' />
            </svg>
            Về trang giới thiệu phim
          </Link>
        </div>

        <div className='flex items-center flex-wrap gap-x-3 gap-y-4 max-h-[250px] overflow-auto pb-2 pr-[6px]'>
          {dataFilm.item.episodes
            .find((item) => item.server_name === initialNameServer)
            ?.server_data.map((item, index) => (
              <button
                title={`Tập ${item.name}`}
                key={index}
                className='flex-shrink-0 text-white whitespace-nowrap overflow-hidden text-lg min-w-[99px] h-[40px] px-4 rounded bg-green-400'
              >
                Tập {item.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Film;

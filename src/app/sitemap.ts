import filmApis from '@/apis/filmApis'
import envConfig from '@/config'
import PATH from '@/constants/path'
import type { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = envConfig.NEXT_PUBLIC_URL
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

   const filmSeriesUrls = dataFilmSeries.items.map((item) => 
     ({
      url: `${baseUrl}${PATH.film}/${item.slug}`,
      lastModified: new Date(),
      priority: 0.7
    })
   )
   const filmOddUrls = dataFilmOdd.items.map((item) => 
   ({
      url: `${baseUrl}${PATH.film}/${item.slug}`,
      lastModified: new Date(),
      priority: 0.7
    })
   )
   const filmSeriesNewUrls = dataFilmSeriesNew.items.map((item) => 
     ({
      url: `${baseUrl}${PATH.film}/${item.slug}`,
      lastModified: new Date(),
      priority: 0.7
    })
   )
   const filmOddNewUrls = dataFilmOddNew.items.map((item) => 
     ({
      url: `${baseUrl}${PATH.film}/${item.slug}`,
      lastModified: new Date(),
      priority: 0.7
    })
   )
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7
    },
    ...filmSeriesUrls,
    ...filmOddUrls,
    ...filmSeriesNewUrls,
    ...filmOddNewUrls
  ]
}
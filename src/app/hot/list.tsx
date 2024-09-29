import filmApis from "@/apis/filmApis"
import Card from "@/components/Card"

export default async function List({type} : {type: string}) {
  const response = await filmApis.getListFilm(type, { page: '1', sort_field: 'view' })
  const dataFilmHotPage1 = response.data.data
  return (
    <>
      {dataFilmHotPage1.items.map((item) => 
        <Card key={item._id} data={item} />
      )}
    </>
  )
}
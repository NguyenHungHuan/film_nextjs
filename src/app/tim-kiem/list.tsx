import filmApis from "@/apis/filmApis";
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";

export default async function List({ queryParams }: { queryParams: { keyword: string; page: string } }) {
  const response = await filmApis.getSearchFilm({
    keyword: queryParams.keyword.trim(),
    page: queryParams.page,
  })
  const dataSearch = response.data.data

  return (
    <>
      {dataSearch.items.length > 0 && (
          <>
            <div className='mt-4'>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3'>
                {dataSearch.items.map((item) => (
                  <Card key={item._id} data={item} />
                ))}
              </div>
            </div>
            <div className='mt-4'>
              <Pagination
                queryConfig={{
                  ...queryParams,
                }}
                page={dataSearch.params.pagination.currentPage}
                totalPage={Math.ceil(
                  dataSearch.params.pagination.totalItems / dataSearch.params.pagination.totalItemsPerPage
                )}
              />
            </div>
          </>
        )}
        {dataSearch.items.length <= 0 && (
          <p className='w-full h-[50vh] text-center text-xl text-white flex justify-center items-center'>
            Không tìm thấy phim với kết quả tìm kiếm.
          </p>
        )}
    </>
  )
}
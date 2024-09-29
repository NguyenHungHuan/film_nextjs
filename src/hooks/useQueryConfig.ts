import { useSearchParams } from "next/navigation"

const useQueryConfig = () => {
  const searchParams = useSearchParams();

  const queryConfig = {
    page: searchParams.get('page') || '1',
    sort_field: searchParams.get('sort_field') || '_id',
    category: searchParams.get('category') || '',
    country: searchParams.get('country') || '',
    year: searchParams.get('year') || '',
    keyword: searchParams.get('keyword') || ''
  };

  return queryConfig;
};
export default useQueryConfig

export type paramOption = {
  page?: string
  sort_field?: string
  category?: string
  country?: string
  year?: string
  keyword?: string
}

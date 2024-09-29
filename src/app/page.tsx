import Filter from "@/components/Filter";
import ListFilmHome from "@/components/ListFilmHome";
import { Suspense } from "react";

export default function Home() {
 
  return (
    <main>
      <div className='container mt-[45px] px-2 md:px-6'>
        <Filter />
        <div className="mt-4">
        <div className='flex justify-between items-end pb-1 border-b border-[#1b3c5d]'>
        <h2 className='uppercase text-[#b1a21e] text-2xl font-display font-medium'>
          <span className='inline'>Phim đề cử</span>
        </h2>
        </div>
          <Suspense fallback={skeleton()}>
            <ListFilmHome />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

const skeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3">
    {Array(20)
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

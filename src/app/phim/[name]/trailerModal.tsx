'use client'
import { film } from '@/types'
import { useState } from 'react'

export default function TrailerModal({dataFilm}: {dataFilm: film}) {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <>
      <div className='flex items-center justify-start'>
              {dataFilm.item.trailer_url !== '' ? (
                <div
                  aria-hidden
                  onClick={() => setOpenModal(true)}
                  className='w-[222px] h-[125px] cursor-pointer hover:shadow-[0_0_0_2px_#cc7b19] relative group'
                >
                  <img
                    src={`https://img.youtube.com/vi/${
                      dataFilm.item.trailer_url.split('?v=')[dataFilm.item.trailer_url.split('?v=').length - 1]
                    }/mqdefault.jpg`}
                    alt={`Trailer ${dataFilm.item.name}`}
                    className='w-full h-full object-cover'
                    loading='lazy'
                  />
                  <svg
                    className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 fill-white w-8 h-9 invisible group-hover:visible'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 448 512'
                  >
                    <path d='M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z' />
                  </svg>
                </div>
              ) : (
                <span className='text-white/80'>Đang cập nhật</span>
              )}
            </div>
      {openModal && (
        <div
          aria-hidden
          onClick={() => setOpenModal(false)}
          className='fixed inset-0 z-50 w-screen h-screen flex items-center justify-center bg-[rgba(10,10,10,.86)]'
        >
          <div className='w-[1000px] max-w-full relative overflow-hidden before:content-[""] before:block before:pt-[56.25%]'>
            {dataFilm.item.trailer_url !== '' ? (
              <iframe
                className='absolute inset-0 w-full h-full border-none'
                width='853'
                height='480'
                src={`https://www.youtube.com/embed/${
                  dataFilm.item.trailer_url.split('?v=')[dataFilm.item.trailer_url.split('?v=').length - 1]
                }?autoplay=1&rel=0&vq=hd1080`}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                title={`Trailer ${dataFilm.item.name}`}
              />
            ) : (
              <div className='absolute inset-0 w-full h-full border-none bg-black flex items-center justify-center'>
                <span className='text-white text-2xl'>Trailer đang cập nhật</span>
              </div>
            )}
          </div>
          <button title='Đóng' onClick={() => setOpenModal(false)} className='text-white absolute top-[5%] right-[5%]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-10 h-10'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
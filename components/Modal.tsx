import MuiModal from '@mui/material/Modal'
import { modalState, movieState } from '../atoms/modalAtom'
import {useRecoilValue, useRecoilState} from 'recoil'
import { PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { Element, Genre, Movie } from '../typings'
import ReactPlayer from 'react-player/lazy'



const Modal = () => {
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [movie, setMovie] = useRecoilState(movieState)
    const [data, setData] = useState()
    const [trailer, setTrailer] = useState('')
    const [genres, setGenres] = useState<Genre[]>([])
    const [muted, setMuted] = useState(true)
    

    useEffect(() => {
        if (!movie) return 

        async function fetchMovie() {
          const data = await fetch(
            `https://api.themoviedb.org/3/${
              movie?.media_type === 'tv' ? 'tv' : 'movie'
            }/${movie?.id}?api_key=${
              process.env.NEXT_PUBLIC_API_KEY
            }&language=en-US&append_to_response=videos`
          )
            .then((response) => response.json())
            .catch((err) => console.log(err.message))

            if (data?.videos){
                const index = data.videos.results.findIndex((element: Element) => element.type === 'Trailer')
                setTrailer(data.videos?.results[index]?.key)
            }
            if(data?.genres){
                setGenres(data.genres)
            }
        }

        fetchMovie()
    }, [movie])

    console.log(data)

    const handleClose = () => {
        setShowModal(false)
    }

    console.log(trailer)

  return (
    <MuiModal className='max-w-5xl rounded-md overflow-y-scroll scrollbar-hide overflow-hidden w-full mx-auto fixed !top-7 left-0 right-0' open={showModal} onClose={handleClose}>
      <>
      <button
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          onClick={handleClose}>
            <XIcon className='w-6 h-6' />
      </button>
      <div className='pt-[56.25%] relative'>
      <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className='w-full items-center justify-between flex absolute bottom-10 px-10'>
            <div className='space-x-2 flex'>
                <button className='rounded gap-x-2 flex items-center bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]'>
                    <FaPlay className='text-black h-7 w-7' />
                    Play
                </button>
                <button className='modalButton'>
                    <PlusIcon className='w-7 h-7' />
                </button>
                <button className='modalButton'>
                    <ThumbUpIcon className='w-7 h-7' />
                </button>
            </div>
            <button className='modalButton' onClick={() => setMuted(!muted)}>
                {muted ? <VolumeOffIcon className='w-6 h-6' /> : <VolumeUpIcon className='w-6 h-6' />}
            </button>
          </div>
      </div>
      <div className='text-lg space-x-16 px-10 py-8 flex rounded-b-md bg-[#181818]'>
        <div className='text-lg space-y-6'>
            <div className='space-x-2 text-sm flex items-center'>
                <p className='text-green-400 font-semibold'>{movie!.vote_average * 10}% Match</p>
                <p className='font-light'>{movie?.release_date || movie?.first_air_date}</p>
                <div className='items-center justify-center rounded border border-white/40 px-1.5 text-xs flex h-4'>HD</div>
            </div>
            <div className='font-light flex flex-col gap-x-10 gap-y-4 md:flex-row'>
                <p className='w-5/6'>{movie?.overview}</p>
                <div className='space-y-3 text-sm flex flex-col'>
                    <div>
                        <span className='text-[gray]'>Genres: </span>
                        {genres.map((genre) => genre.name).join(', ')}
                    </div>
                    <div>
                        <span className='text-[gray]'>Original language: </span>
                        {movie?.original_language}
                    </div>
                    <div>
                        <span className='text-[gray]'>Total votes: </span>
                        {movie?.vote_count}
                    </div>
                </div>
            </div>
        </div>
      </div>
      </>
    </MuiModal>
  )
}

export default Modal

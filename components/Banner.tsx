import Image from "next/image"
import { useEffect, useState } from "react"
import { baseUrl } from "../constants/movie"
import { Movie } from "../typings"
import {FaPlay} from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/outline'
import {useRecoilState} from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'


interface Props {
  netflixOriginals: Movie[]
}

function Banner({netflixOriginals}: Props) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const [showModal, setShowModal] = useRecoilState(modalState)

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals])

  console.log(movie)
  return (
    <div className="py-16 space-y-2 flex flex-col md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 h-screen w-screen -z-10">
        <Image layout="fill" src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} alt='' objectFit="cover" />
      </div>
      <h1 className="font-bold text-2xl md:text-4xl lg:text-7xl">{movie?.title || movie?.name || movie?.original_name}</h1>
      <p className="max-w-xs text-xs md:max-x-lg md:text-lg lg:max-w-2xl lg:text-2xl text-shadow-md">{movie?.overview}</p>
      <div className="space-x-3 flex">
        <button className="bannerButton text-black bg-white"><FaPlay className="text-black h-4 w-4 md:h-7 md:w-7" /> Play</button>
        <button className="bannerButton bg-[gray]/70"  onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}>More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" /></button>
      </div>
    </div>
  )
}

export default Banner
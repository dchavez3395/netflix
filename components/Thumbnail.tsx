import Image from "next/image"
import { Movie } from "../typings"
import {useRecoilState} from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { DocumentData } from "firebase/firestore"

interface Props {
    // movie: Movie | DocumentData
    movie: Movie | DocumentData
}



const Thumbnail = ({movie}: Props) => {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const [showModal, setShowModal] = useRecoilState(modalState)
  return (
    <div 
    onClick={() => {
      setCurrentMovie(movie)
      setShowModal(true)
    }}
     className="h-28 min-w-[180px] relative transition duration-200 ease-out md:h-36 cursor-pointer md:hover:scale-105 md:min-w-[260px]">
        <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        alt=""
      />
    </div>
  )
}

export default Thumbnail

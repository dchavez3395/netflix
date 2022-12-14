import Head from 'next/head'
import Image from 'next/image'
import {useState} from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../hooks/useAuth'


interface Inputs {
  email: string
  password: string
}

const Login = () => {
  const [login, setLogin] = useState(false)
  const { signIn, signUp } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
    if (login) {
      await signIn(data.email, data.password)
    } else {
      await signUp(data.email, data.password)
    }
  }
  return (
    <div className='w-screen flex flex-col relative h-screen bg-black md:items-center md:justify-center md:bg-transparent'>
      <Head>
            <title>Netflix</title>
            <link rel="icon" href="https://www.favicon.cc/logo3d/871251.png" />
      </Head>
        <Image
          src="https://rb.gy/p2hphi"
          layout="fill"
          className="-z-10 !hidden opacity-60 sm:!inline"
          objectFit="cover"
          alt='/'
        />
          <img
          src="https://rb.gy/ulxxee"
          className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
          width={150}
          height={150}
        />
            <form onSubmit={handleSubmit(onSubmit)} className='rounded space-y-8 mt-24 relative py-10 px-6 bg-black/75 md:mt-0 md:max-w-md md:px-14'>
              <h1 className='font-semibold text-4xl'>Sign In</h1>
              <div className='space-y-4'>
                <label className="w-full inline-block">
                  <input type="email"  placeholder='Email' className='input' {...register("email", {required: true})}/>
                   {errors.email && <p className='font-light text-orange-500 text-[13px] p-1'>This enter a valid email</p>}
                </label>
                <label className="w-full inline-block">
                  <input type="password"  placeholder='Password' className='input' {...register("password", {required: true})}/>
                   {errors.password && <p className='font-light text-orange-500 text-[13px] p-1'>This enter a valid password</p>}
                </label>
              </div>
              <button className='font-semibold py-3 rounded bg-[#e50914] w-full' onClick={() => setLogin(true)}>Sign In</button>

              <div className='text-[gray]'>
                New to Netflix?{''}
                <button className='hover:underline text-white'  onClick={() => setLogin(false)} type='submit'>
                  Sign up now
                </button>
              </div>
            </form>
    </div>
  )
}

export default Login

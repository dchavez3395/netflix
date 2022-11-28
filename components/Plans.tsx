import { CheckIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import useAuth from '../hooks/useAuth'
import Table from './Table'
import {Product} from '@stripe/firestore-stripe-payments'
import {useState} from 'react' 
import Loader from './Loader'
import { loadCheckout } from '../lib/stripe'

interface Props {
    products: Product[]
}


function Plans({ products }: Props) {
    const {logout, user} = useAuth()
    const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2])
    const [isBillingLoading, setBillingLoading] = useState(false)

    const subscribeToPlan = () => {
        if (!user) return
        loadCheckout(selectedPlan?.prices[0].id!)
        setBillingLoading(true)
    }

  return (
    <div>
      <Head>
            <title>Netflix</title>
            <link rel="icon" href="https://www.favicon.cc/logo3d/871251.png" />
      </Head>
      <header className='border-white/10 h-[7rem] bg-[#141414] border-b'>
        <Link href='/'>
            <img
                src="https://www.freepnglogos.com/uploads/netflix-logo-text-emblem-31.png"
                alt="Netflix"
                width={150}
                height={90}
                className="cursor-pointer object-contain"
            /> 
        </Link>
        <button className='font-medium text-lg hover:underline' onClick={logout}>
            Sign Out
        </button>
      </header>
      <main className='pt-40 pb-12 max-w-5xl px-5 transition-all md:px-10 mx-auto'>
        <h2 className='font-medium text-3xl mb-3'>Choose the plan thats right for you</h2>
        <ul>
            <li className="flex items-center gap-x-2 text-lg">
                <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
                Ad-free.
            </li>
            <li className="flex items-center gap-x-2 text-lg">
                <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
                just for you.
            </li>
            <li className="flex items-center gap-x-2 text-lg">
                <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
                your plan anytime.
            </li>
        </ul>

        <div className='flex flex-col space-y-4 mt-4'>
            <div className='w-full md:w-3/5 self-end justify-center items-center flex'>
                {products.map((product) => (
                    <div className={`planBox ${selectedPlan?.id === product.id ? 'opacity-100' : 'opacity-60'}`} key={product.id} onClick={() => setSelectedPlan(product)}>{product.name}</div>
                ))}
            </div>
            <Table products={products} selectedPlan={selectedPlan} />
            <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && 'opacity-60'
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader color="dark:fill-gray-300" />
            ) : (
              'Subscribe'
            )}
          </button>        </div>
      </main>
    </div>
  )
}

export default Plans

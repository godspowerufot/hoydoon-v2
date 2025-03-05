'use client'
import React  from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Input from '@/app/components/common/inputs/input'
import Button from '@/app/components/common/Button'
const signup= () => {

  
  

  return (
    <>
 <div className='w-full h-screen justify-center items-center  flex  py-[1rem] 2xl:mt-[0.8rem]'>
    <div className=' gap-[4rem]   flex flex-1 flex-col lg:flex-row'>
          <Image
              alt="authBanner"
              width={400}
              loading="lazy"
              height={400}
              quality={100} // Ensures maximum quality
              src={'/authBanner.png'} 
              className='  hidden lg:block   2xl:-mt-[0.9rem] mt-[1rem] rounded-2xl w-[37rem] h-[38rem]  2xl:h-[46rem] 2xl:w-[50rem]'
              style={{ objectFit: 'cover' } }
            />



            <div className=' w-full lg:w-[50%] items-start -mt-3 2xl:-mt-4  flex flex-col'>
 <Link href="/" className='flex justify-start ml-[2rem]         '>
            <Image
              alt="logo"
              width={30}  
              priority
              quality={100}
              objectFit='cover'
              height={30}
              className='w-[10rem] h-[4.5rem] 2xl:w-[12rem]' // Reduced size of logo
              src={'/logo2.svg'}
            /></Link>




            <span className=' 2xl:mt-01rem] flex justify-center flex-col font-bricolage items-center w-full '>
            <div className='w-[80%] 2xl:mt-2 h-[2px] bg-[#D9D9D9] '/>

<h1 className="text-black  text-[26px] lg:text-3xl  pt-3   2xl:mt-[1rem]  2xl:text-4xl font-bricolage font-[600]">Welcome Back</h1>
<p className='font-light text-gray pt-1  2xl:mt-[0.8rem]  text-xs 2xl:text-base'>Please log in to continue</p>





<div className='mt-[1rem] flex flex-col gap-[1em] w-[80%] '>
<Input
label="Email Address"
type='text'
placeholder='Email address*'
 />
<Input
label="Password"
type='password'
placeholder='password *'
 />
 <p className='text-[0.7em] text-gray  2xl:text-[0.8em] font-[300] '>It must be a combination of 8 words, letters,  numbers, symbols</p>
<div className= 'flex items-center  justify-end w-full gap-[7rem]'>


 <div className="flex items-center w-full 2xl:mt-2">
 <label
                    id="rememberme"
                    className="flex items-center text-grey-700   cursor-pointer"
                  >
                    <input
                      name="rememberme"
                      type="checkbox"
                      className="mr-2 rounded-lg h-[20px] w-[25px]  cursor-pointer"
                    />
                    Remember me
                  </label>
</div> 
<p className="text-primary font-meduim w-full   2xl:text-xl font-bricolage">  Forgot password   </p>
</div>

<Button className='w-full 2xl:mt-2 text-base 2xl:text-xl h-[3rem] p-3'>
  Login
</Button>
<div className='w-full 2xl:mt-3 h-[2px] bg-[#D9D9D9] '/>
<div className='w-full text-black text-right font-[400] font-bricolage'>
  Or Log in with:
</div>

<div className="w-full flex gap-3 mt-[2px] ">
<span className="w-[9em] gap-3 h-[2.5em]  2xl:text-[1.em] rounded-full p-3  2xl:h-[3em] 2x:p-4 border-gray border-solid border-[1px]   flex items-center text-black font-[500] text-[1em] justify-center ">  <Image
              alt="logo"
              width={20}  
              loading='lazy'
              objectFit='cover'
              height={20} // Reduced size of logo
              src={'/google.png'}
            /> Google</span>
<span className="w-[9em] gap-3 h-[2.5em]  2xl:text-[1.em] rounded-full p-3  2xl:h-[3em] 2x:p-4 border-gray border-solid border-[1px]   flex items-center text-black font-[500] text-[1em] justify-center ">  <Image
              alt="logo"
              width={20}  
              loading='lazy'
              objectFit='cover'
              height={20} // Reduced size of logo
              src={'/apple.png'}
            /> Apple</span>
<span className="w-[9em] gap-3 h-[2.5em]  2xl:text-[1.em] rounded-full p-3  2xl:h-[3em] 2x:p-4 border-gray border-solid border-[1px]   flex items-center text-black font-[500] text-[1em] justify-center ">  <Image
              alt="logo"
              width={20}  
              loading='lazy'
              objectFit='cover'
              height={20} // Reduced size of logo
              src={'/Facebook.png'}
            /> Facebook</span>
          </div>
          <div className='w-full 2xl:mt-3 h-[2px] bg-[#D9D9D9] '/>

          <p className="text-black w-full text-end block  font-[500] -mt-[5px] text-base 2xl:text-xl">
          No account yet? <Link href="/auth/sign-up" className="text-primary text-[1em]  2xl:text-xl font-bricolage">  Sign Up  </Link>  </p>


</div>
            </span>
            </div>
    </div>
 </div>
            </>
    
  )
}

export default signup;
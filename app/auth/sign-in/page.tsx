'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Input from '@/app/components/common/inputs/input';
import Button from '@/app/components/common/Button';
import { useLoginMutation } from '@/store/slices/api/authapi';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      alert('Login successful!');
      console.log('User Data:', response);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='flex items-center w-full justify-center'>
      <div className='h-screen justify-center items-center flex py-[1rem] 2xl:mt-[0.6rem]'>
        <div className='gap-[4rem] flex flex-1 flex-col lg:flex-row'>
          <Image
            alt="authBanner"
            width={400}
            height={400}
            quality={100}
            src={'/authBanner.png'}
            className='hidden lg:block 2xl:-mt-[0.9rem] mt-[5px] rounded-3xl w-[37rem] h-[39.5rem] 2xl:h-[48rem] 2xl:w-[50rem]'
            style={{ objectFit: 'cover' }}
          />

          <div className='w-full lg:w-[50%] items-start mt-3 2xl:-mt-4 flex flex-col'>
            <Link href="/" className='flex justify-start ml-[2rem]'>
              <Image
                alt="logo"
                width={30}
                height={30}
                quality={100}
                src={'/logo2.svg'}
                className='w-[10rem] h-[4rem] 2xl:w-[12rem]'
              />
            </Link>

            <span className='2xl:mt-[1rem] flex justify-center flex-col font-bricolage items-center w-full'>
              <div className='w-[80%] 2xl:mt-1 h-[1px] bg-[#D9D9D9]' />

              <h1 className="text-black text-[26px] lg:text-3xl pt-3 2xl:mt-[1rem] 2xl:text-4xl font-bricolage font-[600]">
                Welcome Back
              </h1>
              <p className='font-light text-gray pt-1 2xl:mt-[0.8rem] text-xs 2xl:text-base'>
                Please log in to continue
              </p>

              <form className='2xl:mt-[2rem] mt-[1rem] flex flex-col gap-[1em] w-[80%]' onSubmit={handleSubmit}>
                <Input
                  label="Email Address"
                  type='email'
                  placeholder='Enter Email Address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Password"
                  type='password'
                  className='mt-1'
                  placeholder='Enter Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className='text-[0.7em] text-gray -mt-1 2xl:text-[0.8em] font-[300]'>
                  It must be a combination of 8 words, letters, numbers, symbols
                </p>

                <div className='flex items-center justify-between w-full'>
                  <label className="flex items-center text-grey-700 font-[300] cursor-pointer">
                    <input type="checkbox" className="mr-2 rounded-lg h-[20px] w-[25px] cursor-pointer" />
                    Remember me
                  </label>
                  <p className="text-primary font-medium w-full 2xl:text-xl font-bricolage cursor-pointer">
                    Forgot password?
                  </p>
                </div>

                <Button
                  type="submit"
                  className='w-full 2xl:mt-2 mt-2 text-base 2xl:text-[1.3rem] h-[4rem] p-4'
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Log in'}
                </Button>
              </form>

              <div className='w-full 2xl:mt-3 h-[1px] bg-[#D9D9D9]' />
              <div className='w-full text-black text-right font-[500] font-bricolage'>Or Log in with:</div>

              <div className="w-full flex gap-3 mt-[2px]">
                <span className="w-[9em] gap-3 h-[2.5em] rounded-full p-3 border-gray border-[1px] flex items-center justify-center">
                  <Image alt="Google" width={20} height={20} src={'/google.png'} /> Google
                </span>
                <span className="w-[9em] gap-3 h-[2.5em] rounded-full p-3 border-gray border-[1px] flex items-center justify-center">
                  <Image alt="Apple" width={20} height={20} src={'/apple.png'} /> Apple
                </span>
                <span className="w-[9em] gap-3 h-[2.5em] rounded-full p-3 border-gray border-[1px] flex items-center justify-center">
                  <Image alt="Facebook" width={20} height={20} src={'/facebook.png'} /> Facebook
                </span>
              </div>

              <div className='w-full 2xl:mt-3 h-[1px] bg-[#D9D9D9]' />
              <p className="text-black w-full text-end block font-[500] -mt-[5px] text-base 2xl:text-base">
                No account yet? <Link href="/auth/sign-up" className="text-primary text-[1em] 2xl:text-xl font-bricolage">Sign Up</Link>
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

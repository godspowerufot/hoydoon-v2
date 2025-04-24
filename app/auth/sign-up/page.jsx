'use client'
import React,{useState,useEffect}  from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Input from '@/app/components/common/inputs/input'
import Button from '@/app/components/common/Button'
import { useSignupMutation} from '@/store/slices/api/authapi'
import { useRouter } from 'next/navigation'
import LoginButtons from '@/app/components/common/googlebutton'
import { sendDeviceInfo } from '@/utils/lib/devicinfo'
import { log } from '@/utils/log'
const Signup= () => {

    const [email, setEmail] =useState('');
    const [fullname,setfullname] =useState('');
    const [password, setPassword] = useState('');
    const [signup, { isLoading }] = useSignupMutation();
    const [isPasswordValid, setIsPasswordValid] = useState(true)

    const role = "buyer";
   
    const router = useRouter();
    
    const handleSubmit = async (e) => {
      e.preventDefault();
       // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
   setIsPasswordValid(false)
      return;
    }
  


    
      try {
        const { region, ...device } = await sendDeviceInfo();
        // Send login request with device info

     
      await signup({ fullname,email, password,role, device,region }).unwrap();   router.push('/')

        router.push("//auth/sign-up/verification")
      } catch (error) {
        console.error('Login failed:', error);
      
      }
    };
    
    


//   useEffect(() => {
//     async function start() {
//      const gapi = (await import('gapi-script')).default
//       gapi.client.init({
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//       });
//     }
//     gapi.load('client:auth2', start);
// }, []);
  

    
    
  return (
    <>
        <div className='flex items-center w-full justify-center'> 

 <div className=' h-screen justify-center mt-[3rem] items-center  flex  py-[1rem] 2xl:mt-[1.8rem]'>
    <div className=' gap-[4rem]   flex flex-1 flex-col lg:flex-row'>
          <Image
              alt="authBanner"
              width={400}
              loading="lazy"
              height={400}
              quality={100} // Ensures maximum quality
              src={'/signup.jpg'} 
              className='  hidden lg:block  brightness-75  2xl:mt-[1rem] mt-[5px] rounded-2xl w-[37rem] h-[42.8rem]  2xl:h-[52.1rem] 2xl:w-[50rem]'
              style={{ objectFit: 'cover' } }
            />



            <div className=' w-full lg:w-[50%] items-start mt-1 2xl:mt-3  flex flex-col'>
 <Link href="/" className='flex justify-start ml-[2rem]         '>
            <Image
              alt="logo"
              width={30}  
              priority
              quality={100}
              objectFit='cover'
              height={30}
              className='w-[10rem] h-[4rem] 2xl:w-[12rem]' // Reduced size of logo
              src={'/logo2.svg'}
            /></Link>




            <span className=' 2xl:mt-[1rem] flex justify-center flex-col font-bricolage items-center w-full '>
            <div className='w-[80%] 2xl:mt-2 h-[1px] bg-[#D9D9D9] '/>

<h1 className="text-black  text-[26px] lg:text-3xl  pt-3   2xl:mt-[1rem]  2xl:text-4xl font-bricolage font-[600]">Create an Account</h1>
<p className='font-light text-gray pt-1  2xl:mt-[0.8rem]  text-xs 2xl:text-base'>Sign up to create an account</p>





<div className='mt-[1rem] 2xl:mt-[1.3rem] flex flex-col gap-[1em] w-[80%] '>

<Input
label="Email Address"
type='text'
placeholder='Enter Email Address '
value={email}
onChange={(e) => setEmail(e.target.value)}
 />
<Input
label="Password"
type='password'
className=''
value={password}
placeholder='Enter Password '
onChange={(e) => {
  setPassword(e.target.value);
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  setIsPasswordValid(passwordRegex.test(e.target.value));
}}
 />
 { !isPasswordValid &&  <p className='text-[0.7em] text-gray -mt-1  2xl:text-[0.8em] font-[300] '>It must be a combination of 8 words, letters,  numbers, symbols</p>}

 <Input
label="Username"
type='text'
placeholder='Enter Username '
value={fullname}
onChange={(e) => setfullname(e.target.value)}
/>
  <div className= 'flex items-center  justify-end w-full gap-[7rem]'>


 <div className="flex items-center w-full 2xl:mt-2">
 <label
                    id="rememberme"
                    className="flex items-center text-grey-700 font-[300]   cursor-pointer"
                  >
                    <input
                      name="rememberme"
                      type="checkbox"
                      className="mr-2 rounded-lg h-[20px] w-[25px]  cursor-pointer"
                    />
                    Remember me
                  </label>
</div> 
</div>

<Button  
type="submit"
onClick={handleSubmit} className='w-full 2xl:mt-2 mt-2 text-base 2xl:text-xl h-[3rem] p-4'
 disabled={isLoading}
>
  {isLoading ? 'Signing Up...' : 'Sign Up'}
</Button>
<div className='w-full 2xl:mt-3 h-[1px] bg-[#D9D9D9] '/>
<div className='w-full text-black text-right font-[500] font-bricolage'>
  Or sign up with:
</div>

<div className="w-full flex gap-3 mt-[2px] ">
       <LoginButtons />
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
              src={'/facebook.png'}
            /> Facebook</span>
          </div>
          <div className='w-full 2xl:mt-3 h-[1px] bg-[#D9D9D9] '/>

          <p className="text-black w-full text-end block  font-[500] -mt-[3px] text-base 2xl:text-base">
          Already have an account?<Link href="/auth/sign-in" className="text-primary text-[1em]  2xl:text-xl font-bricolage">  Log in</Link>  </p>


</div>
            </span>
            </div>
    </div>
 </div>
     </div>       </>
    
  )
}

export default Signup;
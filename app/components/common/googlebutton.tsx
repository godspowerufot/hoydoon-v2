'use client'

import React from 'react';
import { Credentials } from 'google-auth-library';
import {

    type SuccessAuthCodeResponse,
} from "google-oauth-gsi";

import { provider } from '@/utils';
import { sendDeviceInfo } from '@/utils/lib/devicinfo';
import { useGoogleAuthMutation } from '@/store/slices/api/authapi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { log } from '@/utils/log';
const LoginButtons = () => {
      const [googleAuth] = useGoogleAuthMutation();
    const router=useRouter()
    async function onGoogleLoginSuccess(tokenResponse: SuccessAuthCodeResponse) {
        console.log("(auth-code) tokenResponse: ", tokenResponse)
        const { code } = tokenResponse
        try {
      const device = await sendDeviceInfo();
      const { region, ...deviceWithoutRegion } = device;
log(region)
            const response = await fetch(`/api/google`, {
                method: 'POST',
                body: JSON.stringify({ code }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = (await response.json()) as Credentials
            if (!data.id_token) {
                return console.error('Failed to login with google')
            }
              // Construct payload for backend authentication
      const payload = {
        credential:data.id_token, // Using the decoded ID token
        role: "buyer",
        device: deviceWithoutRegion
       
      };

      // Send the payload to the backend
    await googleAuth({
        ...payload,
        redirect_uri: process.env.NEXTAUTH_URL, // Redirect URI for OAuth flow
      }).unwrap();
      
      router.push("/");
            // Send id_token to BE
        } catch (err) {
            console.error(err)
        }
    }

    const loginWithCode = provider.useGoogleLogin({
        flow: 'auth-code',
        onSuccess: onGoogleLoginSuccess,
        onError: (res) => console.error('Failed to login with google', res),
    })
//     const loginWithToken = provider.useGoogleLogin({
//         flow: 'implicit',
//         onSuccess: (tokenResponse) => {
//             console.log("(implicit) tokenResponse: ", tokenResponse)
//             const hasGrantedAnyScope = hasGrantedAnyScopeGoogle(
//                 tokenResponse,
//                 'email'
//             )
//             const hasGrantedAllScopes = hasGrantedAllScopesGoogle(
//                 tokenResponse,
//                 'profile'
//             )
//             console.log("hasGrantedAnyScope: ", hasGrantedAnyScope)
//             console.log("hasGrantedAllScopes: ", hasGrantedAllScopes)
//         }
//     }
// )

    return (
      <>
                 <span
                            onClick={() => loginWithCode()}   
                                  className="w-[9em] gap-3 h-[2.5em]  2xl:text-[1.em] rounded-full p-3  2xl:h-[3em] 2x:p-4 border-gray border-solid border-[1px]   flex items-center text-black font-[500] text-[1em] justify-center "
                                >
                                  {" "}
                                  <Image
                                    alt="logo"
                                    width={20}
                                    loading="lazy"
                                    objectFit="cover"
                                    height={20}
                                    src={"/google.png"}
                                  />{" "}
                                  Google
                                </span>
            
            {/* <button onClick={() => loginWithToken()}>
                Sign in with google (implicit)
            </button>
            <button onClick={googleLogout}>
                Logout
            </button> */}
       </>
    );
}

export default LoginButtons;
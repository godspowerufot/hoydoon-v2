import { GoogleOAuthProvider } from 'google-oauth-gsi';

export const truncateDescription = (text:string, wordLimit:number) => {
    const words = text?.split(" ");
    return words?.length > wordLimit ? words?.slice(0, wordLimit).join(" ") + "..." : text;
  };
    // Recursive function to fully flatten nested listings
    export const flattenListings = (listings:any) => {
      return listings.flatMap((item:any) => 
        Array.isArray(item.listings) ? flattenListings(item.listings) : item
      );
  
    };


export const provider = new GoogleOAuthProvider({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    onScriptLoadError: () => console.log('onScriptLoadError'),
    onScriptLoadSuccess: () => {
        console.log('onScriptLoadSuccess');
        // oneTap();
    },
});

// const oneTap = provider.useGoogleOneTapLogin({
// 	cancel_on_tap_outside: true,
// 	onSuccess: (tokenResponse) => {
// 		console.log('(one-tap) tokenResponse: ', tokenResponse);
// 	}
// });
import { GoogleOAuthProvider } from 'google-oauth-gsi';
import { toast } from 'react-toastify';
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

    export const handleShareClick = () => {
      if (typeof window !== "undefined") {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        toast.success("Page URL copied! You can now share it.");
      });
      }
    };


export const provider = new GoogleOAuthProvider({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    onScriptLoadError: () => console.log('onScriptLoadError'),
    onScriptLoadSuccess: () => {
        console.log('onScriptLoadSuccess');
        // oneTap();
    },
});

 export const formatNumber = (num:number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num;
  };
// const oneTap = provider.useGoogleOneTapLogin({
// 	cancel_on_tap_outside: true,
// 	onSuccess: (tokenResponse) => {
// 		console.log('(one-tap) tokenResponse: ', tokenResponse);
// 	}
// });
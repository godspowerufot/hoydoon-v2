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
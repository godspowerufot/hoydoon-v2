'use client';
import { useLoadScript } from '@react-google-maps/api';
import { useEffect,useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const libraries = ['places'];

const LocationSearchBar = () => {
  
      const router=useRouter()
     const pathname = usePathname();
      const handleSearch = () => {
        const queryParams = new URLSearchParams({
          ...(formData.location && { location: formData.location }),
      }).toString();
    
        router.push(`/agent/all-agent?${queryParams}`);
      };
  const [formData, setFormData] = useState({
    location: '',
    region: '',
    state: '',
  });

  const inputRefDesktop = useRef(null);
  const inputRefMobile = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });
const handlePlaceChanged = (inputRef) => {
  const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
    componentRestrictions: { country: 'so' },
    fields: ['name'],
  });

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();

    // Just use the place name (e.g., "Military Academy")
    const name = place.name || '';

    setFormData({
      location: name,
   
    });

    console.log({ location: name });
  });
};



  useEffect(() => {
    if (!isLoaded || loadError) return;

    if (inputRefDesktop.current) {
      handlePlaceChanged(inputRefDesktop);
    }

    if (inputRefMobile.current) {
      handlePlaceChanged(inputRefMobile);
    }
  }, [isLoaded, loadError]);

 

  const handleChange = (e) => {
    setFormData({ ...formData, location: e.target.value });
  };

  return (
    <>
    {/* Desktop */}
        <div className="hidden lg:flex justify-center items-center">
          <div className="flex h-[3.5em] py-4 font-bricolage items-center m-2 bg-white rounded-full w-10/12 md:w-4/5 lg:w-[35em]">
            <input
            ref={inputRefDesktop}
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder={pathname === '/sell' ? "Enter your property address" : "Find an Agent in your area"}
            className="flex-1 bg-transparent placeholder:text-[1.3rem] text-black placeholder-gray-500 border-none outline-none pl-4 w-[36.3rem]"
            />
            <div
            onClick={handleSearch}
            className="relative mr-2 p-1 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90"
            >
            <div className="relative bg-primary ml-[1em] p-3 w-[47px] h-[47px] rounded-full flex items-center justify-center">
              <Image
                alt="logo"
                width={30}
                loading="lazy"
                height={30}
                quality={100}
                src={'/arrow-left.png'}
                style={{ objectFit: 'cover' }}
              />
            </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
      <div className="flex lg:hidden justify-center items-center w-full px-1 py-1">
        <div className="flex items-center w-full bg-white rounded-full h-[32px] px-2 py-1">
          <input
            ref={inputRefMobile}
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Find an Agent in your area..."
            className="flex-1 text-sm text-gray-700 placeholder:text-[12px] outline-none bg-transparent placeholder:text-gray-400"
          />
          <button
            onClick={handleSearch}
            className="ml-2 h-[24px] bg-primary px-1 w-[26px] rounded-full flex items-center justify-center hover:bg-opacity-90"
          >
            <Image alt="Search" width={10} height={10} src="/search.png" />
          </button>
        </div>
      </div>
    </>
  );
};

export default LocationSearchBar;
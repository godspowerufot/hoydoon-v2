import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [formData, setFormData] = useState({
    location: "",
    type: "",
    minPrice: "",
    guests: "",
  });
  
  const router = useRouter();

  
  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      ...(formData.location && { location: formData.location }),
      ...(formData.type && { listingType: formData.type }),
      ...(formData.minPrice && { minPrice: formData.minPrice }),
      ...(formData.guests && { guests: formData.guests }),
    }).toString();

    router.push(`/rent/searchlisting?${queryParams}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
    <div className="hidden lg:flex justify-center items-center w-full max-w-[50em]">
      <div className="flex items-center h-[3.4rem] bg-white rounded-full shadow-md w-full p-[0.4rem]">
        {/* Location Input */}
        <div className="flex flex-col flex-1 px-4">
          <span className="text-sm font-semibold text-black">Location</span>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Search Locations"
            className="text-sm text-gray outline-none bg-transparent"
          />
        </div>

        {/* Type Input */}
        <div className="flex w-[8rem] flex-col pl-3 border-x border-[#8F8F8F]">
          <span className="text-sm font-semibold text-black">Type</span>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Add type"
            className="text-sm text-gray outline-none bg-transparent"
          />
        </div>

        {/* Price Range Input */}
        <div className="flex flex-col w-[8rem] pl-3 border-r border-gray">
          <span className="text-sm font-semibold text-black">Price Range</span>
          <input
            type="text"
            name="minPrice"
            value={formData.minPrice}
            onChange={handleChange}
            placeholder="Add range"
            className="text-sm text-gray outline-none bg-transparent"
          />
        </div>

        {/* Guests Input */}
        <div className="flex flex-col mr-[5rem] px-4">
          <span className="text-sm font-semibold text-black">
            Number of Guests
          </span>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            max={100}
            min={0}
            placeholder="Add number"
            className="text-sm text-gray outline-none bg-transparent"
          />
        </div>

        {/* Search Button */}
        <div
          onClick={handleSearch}
          className="ml-2 bg-primary p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90"
        >
          <Image alt="Search" width={20} height={20} src="/search.png" />
        </div>
      </div>
    </div>
    <div className="flex  lg:hidden justify-center items-center w-full px-1 py-1">
  <div className="flex  items-center w-full bg-white rounded-full h-[2.4em] px-2 py-1">
    <input
      type="text"
      name="location"
      value={formData.location}
      onChange={handleChange}
      placeholder="Address, Neighborhood, City, Zip code..."
      className="flex-1 text-sm text-gray-700 outline-none bg-transparent placeholder:text-gray-400"
    />
    <button
      onClick={handleSearch}
      className="ml-2 bg-primary p-2 rounded-full flex items-center justify-center hover:bg-opacity-90"
    >
      <Image alt="Search" width={15} height={15} src="/search.png" />
    </button>
  </div>
</div>

    </>
  );
};

export default SearchBar;

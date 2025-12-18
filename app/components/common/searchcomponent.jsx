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

    router.push(`/rent/fixes?${queryParams}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [loading, setLoading] = useState(false);

  const handleSearchWithSpinner = async () => {
    setLoading(true);
    try {
      handleSearch();
    } finally {
      setLoading(false);
    }
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
            onClick={loading ? undefined : handleSearchWithSpinner}
            className={`ml-2 bg-primary p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : (
              <Image alt="Search" width={20} height={20} src="/search.png" />
            )}
          </div>
        </div>
      </div>
      <div className="flex  lg:hidden justify-center items-center w-full px-1 py-1">
        <div className="flex  items-center w-full bg-white rounded-full h-[32px] placeholder:textt-[12px] px-2 py-1">
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Address, Neighborhood, City, Zip code..."
            className="flex-1 text-[12px] text-[#8F8F8F] placeholder:text-[12px]  outline-none bg-transparent placeholder:text-[#8F8F8F]"
          />
          <button
            onClick={loading ? undefined : handleSearchWithSpinner}
            disabled={loading}
            className="ml-2 h-[24px]  bg-primary px-1 w-[26px] p-1 rounded-full flex items-center justify-center hover:bg-opacity-90"
          >
            {loading ? (
              <svg className="animate-spin h-3 w-3 text-white" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : (
              <Image alt="Search" width={10} height={10} src="/search.png" className="w-[12px] h-[12px]" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;

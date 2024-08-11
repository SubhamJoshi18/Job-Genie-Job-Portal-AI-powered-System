export default function HeroSection() {
  const header = "font-medium text-5xl my-5";
  return (
    <>
      <div className="main text-center mx-auto py-24 w-full h-[88vh]">
        <span className=" flex justify-center items-center">
          <span className="flex text-[--color-text] bg-blue-100/30 border border-[--color-text] rounded-3xl px-5 py-2">
            <img
              className="pr-3"
              src="/assets/thumbs-up.svg"
              alt="thumbs-up image"
            />
            #1 Top greatest on Job Hunt
          </span>
        </span>
        <h1 className={header}>Supporting Job Seekeers</h1>
        <h1 className={header}>Every Steps of the Way</h1>
        <p className="w-2/5 mx-auto text-gray-500 ">
          Unlock your true potential and discover a world of opportunities that
          align with your skills, interests, and aspirations
        </p>
        <div className="search-box bg-white rounded-2xl w-[550px] px-3 mx-auto flex justify-center mt-10 border py-2">
          <div className="find-job flex justify-center items-center pl-2">
            <img
              className="h-6 w-6"
              src="/assets/search.svg"
              alt="search finder"
            />
            <input
              className="pl-2 outline-none"
              type="text"
              placeholder="Find job here"
            />
          </div>
          <div className="find-job flex justify-center items-center">
            <img
              className="h-6 w-6"
              src="/assets/map-pin.svg"
              alt="search finder"
            />
            <input
              className="pl-2 outline-none"
              type="text"
              placeholder="Kathmandu,Nepal"
            />
          </div>
          <button className="hover:text-[--color-text] hover:bg-white text-white border hover:border-[--color-text] bg-[--color-text] px-3 py-2 rounded-3xl">
            Search
          </button>
        </div>
      </div>
    </>
  );
}

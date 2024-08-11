const cards = [
  {
    id: 1,
    title: "UI/UX Designer",
    companyName: "Pinterest",
    image: "/assets/pinterest.png",
    description:
      "You will play a cruical role in creating engaging and visually appealing user interfaces for our job.",
    location: "London, UK",
    type: "Full Time",
  },
  {
    id: 2,
    title: "UI Designer",
    companyName: "Spotify",
    image: "/assets/spotify-logo.png",
    description:
      "You will play a cruical role in creating engaging and visually appealing user interfaces for our job.",
    location: "Liverpool, UK",
    type: "Part Time",
  },
  {
    id: 3,
    title: "Senior UI Designer",
    companyName: "Malichimp",
    image: "/assets/malichimp-logo.png",
    description:
      "You will play a cruical role in creating engaging and visually appealing user interfaces for our job.",
    location: "Manchester, UK",
    type: "Full Time",
  },
  {
    id: 4,
    title: "Product Designer",
    companyName: "Databrick",
    image: "/assets/databricks-logo.png",
    description:
      "You will play a cruical role in creating engaging and visually appealing user interfaces for our job.",
    location: "Glasglow, UK",
    type: "Part Time",
  },
  {
    id: 4,
    title: "Ethical Hacker",
    companyName: "Dropbox",
    image: "/assets/dropbox-logo.svg",
    description:
      "You will play a cruical role in creating engaging and visually appealing user interfaces for our job.",
    location: "Las Vegas, USA",
    type: "Full Time",
  },
  {
    id: 4,
    title: "DBA",
    companyName: "Github",
    image: "/assets/github-logo.png",
    description:
      "You will play a cruical role in creating engaging and visually appealing user interfaces for our job.",
    location: "Texas, USA",
    type: "Work From Home",
  },
];
export const JobCard = () => {
  return (
    <>
      <div className="container mx-auto text-center my-20">
        <div className="flex justify-center mb-5">
          <img src="/assets/combine.svg" alt="combine tile logo" />
          <h1 className="text-[--color-text] font-medium pl-5">
            JobGenie's Features
          </h1>
        </div>
        <div className="w-4/5 mx-auto justify-center flex">
          <h2 className="text-5xl">
            We Empower Job Seekers Like You To Streamline And Supercharge Your
            Job Search.
          </h2>
        </div>
        <p className="mt-5 text-gray-500/80 w-2/5 mx-auto">
          Unlock your true potential and discover a world of opportunities that
          align with your skills, interests, and aspirations
        </p>
      </div>
      <div className="jobCard-render container flex mx-auto justify-center pb-20">
        <ul role="list" className="grid-cols-3 grid gap-y-10">
          {cards.map((item) => (
            <li key={item.id}>
              <div className="w-4/5 mx-auto p-5 rounded-2xl h-full  bg-white">
                <div className="flex justify-between items-center">
                  <div className="font-semibold">
                    <h1>{item.title}</h1>
                    <div className="flex items-center">
                      <h1 className="font-medium text-gray-500/70 pr-3">
                        {item.companyName}
                      </h1>
                      <img
                        className="h-4"
                        src="/assets/tick.png"
                        alt="briefcase image"
                      />
                    </div>
                  </div>
                  <div>
                    <img
                      className="w-10 rounded-md"
                      src={item.image}
                      alt={item.companyName}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mt-5">
                    {item.description}
                  </p>
                </div>
                <div className="location flex justify-start mt-5 text-[--color-text-tertiary]">
                  <img src="/assets/map-pin2.svg" alt="map pin image" />
                  <p className="pl-1 pr-5">{item.location}</p>
                  <img src="/assets/briefcase.svg" alt="briefcase image" />
                  <p className="pl-2">{item.type}</p>
                </div>
                <button className="bg-black hover:bg-white border border-black hover:text-black font-medium text-white text-center w-full rounded-3xl py-4 mt-5">
                  Apply Now
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

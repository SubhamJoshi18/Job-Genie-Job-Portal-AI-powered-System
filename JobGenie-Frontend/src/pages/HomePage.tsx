import { Link } from "react-router-dom";
import HeroSection from "../components/hero section/HeroSection";
import { JobCard } from "../components/cards/JobCard";

export default function HomePage() {
  return (
    <>
      <div className="bg-gray-100/70">
        <HeroSection />
        <div className="aboutus grid-cols-2 flex justify-center items-center gap-40 py-20 bg-white">
          <div className="w-[550px]">
            <Link className="flex mb-4" to={"/"}>
              <img src="/assets/flag.svg" alt="flags-up" />
              <span className="text-[--color-text] font-medium px-3">
                More about JobGenie
              </span>
            </Link>
            <p className="font-medium text-3xl">
              Unlock Your True Potential And Discover A World Of Opportunities
              That Align With Your Skills, Interests, And Aspirations
            </p>
            <div className="company-logos flex justify-between items-center mt-10">
              <img
                className="h-7"
                src="/assets/spotify.png"
                alt="spotify logo"
              />
              <img
                className="h-11"
                src="/assets/microsoft.jpg"
                alt="spotify logo"
              />
              <img
                className="h-5"
                src="/assets/macfee.png"
                alt="spotify logo"
              />
              <img
                className="h-7"
                src="/assets/google.png"
                alt="spotify logo"
              />
            </div>
          </div>
          <div className="grid-col-2 flex gap-20">
            <div>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-medium">400K</h1>
                <p className="text-gray-500">Job list</p>
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-medium">800K</h1>
                <p className="text-gray-500">People hired</p>
              </div>
            </div>
            <div>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-medium">20K</h1>
                <p className="text-gray-500">Company</p>
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-medium">120</h1>
                <p className="text-gray-500">Available countries</p>
              </div>
            </div>
          </div>
        </div>
        <div id="jobs">
          <JobCard />
        </div>
      </div>
    </>
  );
}

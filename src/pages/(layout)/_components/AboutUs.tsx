import About from '@/assets/images/bg-about.png'
export default function AboutUs() {
  return (
    <div className="2xl:px-220 2xl:mt-250 lg:mt-200 lg:flex lg:px-7 sm:mt-180 mt-200">
      <div className="flex flex-col items-center justify-center mt-16 mb-16 md:flex-row">
        <div className="ml-1 md:ml-10">
          <img src={About} alt="About" className="sm:w-133 h-118 w-96" />
        </div>
        <div className="md:ml-24">
          <h1 className="mb-4 text-5xl font-bold mt-9 md:mt-0 w-88 h-14 sm:mb-0 text-lightgray">
            About us
          </h1>
          <p className="text-lg md:w-88 w-96 h-112 text-lightgray">
            We are a company that connects the world of real estate and finance.
            We provide a complete service for the sale, purchase or rental of
            real estate. Our advantage is more than 15 years of experience and
            soil in attractive locations in Slovakia with branches in Bratislava
            and Košice.
            <br />
            <br />
            We have a connection to all banks on the Slovak market, so we can
            solve everything under one roof. By constantly innovating our
            business activities, we move forward and we are able to offer truly
            above-standard services that set us apart from the competition.
          </p>
        </div>
      </div>
    </div>
  )
}

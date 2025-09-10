import React from 'react'

const Hero = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Welcome to the</span>
          <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Modern Colorful Navigation
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
          This is a demonstration of a vibrant, colorful navigation bar with smooth animations and responsive design.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="rounded-md shadow">
            <a
              href="#"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700 md:px-10 md:py-4 md:text-lg"
            >
              Get started
            </a>
          </div>
          <div className="ml-3">
            <a
              href="#"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-indigo-600 hover:bg-gray-50 md:px-10 md:py-4 md:text-lg"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {['from-pink-500 to-purple-600', 'from-blue-500 to-teal-400', 'from-yellow-400 to-orange-500'].map((gradient, i) => (
          <div key={i} className="overflow-hidden rounded-lg shadow-lg">
            <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
            <div className="px-6 py-8">
              <h3 className="mb-3 text-xl font-bold">Feature {i + 1}</h3>
              <p className="text-gray-600">
                This modern navigation bar incorporates vibrant colors, smooth transitions, and responsive design for an engaging user experience.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hero
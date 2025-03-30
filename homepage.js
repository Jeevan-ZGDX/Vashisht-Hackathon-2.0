"use client";
import React from "react";

function MainComponent() {
  return (
    <div className="min-h-screen bg-purple-50 dark:bg-purple-900">
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-purple-50 dark:bg-purple-900 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-28">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-bold text-purple-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block">Discover Your Perfect</span>
                  <span className="block text-purple-600 dark:text-purple-200">
                    Hair Care Routine
                  </span>
                </h1>
                <p className="mt-3 text-base text-purple-700 dark:text-purple-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Get personalized hair care recommendations tailored to your
                  unique needs. Take our quick quiz and transform your hair care
                  routine today.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="/hair-care-quiz"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90 md:py-4 md:text-lg md:px-10"
                    >
                      Take the Quiz
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      <div className="bg-purple-100 dark:bg-purple-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-purple-900 dark:text-white">
              Why Take Our Hair Care Quiz?
            </h2>
          </div>
          <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
            <div className="flex">
              <div className="ml-3">
                <dt className="text-lg leading-6 font-medium text-purple-900 dark:text-white">
                  <i className="fas fa-clock mr-2"></i>
                  Quick & Easy
                </dt>
                <dd className="mt-2 text-base text-purple-700 dark:text-purple-300">
                  Complete our quiz in just a few minutes and get instant
                  recommendations.
                </dd>
              </div>
            </div>
            <div className="flex">
              <div className="ml-3">
                <dt className="text-lg leading-6 font-medium text-purple-900 dark:text-white">
                  <i className="fas fa-user-check mr-2"></i>
                  Personalized Results
                </dt>
                <dd className="mt-2 text-base text-purple-700 dark:text-purple-300">
                  Receive customized product and routine recommendations based
                  on your unique hair profile.
                </dd>
              </div>
            </div>

            <div className="flex">
              <div className="ml-3">
                <dt className="text-lg leading-6 font-medium text-purple-900 dark:text-white">
                  <i className="fas fa-star mr-2"></i>
                  Expert Guidance
                </dt>
                <dd className="mt-2 text-base text-purple-700 dark:text-purple-300">
                  Get professional advice tailored to your specific hair type
                  and concerns.
                </dd>
              </div>
            </div>
            <div className="flex">
              <div className="ml-3">
                <dt className="text-lg leading-6 font-medium text-purple-900 dark:text-white">
                  <i className="fas fa-sync mr-2"></i>
                  Adaptable Solutions
                </dt>
                <dd className="mt-2 text-base text-purple-700 dark:text-purple-300">
                  Update your routine as your hair care needs change over time.
                </dd>
              </div>
            </div>

            <div className="flex">
              <div className="ml-3">
                <dt className="text-lg leading-6 font-medium text-purple-900 dark:text-white">
                  <i className="fas fa-shield-alt mr-2"></i>
                  Safe & Trusted
                </dt>
                <dd className="mt-2 text-base text-purple-700 dark:text-purple-300">
                  Recommendations based on proven hair care science and trusted
                  products.
                </dd>
              </div>
            </div>
            <div className="flex">
              <div className="ml-3">
                <dt className="text-lg leading-6 font-medium text-purple-900 dark:text-white">
                  <i className="fas fa-heart mr-2"></i>
                  Healthier Hair
                </dt>
                <dd className="mt-2 text-base text-purple-700 dark:text-purple-300">
                  Achieve your hair goals with a routine that works for you.
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;

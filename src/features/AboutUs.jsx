import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24 min-h-screen">
      <div className="relative max-w-xl mx-auto">
        <svg
          className="absolute left-full transform translate-x-1/2"
          width="404"
          height="404"
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="404"
            fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
          />
        </svg>

        <svg
          className="absolute right-full bottom-0 transform -translate-x-1/2"
          width="404"
          height="404"
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="404"
            fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
          />
        </svg>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Us
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Our website is dedicated to providing a platform for users to post
            their ads for items, deals, and more. We offer the ability to boost
            your ad or sponsor your ad on our website to increase visibility and
            reach a larger audience.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap my-14 mx-5">
        <div className="w-full lg:w-1/2 px-4 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg mb-4">
            Our mission is to provide a platform for individuals and businesses
            to promote their products and services to a wider audience. We
            strive to make advertising easy and accessible to everyone,
            regardless of budget or experience.
          </p>
          <p className="text-gray-700 text-lg mb-4">
            We believe that advertising is essential to the success of any
            business or individual, and we want to help you achieve your goals
            by providing a platform that is easy to use, affordable, and
            effective.
          </p>
        </div>
        <div className="w-full lg:w-1/2 px-4 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-700 text-lg mb-4">
            Our vision is to become the leading platform for advertising
            products and services, and to make advertising accessible to
            everyone, regardless of budget or experience.
          </p>
          <p className="text-gray-700 text-lg mb-4">
            We aim to create a community of individuals and businesses who share
            our passion for advertising and who are committed to achieving
            success through our platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

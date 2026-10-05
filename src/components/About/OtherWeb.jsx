import React from "react";
import { ExternalLink } from "lucide-react";

const OtherWeb = () => {
  return (
    <section className="py-24 bg-white">
      <div className="w-[90%] max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[4px] text-orange-600 font-semibold">
            Our Network
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Explore Our Other Platforms
          </h2>

          <p className="mt-5 text-gray-600 max-w-3xl mx-auto leading-8">
            We operate multiple platforms focused on technology solutions and
            event management, delivering quality services to businesses and
            individuals across different industries.
          </p>
        </div>

        <div className="divide-y divide-orange-100 border-y border-orange-100">
          {/* R Solution */}

          <div className="grid lg:grid-cols-2 gap-12 py-14 items-center">
            <div>
              <span className="text-orange-600 font-semibold">
                Technology & IT Solutions
              </span>

              <h3 className="text-4xl font-bold text-gray-900 mt-3">
                R Solution
              </h3>

              <p className="mt-6 text-gray-600 leading-8">
                R Solution is a technology-driven company providing software
                development, website design, CCTV installation, digital
                printing, barcode solutions, OMR processing, online examination
                systems, data management, and complete IT services for
                businesses, educational institutions, and government
                organizations.
              </p>
            </div>

            <div className="lg:pl-16 border-l-0 lg:border-l border-orange-100">
              <h4 className="text-lg font-semibold text-gray-900">
                Official Website
              </h4>

              <a
                href="https://rsolution2011.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold text-lg"
              >
                https://rsolution2011.com/
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* PTH Events */}

          <div className="grid lg:grid-cols-2 gap-12 py-14 items-center">
            <div>
              <span className="text-orange-600 font-semibold">
                Wedding & Event Management
              </span>

              <h3 className="text-4xl font-bold text-gray-900 mt-3">
                PTH Events
              </h3>

              <p className="mt-6 text-gray-600 leading-8">
                PTH Events specializes in premium wedding planning, stage
                decoration, floral decoration, catering, lighting, sound
                systems, birthday celebrations, corporate events, and complete
                event management with creative concepts and flawless execution.
              </p>
            </div>

            <div className="lg:pl-16 border-l-0 lg:border-l border-orange-100">
              <h4 className="text-lg font-semibold text-gray-900">
                Official Website
              </h4>

              <a
                href="https://ptentevent.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold text-lg"
              >
                https://ptentevent.com/
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherWeb;

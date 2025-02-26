import React from 'react';
import { Link } from 'react-router-dom';

interface CallToActionProps {
  title: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  image?: string;
  background?: 'gradient' | 'light' | 'dark';
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  primaryAction,
  secondaryAction,
  image,
  background = 'gradient'
}) => {
  const backgroundStyles = {
    gradient: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white',
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white'
  };

  return (
    <div className={`${backgroundStyles[background]} relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              {title}
            </h2>
            <p className={`text-lg ${background === 'light' ? 'text-gray-600' : 'text-gray-200'} max-w-2xl mx-auto lg:mx-0`}>
              {description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to={primaryAction.href}
                className={`inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm ${
                  background === 'light'
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-white text-indigo-600 hover:bg-gray-50'
                } transition-colors duration-200`}
              >
                {primaryAction.label}
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              {secondaryAction && (
                <Link
                  to={secondaryAction.href}
                  className={`inline-flex items-center justify-center px-8 py-3 border-2 text-base font-medium rounded-md ${
                    background === 'light'
                      ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      : 'border-white text-white hover:bg-white/10'
                  } transition-colors duration-200`}
                >
                  {secondaryAction.label}
                </Link>
              )}
            </div>
          </div>

          {image && (
            <div className="flex-1 lg:flex-none lg:w-96">
              <img
                src={image}
                alt="Illustration"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          )}
        </div>

        {/* Effet de particules en arrière-plan */}
        {background === 'gradient' && (
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(white 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CallToAction;
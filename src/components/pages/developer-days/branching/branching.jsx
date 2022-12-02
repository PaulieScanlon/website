import { StaticImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Alignment, Fit, Layout, useRive } from 'rive-react';

import Button from 'components/shared/button';
import Container from 'components/shared/container';
import Heading from 'components/shared/heading';
import Link from 'components/shared/link';
import ArrowIcon from 'icons/arrow-right.inline.svg';
import PlayIcon from 'icons/play.inline.svg';
import StraightLineSvg from 'images/developer-days/straight-line.inline.svg';

import LineSvg from './images/line.inline.svg';
import vercelLineSvg from './images/vercel-line.svg';

const items = [
  {
    text: 'Data Recovery with Branching',
    linkText: 'Read blog post',
    linkUrl: '/', // TODO: add missing link
  },
  {
    text: 'CI/CD with Branching and GitHub Actions',
    linkText: 'Read blog post',
    linkUrl: '/', // TODO: add missing link
  },
  {
    text: 'Serverless driver technical post',
    linkText: 'Read blog post',
    linkUrl: '/', // TODO: add missing link
  },
];

const Branching = ({ setIsOpenModal }) => {
  const [wrapperRef, isWrapperInView] = useInView({ threshold: 0.3 });
  const [containerRef, isContainerInView] = useInView({ triggerOnce: true, rootMargin: '300px' });
  const { RiveComponent, rive } = useRive({
    src: '/animations/pages/developer-days/cactus.riv',
    autoplay: false,
    stateMachines: 'State Machine',
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.TopCenter,
    }),
  });

  useEffect(() => {
    if (rive) {
      if (isWrapperInView) {
        rive.play();
      } else {
        rive.pause();
      }
    }
  }, [isWrapperInView, rive]);

  return (
    <section
      className="branching safe-paddings sm:pt[190px] bg-black pt-[672px] text-white xl:pt-[408px] lg:pt-[364px] md:pt-[364px] sm:pt-[190px]"
      ref={wrapperRef}
    >
      <Container className="grid-gap-x grid grid-cols-12" size="md" ref={containerRef}>
        <div className="relative col-span-8 ml-[50px] flex max-w-[940px] flex-col items-center xl:col-span-full xl:mx-auto">
          <LineSvg className="absolute bottom-[calc(100%+2rem)] left-1/2 h-auto w-[393px] -translate-x-[calc(50%-11.3rem)] xl:hidden" />
          <StraightLineSvg className="absolute bottom-[calc(100%+1rem)] left-1/2 hidden h-auto w-8 -translate-x-1/2 xl:block lg:w-[30px] md:w-6 sm:w-3.5" />
          <time className="label-secondary-2 mx-auto" dateTime="2022-12-07">
            7th of December, 2022
          </time>
          <Heading
            className="mt-2.5 text-center text-[72px] font-bold leading-tight 2xl:text-6xl xl:text-[56px] xl:leading-dense md:text-[44px]"
            tag="h2"
            size="lg"
          >
            All-Things-Branching
          </Heading>
          <p className="mt-3 text-center text-base xl:mt-2.5 md:mt-2">
            Welcome to Neon Developer days from 6-8 December, 2022
          </p>
          <div className="relative mt-14 xl:mt-12 lg:mt-9 md:mt-6">
            <div className="absolute -inset-x-16 top-16">
              <StaticImage
                className="rounded-[200px] opacity-30 blur-[70px]"
                imgClassName="rounded-[200px]"
                src="./images/bg-gradient-branching.jpg"
                width={1068}
                height={520}
                alt=""
                loading="lazy"
                aria-hidden
              />
            </div>
            <div className="relative">
              <svg width="940" height="520" className="rounded-2xl xl:w-full md:max-h-[390px]">
                <rect width="940" height="520" className="fill-secondary-6" />
              </svg>

              {isContainerInView && (
                <RiveComponent className="absolute bottom-0 -right-2 h-full max-h-[448px] w-full max-w-[612px] sm:max-w-none" />
              )}
            </div>
            <div className="absolute top-8 left-[38px] min-h-[520px] max-w-[330px] rounded-2xl bg-secondary-5 px-5 pt-7 pb-8 xl:left-6 md:min-h-[442px] md:max-w-[290px] sm:static sm:mx-auto sm:-mt-2 sm:min-h-0 sm:w-[85%] sm:max-w-none sm:rounded-t-none">
              <Button
                className="w-full px-8"
                theme="secondary"
                size="sm"
                style={{ boxShadow: '0px 10px 30px rgba(26, 26, 26, 0.6)' }}
                onClick={() => setIsOpenModal(true)}
              >
                <PlayIcon className="mr-4 h-[22px] w-4 shrink-0" />
                <span>Watch announcements</span>
              </Button>
              <ul className="mt-7">
                {items.map(({ text, linkText, linkUrl }, index) => (
                  <li
                    className="group flex flex-col border-t border-dashed border-black border-opacity-40 py-6 text-black last:pb-0"
                    key={index}
                  >
                    <Link to={linkUrl}>
                      <p className="text-lg font-semibold leading-snug opacity-[85%] lg:text-base">
                        {text}
                      </p>
                      <span className="mt-3.5 inline-flex items-center space-x-2 font-semibold leading-none">
                        <span>{linkText}</span>
                        <ArrowIcon className="h-auto w-[18px] transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-4 flex justify-center xl:hidden">
          <img
            className="-mt-9 mr-[153px]"
            src={vercelLineSvg}
            width={169}
            height={760}
            alt="vercel-55z94eq"
            loading="lazy"
          />
        </div>
      </Container>
    </section>
  );
};

Branching.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
};

export default Branching;

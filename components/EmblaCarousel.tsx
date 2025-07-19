"use client"
import React, { useCallback, useEffect, useRef } from 'react'
import { EmblaOptionsType, EmblaCarouselType, EmblaEventType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

const TweenFactorScale = 0.25;
const TweenFactorOpacity = 0.65;

const numberWithinRange = (number: number, min: number, max: number): number => 
  Math.min(Math.max(number, min), max)

type PropType = {
  slides: string[];
  captions?: string[];
  options?: EmblaOptionsType;
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, captions, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  const tweenFactorScale = useRef(0);
  const tweenFactorOpacity = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.embla__slide__number') as HTMLElement
    })
  }, []);

  const setTweenFactorScale = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactorScale.current = TweenFactorScale * emblaApi.scrollSnapList().length;
  }, []);

  const setTweenFactorOpacity = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactorOpacity.current = TweenFactorOpacity * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === 'scroll';

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slideInSnap = engine.slideRegistry[snapIndex];

        slideInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            })
          }

          const tweenValueScale = 1 - Math.abs(diffToTarget * tweenFactorScale.current);
          const scale = numberWithinRange(tweenValueScale, 0, 1).toString();
          const tweenValueOpacity = 1 - Math.abs(diffToTarget * tweenFactorOpacity.current);
          const opacity = (numberWithinRange(tweenValueOpacity, 0, 1)).toString();
          const tweenNode = tweenNodes.current[slideIndex]
          tweenNode.style.transform = `scale(${scale})`;
          emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
        })
      })
    }, []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactorScale(emblaApi);
    setTweenFactorOpacity(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactorScale)
      .on('reInit', setTweenFactorOpacity)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
      .on('slideFocus', tweenScale)
  }, [emblaApi, tweenScale, setTweenFactorOpacity, setTweenFactorScale, setTweenNodes])
  
  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <figure>
                  <Image
                    src={`/images/${slide}.png`}
                    alt={`Image ${index} not found`}
                    width={500}
                    height={500}
                    className="rounded-lg border-white select-none"
                  />
                  <figcaption className="text-center text-[#ccc] text-sm mt-2">
                      {captions && captions[index]}
                  </figcaption>
                </figure>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel

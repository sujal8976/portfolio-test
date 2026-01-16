import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

export interface CarouselOptions {
  loop?: boolean;
  align?: "start" | "center" | "end";
  slidesToScroll?: number;
  breakpoints?: Record<string, { slidesToScroll: number }>;
}

export interface CarouselReturn {
  emblaRef: (node: HTMLElement | null) => void;
  emblaApi: UseEmblaCarouselType[1];
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
}

export function useCarousel(options: CarouselOptions = {}): CarouselReturn {
  const emblaOptions = {
    loop: options.loop ?? true,
    align: options.align ?? "start",
    slidesToScroll: 1,
    skipSnaps: false,
    dragFree: false,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi && !isTransitioning) {
      setIsTransitioning(true);

      if (emblaApi.canScrollPrev()) {
        emblaApi.scrollPrev();
      } else if (emblaOptions.loop) {
        // If at the beginning and loop is enabled, go to last slide
        emblaApi.scrollTo(emblaApi.scrollSnapList().length - 1, false);
      }

      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [emblaApi, isTransitioning, emblaOptions.loop]);

  const scrollNext = useCallback(() => {
    if (emblaApi && !isTransitioning) {
      setIsTransitioning(true);

      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else if (emblaOptions.loop) {
        // If at the end and loop is enabled, go to first slide
        emblaApi.scrollTo(0, false);
      }

      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [emblaApi, isTransitioning, emblaOptions.loop]);

  const onSelect = useCallback(
    (emblaApi: UseEmblaCarouselType[1]) => {
      if (!emblaApi) return;

      // For looped carousels, never disable buttons
      if (emblaOptions.loop) {
        setPrevBtnDisabled(false);
        setNextBtnDisabled(false);
      } else {
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
      }
    },
    [emblaOptions.loop],
  );

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return {
    emblaRef,
    emblaApi,
    prevBtnDisabled,
    nextBtnDisabled,
    scrollPrev,
    scrollNext,
  };
}

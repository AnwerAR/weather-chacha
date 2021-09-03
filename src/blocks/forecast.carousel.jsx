import React, { useLayoutEffect, useState } from 'react';
import PT from 'prop-types';
import cls from 'classnames';
import useCarousel from '../hooks/use.carousel';
import Card from '../elements/card';
import Button from '../elements/button';
import { isToday } from '../helpers';

export default function ForecastCarousel({ data }) {
    /**
     * Number of forecast items per screen.
     */
    const [slidesOnScreen, setSlidesOnScreen] = useState(1);

    /**
     * Total number of items in forecast carousel.
     */
    const keys = Object.keys((data && data) || []);

    /**
     * Small devices should have 1 carousel. assuming small when screen width is less then 1024px.
     */
    useLayoutEffect(() => {
        const updateCarouselSize = () => {
            setSlidesOnScreen(window.innerWidth >= 1024 ? 3 : 1);
        };

        // Update on initial load.
        updateCarouselSize();

        // Keep listening
        window.addEventListener('resize', updateCarouselSize);

        return () => window.removeEventListener('resize', updateCarouselSize);
    }, []);

    /**
     * Custom hook for slide calculations.
     */
    const [activeKeys, current, total, onPrev, onNext] = useCarousel(keys, slidesOnScreen);

    return (
        <div className="tw-relative">
            {Object.keys(data).length > 0 && (
                <>
                    <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-flex-wrap lg:tw--m-2">
                        {activeKeys.map((key) => (
                            <Card
                                title={key}
                                key={key}
                                date={data[key].date}
                                main={data[key].main}
                                weatherID={data[key].weatherID}
                                isToday={isToday(key)}
                                clouds={data[key].clouds}
                            />
                        ))}
                    </div>
                    <div className="tw-flex tw-items-center tw-justify-center tw-my-6">
                        <Button
                            disabled={current <= 1}
                            onClick={onPrev}
                            extraClasses={cls(
                                'tw-rounded-l',
                            )}
                        >
                            Prev
                        </Button>
                        <Button
                            disabled={current >= total}
                            onClick={onNext}
                            extraClasses={cls(
                                'tw-rounded-r',
                            )}
                        >
                            Next
                        </Button>
                        <div className="tw-mx-4">
                            {`${current}/${total}`}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

ForecastCarousel.propTypes = {
    data: PT.shape({
        [PT.string]: PT.shape({
            [PT.string]: PT.oneOfType([PT.any]),
        }),
    }).isRequired,
};

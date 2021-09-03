import { useState, useEffect } from 'react';

/**
 * A custom carousel hook.
 *
 * @param {string[] | number []} items - Array of items to traverse.
 * @param {number} displayItems - number of item per slide
 * @returns An array with following properties and methods
 *
 * - `currentSlideItems` contains a sub array from items array with current slides.
 * - `currentScreen` is the active screen (slide) index.
 * - `totalScreens` total number of slides/screens
 * - `onPrev()` is a method to get previous screen. accepts no param.
 * - `onNext()` is a method to get next screen. accepts no param.
 */
export default function useCarousel(items, displayItems) {
    const [count, setCount] = useState(displayItems);
    const [currentSlideItems, setCurrentSlideItems] = useState([]);
    const [totalScreens, setTotalScreens] = useState(Math.round(items.length / displayItems));
    const [currentScreen, setCurrentScreen] = useState(Math.round(count / displayItems));

    // Needs to explicitly update this when browser gets resized.
    useEffect(() => {
        setCount(displayItems);
    }, [displayItems]);

    const onPrev = () => {
        if (count >= displayItems) {
            setCount(count - displayItems);
        }
    };

    const onNext = () => {
        if (count <= items.length) {
            setCount(count + displayItems);
        }
    };

    useEffect(() => {
        // Current slide items sliced from items.
        setCurrentSlideItems([...items.slice(count - displayItems, count)]);

        // Current screen.
        setCurrentScreen(Math.round(count / displayItems));

        // Total number of screens
        setTotalScreens(Math.round(items.length / displayItems));
    }, [count, items.length, displayItems]);

    return [currentSlideItems, currentScreen, totalScreens, onPrev, onNext];
}

import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useMeasure } from "react-use";
import collapsibleCardStyle from './collapsible-card.module.scss';

/*
    Component that shows the children passed in a collapsible card
    cardHeader : the non collapsible section
    optional :
         collapse button
         skipStyleHeader - don't style the header / divs
         skipAllStyling,
         buttonSize - largeBtn or undefined (default)
         disableHeaderButton - cardHeader won't be a button. Must use collapse button to collapse.
         hideOnFocusLost - collapse if clicked outside this card
*/
export default function CollapsibleCard (props) {
    let {cardHeader, hideOnFocusLost, disableHeaderButton,
        wrapperClassName, isCollapsed, toggleCollapse} = props;
    // calculate collapsible section height. use for spring animation
    const [ref, {height}] = useMeasure();
    // ref for collapsible section
    const cardRef = React.createRef();
    // ref for card header - used to ignore click when using hideOnFocusLost
    const cardHeaderRef = React.createRef();
    const spring = useSpring({
        to: {
            height: isCollapsed? 0: height+10
            // Adding 10 here cause it seems to undercut the height a little
        }
    })
    const handleCollapse = () => {
        toggleCollapse();
    }
    // Add event listeners to App if using hide on focus lost
    useEffect(() => {
        if (!hideOnFocusLost) return
        function handleEventListeners (e) {
            const el = cardRef.current;
            const btn = cardHeaderRef.current;
            if ((!el.contains(e.target) && !el.isSameNode(e.target))
                && (btn && !btn.contains(e.target) && !btn.isSameNode(e.target))) {
                toggleCollapse('collapse');
            }
        }
        const App = document.getElementById('App');
        App.addEventListener('click', handleEventListeners)
        return () => {
            App.removeEventListener('click', handleEventListeners)
        }
    }, [hideOnFocusLost, cardHeaderRef, cardRef, toggleCollapse])
    return (
        <div className={wrapperClassName}>
            <div
                ref={cardHeaderRef}
                onClick={!disableHeaderButton?handleCollapse:undefined}
            >
                {cardHeader}
            </div>
            <animated.div
                style={spring}
                ref={cardRef}
                className={collapsibleCardStyle.collapsibleSection}
            >
                <div
                    className="collapsibleSectionItems"
                    ref={ref}>{props.children}
                </div>
            </animated.div>
        </div>
    )
}
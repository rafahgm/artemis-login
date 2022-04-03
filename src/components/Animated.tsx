import React from 'react';

import 'animate.css';

type AnimatedPropTypes = {
    animation: string,
    className?: string
}

const Animated : React.FC<AnimatedPropTypes> = props => {
    return (<div className={`animate__animated animate__${props.animation} ${props.className}`}>
        {props.children}
    </div>);
}

export default Animated;
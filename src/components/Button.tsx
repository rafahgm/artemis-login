import React, { useState, useLayoutEffect } from 'react';
import { createUseStyles, useTheme } from 'react-jss';

type ButtonProps = {
    text: string,
    className?: string,
    onClick?: Function,
    duration?: number,
    background?: string
}

type CoordsType = {
    x: number,
    y: number,
    size: number
}

const useStyles = createUseStyles({
    button: ({ theme, ...props }: { theme: CustomTheme } & ButtonProps) => ({
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        border: 'none',
        borderRadius: theme.border.radius,
        padding: 10,
    }),
    ripple: ({ theme, ...props }: { theme: CustomTheme } & ButtonProps) => ({
        position: 'absolute',
        background: `${props.background ?? "#FFFFFF"}`,
        display: 'block',
        content: '',
        borderRadius: '100%',
        opacity: 0.75,
        animationName: `$ripple`,
        animationDuration: `${props.duration ?? 850}ms`,
        animationFillMode: 'forwards',
        transform: 'scale(0)'
    }),
    '@keyframes ripple': {
        'to': {
            transform: 'scale(2)',
            opacity: 0
        },
    }
});

const useDebouncedRippleCleanUp = (rippleCount: number, duration: number, cleanUpFunction: Function) => {
    useLayoutEffect(() => {
      let bounce: number = 0;
      if (rippleCount > 0) {
        clearTimeout(bounce);
  
        bounce = window.setTimeout(() => {
          cleanUpFunction();
          clearTimeout(bounce);
        }, duration * 2);
      }
  
      return () => clearTimeout(bounce);
    }, [rippleCount, duration, cleanUpFunction]);
  };

const Button: React.FC<ButtonProps> = props => {
    const theme = useTheme<CustomTheme>();
    const styles = useStyles({ ...props, theme });

    const [rippleArray, setRippleArray] = useState<Array<CoordsType>>([]);
    
    useDebouncedRippleCleanUp(rippleArray.length, props.duration ?? 850, () => {
        setRippleArray([]);
    });
    
    const onClick = function (event: React.MouseEvent<HTMLElement>): void {
        const { x, y, width, height } = event.currentTarget.getBoundingClientRect();
        const size = width > height ? width : height;

        const newRipple: CoordsType = {
            x: event.pageX - x - size / 2,
            y: event.pageY - y - size / 2,
            size: size
        };

        setRippleArray([...rippleArray, newRipple]);

        props.onClick && props.onClick(event);
    }

    return <button className={`${props.className} ${styles.button}`} type='button' onClick={onClick}>
        {props.text}
        {rippleArray.length > 0 &&
            rippleArray.map((ripple, index) => {
                return (<span key={`span${index}`} className={styles.ripple} style={{
                    width: ripple.size,
                    height: ripple.size,
                    top: ripple.y,
                    left: ripple.x
                }}></span>)
            })}
    </button>;
}

export default Button;
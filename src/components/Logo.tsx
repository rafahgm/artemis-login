import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';

const useStyles = createUseStyles((theme: CustomTheme) => ({
    logo: {
        display: 'flex',
        alignItems: 'center'
    },
    triangle: {
        fill: theme.colors.primary,
        stroke: theme.colors.primary
    },
    logoContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontSize: '2rem',
        fontWeight: 700
    },
    subtitle: {
        fontSize: '1rem'
    }
}));

const Triangle: React.FC<{ className: string, strokeWidth: number }> = props => {
    return (
        <svg width='100px' height='100px' viewBox='-25 -25  300 350'>
            <polygon className={props.className} strokeWidth={props.strokeWidth} strokeLinejoin='round' points={`${props.strokeWidth / 2} 150, ${250 - props.strokeWidth / 2} ${props.strokeWidth / 2}, ${250 - props.strokeWidth / 2} ${300 - props.strokeWidth / 2}`}></polygon>
        </svg>
    );
}

const Logo: React.FC<{}> = props => {
    const theme = useTheme<CustomTheme>();
    const styles = useStyles({theme})
    ;
    return (<div className={styles.logo}>
        <Triangle className={styles.triangle} strokeWidth={70} />
        <div className={styles.logoContent}>
            <div className={styles.title}>
                Artemis
            </div>
            <div className={styles.subtitle}>
                Sua privacidade é nossa prioridade
            </div>
        </div>
    </div>);
};

export default Logo
import Color from 'color';
import { relative } from 'path';
import React, { useState } from 'react';
import { createUseStyles, useTheme } from 'react-jss';

type PasswordFieldProps = {
    hasConfirmation?: boolean,
}

enum PasswordStrength {
    Weak = 'weak',
    Medium = 'medium',
    Strong = 'strong'
}

const useStyles = createUseStyles((theme: CustomTheme) => ({
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        display: 'flex'
    },
    strengthMeterContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap:2,
        margin: '7px 0',
    },
    strengthTextContainer: {
        display: 'flex',
        gap: 5,
        alignItems: 'center'
    },
    strengthText: {
        fontSize: '0.8rem',
        fontWeight: 700,
        textAlign: 'left'
    },
    strengthMeterBarContainer: {
        height: 3,
        borderWidth: 1,
        borderColor: Color(theme.colors.black).alpha(0.4).hexa(),
        borderStyle: 'solid',
        borderRadius: 10,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'content-box'

    },
    strengthMeterBar: {
        height: '100%',
        borderRadius: 10,
        transition: 'width 300ms ease-in-out'
    }
}));

const Emoji: React.FC<{ symbol: string, label?: string, fontSize?: number | string, className?: string }> = props => {
    return <span
        style={{ fontSize: props.fontSize ?? '1rem' }}
        className={`emoji ${props.className ?? ''}`}
        role='img'
        aria-label={props.label ?? ''}
        aria-hidden={props.label ? 'false' : 'true'}
    >
        {props.symbol}
    </span>
}


const StrengthMeter: React.FC<{ strength: PasswordStrength }> = props => {
    const theme = useTheme<CustomTheme>();
    const styles = useStyles({ theme });
    return (
        <div className={styles.strengthMeterContainer}>
            <div className={styles.strengthTextContainer}>
                <span className={styles.strengthText}>Força da senha</span>
                {function () {
                    switch (props.strength) {
                        case PasswordStrength.Weak:
                            return (<>
                                <span className={styles.strengthText} style={{ marginLeft: 'auto', color: theme.colors.danger }}>Fraca</span>
                                <Emoji className={styles.strengthText} symbol='😭' label='crying' /></>)
                        case PasswordStrength.Medium:
                            return (<>
                                <span className={styles.strengthText} style={{ marginLeft: 'auto', color: theme.colors.warning }}>Média</span>
                                <Emoji className={styles.strengthText} symbol='😐' label='crying' /></>)
                        case PasswordStrength.Strong:
                            return (<>
                                <span className={styles.strengthText} style={{ marginLeft: 'auto', color: theme.colors.green }}>Forte</span>
                                <Emoji className={styles.strengthText} symbol='😎' label='crying' /></>)
                    }
                }()}
            </div>
            <div className={styles.strengthMeterBarContainer}>
                <div className={styles.strengthMeterBar} style={function() {
                    switch(props.strength){
                        case PasswordStrength.Weak:
                            return {width: '33.33%', backgroundColor: theme.colors.danger};
                        case PasswordStrength.Medium:
                            return {width: '66.66%', backgroundColor: theme.colors.warning};
                        case PasswordStrength.Strong:
                            return {width: '100%', backgroundColor: theme.colors.green};
                    }
                }()}></div>
            </div>
            <span className={styles.strengthText} style={{ fontWeight: 400 }}>Sua privacidade não ficará segura assim!</span>
        </div>
    )
}

const PasswordField: React.FC<PasswordFieldProps> = props => {
    const styles = useStyles();

    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>(PasswordStrength.Weak);


    const passwordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.currentTarget.value;
        const strongRegEx = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-za-z0-9])(?=.{8,})');
        const mediumRegEx = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-za-z0-9])(?=.{6,})');

        if (strongRegEx.test(password)) {
            setPasswordStrength(PasswordStrength.Strong);
        } else if (mediumRegEx.test(password)) {
            setPasswordStrength(PasswordStrength.Medium);
        } else {
            setPasswordStrength(PasswordStrength.Weak);
        }
    }

    return (<div className={styles.column}>
        <input type='password' autoComplete='new-password' placeholder='Senha' style={{ marginBottom: 20 }} onChange={passwordOnChange} />
        <input type='password' autoComplete='new-password' placeholder='Repita a senha' />
        <StrengthMeter strength={passwordStrength} />
    </div>);
}

export default PasswordField;
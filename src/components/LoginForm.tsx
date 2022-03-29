import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import Color from 'color';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import theme from '../theme';

const useStyles = createUseStyles({
    container: {
        backgroundColor: 'white',
        marginLeft: 'auto',
        padding: 20,
        width: 300,
        height: 'min-content',
        borderRadius: theme.border.radius,
        boxShadow: '0 0 6px 2px rbga(0,0,0,0.6)'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',

    },
    input: {
        padding: 10,
        fontSize: '1rem',
        borderRadius: theme.border.radius,
        borderWidth: theme.border.width,
        borderStyle: 'solid',
        borderColor: theme.border.color,
        marginBottom: 15,
        transition: 'all 200ms ease',
        outlineColor: theme.border.color,
        '&:focus-within': {
            outlineColor: theme.colors.primary,
            outlineStyle: 'solid',
            boxShadow: '0 0 4px 2px ' + Color(theme.colors.primary).alpha(0.2).hexa()
        } 
    },
    login: {
        color: 'white',
        backgroundColor: theme.colors.primary,
        border: 'none',
        padding: 10,
        fontSize: '1.1rem',
        fontWeight: 600,
        borderRadius: theme.border.radius,
        cursor: 'pointer',
        transition: 'background-color 200ms ease-in-out',
        '&:hover': {
            backgroundColor: Color(theme.colors.primary).darken(0.1).hex()
        }
    },
    link: {
        color: theme.colors.secondary,
        textDecoration: 'none',
        textAlign: 'center'
    },
    separator: {
        display: 'block',
        width: '100%',
        height: '2px',
        backgroundColor: theme.colors.background,
        margin: '20px auto'
    },
    newAccount: {
        color: 'white',
        backgroundColor: theme.colors.secondary,
        border: 'none',
        padding: 10,
        fontSize: '1.1rem',
        borderRadius: theme.border.radius,
        cursor: 'pointer',
        transition: 'background-color 200ms ease-in-out',
        '&:hover': {
            backgroundColor: Color(theme.colors.secondary).darken(0.1).hex()
        }
    }
});
const LoginForm: React.FC<{}> = props => {
    const theme = useTheme<CustomTheme>();
    const styles = useStyles({ theme });

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <input className={styles.input} type='text' placeholder='E-mail, usuário ou telefone' />
                <input className={styles.input} type='password' placeholder='Senha' />
                <button className={styles.login}>Entrar</button>
                <a className={styles.link} href="#">Esqueci a senha</a>
                
                <span className={styles.separator}></span>
                <button className={styles.newAccount}>Criar nova conta</button>
            </form>
        </div>
    )
}

export default LoginForm;

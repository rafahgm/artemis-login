import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import Color from 'color';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import theme from '../theme';
import Signup from './Signup';
import Button from './Button';

const SignupModal = withReactContent(Swal);

const useStyles = createUseStyles({
    container: {
        backgroundColor: 'white',
        padding: 20,
        width: 300,
        height: 'min-content',
        minWidth: 350,
        borderRadius: theme.border.radius,
        boxShadow: '0 0 6px 2px rbga(0,0,0,0.6)'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20
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
        textAlign: 'center',
        marginTop: '5px'
    },
    separator: {
        display: 'block',
        width: '100%',
        height: '2px',
        backgroundColor: theme.colors.background,
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
    },
    swalPopup: {
        padding: 0
    },
    swalHtml: {
        margin: 0,
        padding: 20
    }
});
const LoginForm: React.FC<{}> = props => {
    const theme = useTheme<CustomTheme>();
    const styles = useStyles({ theme });

    const signupClick = () => {
        SignupModal.fire({
            html: <Signup />,
            showConfirmButton: false,
            customClass: {
                popup: styles.swalPopup,
                htmlContainer: styles.swalHtml
            }
        });
    }

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <input type='text' placeholder='E-mail, usuário ou telefone' />
                <input type='password' placeholder='Senha' />
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Button text='Entrar' className={styles.login} />
                    <a className={styles.link} href="google.com.br">Esqueci a senha</a>
                </div>
                
                <span className={styles.separator}></span>
                <Button className={styles.newAccount} text='Criar conta' onClick={signupClick}/>
            </form>
        </div>
    )
}

export default LoginForm;

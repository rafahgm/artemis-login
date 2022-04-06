import React, { useState } from 'react';
import { createUseStyles, ThemeProvider } from 'react-jss';

import theme from '../theme';
import Button from './Button';

import Swal from 'sweetalert2';
import PasswordField from './PasswordField';

const useStyles = createUseStyles((theme: CustomTheme) => ({
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 20
    },
    confirmButton: {
        backgroundColor: theme.colors.primary,
        fontSize: '1.1rem',
        color: 'white'
    },
    cancelButton: {
        backgroundColor: theme.colors.danger,
        fontSize: '1.1rem',
        color: 'white'
    }
    
}));

const Signup : React.FC<{}> = props => {
    const styles = useStyles({theme});
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    return (
    <ThemeProvider theme={theme}>
        <div>
            <h2>Seja bem vindo!</h2>
            <h3>Precisamos apenas de alguns dados básicos</h3>
        </div>
    <div className={styles.grid}>
        <input type='text' placeholder='Primeiro nome'/>
        <input type='text' placeholder='Sobrenome'/>
        <input type='email' placeholder='E-mail' style={{gridColumnEnd: 'span 2'}}/>
        {/* <input type='password' placeholder='Senha' style={{gridColumnEnd: 'span 2'}} /> 
        <input type='password' placeholder='Repita a senha' autoComplete='new-password' style={{gridColumnEnd: 'span 2'}} />  */}
        <div style={{gridColumnEnd: 'span 2'}}>
            <PasswordField hasConfirmation={true} />
        </div>
        <Button text='Cadastrar' className={styles.confirmButton} />
        <Button text='Cancelar' className={styles.cancelButton} onClick={() => {Swal.close()}}/>
    </div></ThemeProvider>);
}

export default Signup;
import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import LoginForm from '../components/LoginForm';
import Logo from '../components/Logo';

const useStyles = createUseStyles((theme: CustomTheme) => ({
    app: {
        backgroundColor: theme.colors.background,
        minHeight: '100vh',
    },
    container: {
        display: 'flex',
        margin: '0 auto',
        maxWidth: 1000,
        padding: '0 20px',
        height: '100vh',
        alignItems: 'center'        
    }
}));

const Home: React.FC<{}> = props => {
    const theme = useTheme<CustomTheme>();
    const styles = useStyles({theme});

    return (<div className={styles.app}>
        <div className={styles.container}>
            <Logo />
            <LoginForm />
        </div>
    </div>)
}

export default Home;
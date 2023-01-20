import {useForm} from '@mantine/form';
import {TextInput, Button, Grid, PasswordInput } from '@mantine/core';
import {showNotification} from '@mantine/notifications';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons';
import {Typography} from "@material-ui/core";
import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';

function Login() {
    const form = useForm({
        initialValues: {name: '', email: ''},
        validate: {
            name: (value) => (value.length < 7 ? 'Mot de passe non valide - au moins 7 caractères' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email non valide'),
        },
    });
    const navigate = useNavigate();

    const [ seconds, setSeconds ] = useState(5);
    const [apiResponse, setApiResponse] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleError = (errors: typeof form.errors) => {
        if (errors.name) {
            showNotification({message: 'Please fill name field', color: 'red'});
        } else if (errors.email) {
            showNotification({message: 'Please provide a valid email', color: 'red'});
        }
    };
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            setIsLoggedIn(true);
        }
    }, []);
    const handleSubmit = (values: typeof form.values, event) => {
        const registrationData = {email: values.email, password: values.name  };

        event.preventDefault();
        const data = new FormData(event.target);
        fetch('https://127.0.0.1:8000/login-submit', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(registrationData),
        }).then((response) => {
            console.log(response);
            if(response){
                document.getElementById('alert').style.display ='block';
                setApiResponse(response);
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('username', response.username);
                setIsLoggedIn(true);
            }
        });
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds - 1);
        }, 1000);

        if (apiResponse) {
            clearInterval(interval);
            navigate('/');
            window.location.href = '/';
        }
        return () => clearInterval(interval);
    }, [seconds, navigate]);
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '8%'
        },
    };
    let message = "Bienvenue, vous allez être rediriger dans " + {seconds} + "seconds";
    return (
        <Grid>
            <Grid.Col span={12}>
                <Alert id="alert" style={{display: "none"}} icon={<IconAlertCircle size={16} />} title={message}  color="green" radius="md" withCloseButton>

                </Alert>
                <Typography style={{position:"relative",marginTop: "2%",left: "4%", fontSize: "22pt"}}>Connexion </Typography>
                <div style={styles.container}>
                    <form style={{}} onSubmit={form.onSubmit(handleSubmit, handleError)}>
                        <TextInput type="email" style={{width: "160%"}} label="Email"
                                   placeholder="Email" {...form.getInputProps('email')} />
                        <PasswordInput
                            label="Mot de passe"
                            placeholder="Mot de passe"
                            defaultValue=""
                            style={{width: "160%"}}
                            {...form.getInputProps('name')}
                            visibilityToggleIcon={({ reveal, size }) =>
                                reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
                            }
                        />
                        <Button style={{width: "100%", left: "25%"}} type="submit" mt="sm">
                            Connexion
                        </Button>
                    </form>
                </div>
            </Grid.Col>

        </Grid>

    );
}

export default Login;

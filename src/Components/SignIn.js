import {useForm} from '@mantine/form';
import {TextInput, Button, Grid, PasswordInput } from '@mantine/core';
import {showNotification} from '@mantine/notifications';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons';
import {Typography} from "@material-ui/core";

function SignIn() {
    const form = useForm({
        initialValues: {name: '', email: ''},
        validate: {
            password: (value) => (value.length < 7 ? 'Mot de passe non valide - au moins 7 caractères' : null),
            nom: (value) => (value.length < 2 ? '2 caractères minimum' : null),
            prenom: (value) => (value.length < 2 ? '2 caractères minimum' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email non valide'),
        },
    });

    const handleError = (errors: typeof form.errors) => {
        if (errors.name) {
            showNotification({message: 'Please fill name field', color: 'red'});
        } else if (errors.email) {
            showNotification({message: 'Please provide a valid email', color: 'red'});
        }
    };

    const handleSubmit = (values: typeof form.values, event) => {
        const registrationData = {email: values.email, password: values.password,name: values.nom,nom: values.nom,prenom: values.prenom, username: values.prenom  };

        event.preventDefault();
        const data = new FormData(event.target);
        fetch('https://127.0.0.1:8000/form-submit', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(registrationData),
        }).then((response) => {
            console.log(response);
        });
    };
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '5%'
        },
    };
    return (
        <Grid>
            <Grid.Col span={12}>
                <Typography style={{position:"relative",marginTop: "2%",left: "3%", fontSize: "22pt"}}>Inscription </Typography>
                <div style={styles.container}>
                    <form style={{}} onSubmit={form.onSubmit(handleSubmit, handleError)}>
                        <TextInput type="email" style={{width: "160%"}} label="Email"
                                   placeholder="Email" {...form.getInputProps('email')} />
                        <TextInput type="text" style={{width: "160%"}} label="Nom"
                                   placeholder="Nom" {...form.getInputProps('nom')} />
                        <TextInput type="text" style={{width: "160%"}} label="Prénom"
                                   placeholder="Prénom" {...form.getInputProps('prenom')} />
                        <PasswordInput
                            label="Mot de passe"
                            placeholder="Mot de passe"
                            defaultValue=""
                            style={{width: "160%"}}
                            {...form.getInputProps('password')}
                            visibilityToggleIcon={({ reveal, size }) =>
                                reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
                            }
                        />
                        <Button  style={{width: "100%", left: "23%"}} type="submit" mt="sm">
                            Inscription
                        </Button>
                    </form>
                </div>
            </Grid.Col>

        </Grid>

    );
}

export default SignIn;

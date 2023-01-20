import React, {useState} from "react";
import Home from './Home';
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
    useTheme,
    useMediaQuery, Box,
} from "@material-ui/core";
import {Link} from "react-router-dom";
import DrawerComponent from "./Drawer";
import Logo from "../img/logoRe.png";

const useStyles = makeStyles((theme) => ({
    navlinks: {
        marginLeft: theme.spacing(5),
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        color: "black",
        fontSize: "20px",
        marginLeft: theme.spacing(20),
        "&:hover": {
            color: "#0D5A94",

        },
    },
    navColor: {
        backgroundColor: "#e2fdf5",
        opacity: "0.8",

    },
    logo2: {
        maxWidth: 100,
        borderRadius: "80%",
        backgroundColor: "transparent",
        boxShadow: "10px 10px 13px -11px #000000",
        webkitBoxShadow: "10px 10px 13px -11px #000000"

    },
}));

function Navbar() {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    React.useEffect(() => {
        const sessionToken = localStorage.getItem('isLoggedIn');
        console.log(sessionToken)
        if (sessionToken) {
            setIsLoggedIn(true);
        }
    }, []);
    function deconnexion() {
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/';
    }
    return (
        <AppBar className={classes.navColor} position="static">
            <CssBaseline/>
            <Toolbar>
                <Link to="/">
                    <Box
                        component="img"
                        sx={{
                            height: 64,
                        }}
                        title={"GreenWay"}
                        className={classes.logo2}
                        element={<Home></Home>}
                        alt="Your logo."
                        src={Logo}
                    />
                </Link>
                {isMobile ? (
                    <DrawerComponent/>
                ) : (
                    <div className={classes.navlinks}>
                        <Link to="/" className={classes.link}>
                            Accueil
                        </Link>
                        {isLoggedIn ? (
                            <Link to="/"
                                  className={classes.link}>
                                Mes recettes
                            </Link>
                        ) : (
                            <Link to="/Connexion" className={classes.link}>
                                Connexion
                            </Link>
                        )}
                        {isLoggedIn ? (
                            <Link to="/" onClick={deconnexion}
                                  className={classes.link}>
                                Déconnexion
                            </Link>
                        ) : (
                            <Link to="/Inscription" className={classes.link}>
                                Inscription
                            </Link>
                        )}
                        <Link to="/Places" className={classes.link}>
                            Places
                        </Link>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;

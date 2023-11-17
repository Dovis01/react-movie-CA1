import React, {useContext, useState} from "react";
import Grid from "@mui/material/Grid";
import backgroundImageStyles from "../theme/background";
import Header from "../components/headerMovieList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";
import {MoviesContext} from "../contexts/moviesContext";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";


const LogInPage = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const title = "Log In Page";
    const navigate = useNavigate();
    const signInUrl = "/signin";
    const context = useContext(MoviesContext);
    const user = context.user;
    const handleSignInSelect = (pageURL) => {
        navigate(pageURL);
    };
    const handleSnackClose = (event) => {
        setOpenSnackbar(false);
        navigate("/");
    };


    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={openSnackbar}
                autoHideDuration={6000} // 6 seconds before auto close
                sx={{marginTop: '76px'}}
                onClose={handleSnackClose}
            >
                <MuiAlert
                    severity="success"
                    variant="filled"
                    onClose={handleSnackClose}
                >
                    <Typography variant="h6">
                        {`Welcome ${user.displayName}, your email is ${user.email}`}
                    </Typography>
                </MuiAlert>
            </Snackbar>
            <Grid container sx={{padding: '20px', height: '92%'}} style={backgroundImageStyles.backgroundMainContainer}>
                <Grid item xs={12}>
                    <Header title={title}/>
                </Grid>
                <Grid container justifyContent="center" alignItems="center" sx={{mt: '-400px'}}>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} lg={5} sx={{p: 16}}>
                        <Typography component="h4" variant="h4" sx={{textAlign: 'center', mt: '-70px'}}>
                            {"Log In "}
                        </Typography>
                        <Box component="form" noValidate
                             sx={{mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email"
                                       autoComplete="email" autoFocus/>
                            <TextField margin="normal" required fullWidth name="password" label="Password"
                                       type="password"
                                       id="password" autoComplete="current-password"/>
                            <Paper sx={{margin: '10px', width: '100%', marginBottom: '20px', marginTop: '20px'}}>
                                <Button type="submit" fullWidth variant="contained">
                                    Log In
                                </Button>
                            </Paper>
                            <Paper sx={{margin: '10px', width: '100%', marginBottom: '20px', marginTop: '5px'}}>
                                <Button type="submit" fullWidth variant="contained"
                                        onClick={() => handleSignInSelect(signInUrl)}>
                                    Sign In
                                </Button>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
export default LogInPage;
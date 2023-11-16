import React from "react";
import Grid from "@mui/material/Grid";
import backgroundImageStyles from "../theme/background";
import Header from "../components/headerMovieList";
import ThirdPartyAuth from "../components/thirdPartyAuth";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";


const LogInPage = () => {
    const title = "Log In Page";
    return (
        <Grid container sx={{padding: '20px', height: '92%'}} style={backgroundImageStyles.backgroundMainContainer}>
            <Grid item xs={12}>
                <Header title={title}/>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" sx={{mt: '-400px'}} >
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} lg={5} sx={{p: 16}}>
                    <Typography component="h4" variant="h4" sx={{textAlign: 'center',mt: '-70px'}}>
                        {"Log In "}
                    </Typography>
                    <Box component="form" noValidate
                         sx={{mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email"
                                   autoComplete="email" autoFocus/>
                        <TextField margin="normal" required fullWidth name="password" label="Password" type="password"
                                   id="password" autoComplete="current-password"/>
                        <Paper sx={{margin: '10px', width: '100%', marginBottom: '20px',marginTop: '20px'}}>
                            <Button type="submit" fullWidth variant="contained">
                                Log In
                            </Button>
                        </Paper>
                        <Paper sx={{margin: '10px', width: '100%', marginBottom: '20px',marginTop: '5px'}}>
                            <Button type="submit" fullWidth variant="contained">
                                Sign In
                            </Button>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default LogInPage;
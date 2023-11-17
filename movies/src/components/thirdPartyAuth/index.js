import React, {useState} from 'react';
import {auth, GoogleAuthProvider} from '../../firebase.js';
import {signInWithPopup, createUserWithEmailAndPassword, GithubAuthProvider} from 'firebase/auth';
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {MoviesContext} from "../../contexts/moviesContext";


const ThirdPartyAuthByGoogle = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const context = useContext(MoviesContext);
    const user =context.user;
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            // Google 登录成功后，可以获取用户信息
            const user = result.user;
            // 处理登录成功逻辑，例如设置用户状态或导航到其他页面
            context.addUser(user);
            setOpenSnackbar(true);
        } catch (error) {
            // 处理错误
            console.error(error);
        }
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
            <Button variant="contained" onClick={signInWithGoogle} sx={{ width: '216px' }}>
                <GoogleIcon sx={{mr: 1}}/>
                Sign in with Google
            </Button>
        </>
    );
};

const ThirdPartyAuthByGitHub = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const context = useContext(MoviesContext);
    const [snackMessage, setSnackMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const githubProvider = new GithubAuthProvider();
    const signInWithGitHub = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            // 这里可以获取用户信息和 token
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            // 处理登录成功逻辑，例如设置用户状态或导航到其他页面
            context.addUser(user);
            setSnackMessage(`Welcome ${user.displayName}, your email is ${user.email}`);
            setSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            // 处理错误
            if (error.code === 'auth/account-exists-with-different-credential') {
                setSnackMessage('This email has already been registered with another way.');
                setSeverity('error');
            } else {
                setSnackMessage('An unexpected error occurred. Please try again.');
                setSeverity('error');
            }
            setOpenSnackbar(true);
        }
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
                    severity={severity}
                    variant="filled"
                    onClose={handleSnackClose}
                >
                    <Typography variant="h6">
                        {snackMessage}
                    </Typography>
                </MuiAlert>
            </Snackbar>
            <Button variant="contained" onClick={signInWithGitHub} sx={{ width: '216px' }}>
                <GitHubIcon sx={{mr: 1}}/>
                Sign in with GitHub
            </Button>
        </>
    );
};


const ThirdPartyAuthByEmail = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const navigate = useNavigate();
    const context = useContext(MoviesContext);

    const handleSnackClose = (event) => {
        setOpenSnackbar(false);
        navigate("/");
    };

    const signUpWithEmail = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // 处理用户注册成功逻辑
            context.addUser(user);
            setSnackMessage(`Welcome, your email is ${user.email}`);
            setSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            // 处理错误
            if (error.code === 'auth/email-already-in-use') {
                setSnackMessage('This email has already been registered.');
                setSeverity('error');
            } else {
                setSnackMessage('An unexpected error occurred. Please try again.');
                setSeverity('error');
            }
            setOpenSnackbar(true);
        }
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
                    severity={severity}
                    variant="filled"
                    onClose={handleSnackClose}
                >
                    <Typography variant="h6">
                        {snackMessage}
                    </Typography>
                </MuiAlert>
            </Snackbar>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <Paper sx={{ marginTop: '12px'}}>
                <Button variant="contained" onClick={signUpWithEmail} sx={{ width: '216px' }}>
                    <EmailIcon sx={{mr: 1}}/>
                    Sign in with Email
                </Button>
            </Paper>
        </>
    );
};

const ThirdPartyAuthSignIn = () => {
    return (
        <>
            <ThirdPartyAuthByEmail/>
            <br/>
            <ThirdPartyAuthByGoogle/>
            <br/>
            <ThirdPartyAuthByGitHub/>
        </>
    );
}
export default ThirdPartyAuthSignIn;
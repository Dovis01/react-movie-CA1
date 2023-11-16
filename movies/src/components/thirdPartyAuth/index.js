import React, {useState} from 'react';
import {auth, GoogleAuthProvider} from '../../firebase.js';
import {signInWithPopup, createUserWithEmailAndPassword} from 'firebase/auth';
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import EmailIcon from '@mui/icons-material/Email';
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";


const provider = new GoogleAuthProvider();
const ThirdPartyAuthByGoogle = () => {
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // Google 登录成功后，可以获取用户信息
            const user = result.user;
            // 处理登录成功逻辑，例如设置用户状态或导航到其他页面
        } catch (error) {
            // 处理错误
            console.error(error);
        }
    };

    return (
        <>
            <Button variant="contained" onClick={signInWithGoogle}>
                <GoogleIcon sx={{mr: 1}}/>
                Sign in with Google
            </Button>
        </>
    );
};

const ThirdPartyAuthByEmail = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUpWithEmail = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // 处理用户注册成功逻辑
        } catch (error) {
            // 处理错误
            console.error(error);
        }
    };

    return (
        <>
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
                <Button variant="contained" onClick={signUpWithEmail}>
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
        </>
    );
}
export default ThirdPartyAuthSignIn;
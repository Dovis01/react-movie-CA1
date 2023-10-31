import React, {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {useNavigate} from "react-router-dom";
import {styled} from '@mui/material/styles';
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import colorTheme from "../../theme/adjustColor";
import {ThemeProvider} from '@mui/material/styles';

const Offset = styled('div')(({theme}) => theme.mixins.toolbar);

const SiteHeader = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const menuOptions = [
        {label: "Home", path: "/"},
        {label: "Favorites", path: "/movies/favorites"},
        {label: "Upcoming", path: "/movies/upcoming"},
        {label: "ToWatchList", path: "/movies/watchlist"},
    ];

    const handleMenuSelect = (pageURL) => {
        navigate(pageURL, {replace: true});
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <ThemeProvider theme={colorTheme}>
                <AppBar position="fixed" color="primary" elevation={8} sx={{padding:0.75}}>
                    <Toolbar>
                        <Typography variant="h4" sx={{flexGrow: 1}}>
                            TMDB Client
                        </Typography>
                        <Typography variant="h6" sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} align="center">
                            All you ever wanted to know about Movies!
                        </Typography>
                        {isMobile ? (
                            <>
                                <IconButton
                                    aria-label="menu"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={open}
                                    onClose={() => setAnchorEl(null)}
                                >
                                    {menuOptions.map((opt) => (
                                        <MenuItem
                                            key={opt.label}
                                            onClick={() => handleMenuSelect(opt.path)}
                                        >
                                            {opt.label}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        ) : (
                            <>
                                {menuOptions.map((opt) => (
                                    <Button
                                        key={opt.label}
                                        color="inherit"
                                        onClick={() => handleMenuSelect(opt.path)}
                                    >
                                        {opt.label}
                                    </Button>
                                ))}
                            </>
                        )}
                    </Toolbar>
                </AppBar>
                <Offset/>
            </ThemeProvider>
        </>
    );
};

export default SiteHeader;
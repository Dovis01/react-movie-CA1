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
    const [mobileSubAnchorEl, setMobileSubAnchorEl] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const open = Boolean(anchorEl);
    const mobileSubOpen = Boolean(mobileSubAnchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const menuOptions = [
        {label: "Home", path: "/"},
        {label: "Movies"},
        {label: "People"},
        {label: "Personal"},
        {label: "Log in", path: "/login"},
    ];
    const movieSubMenuOptions = [
        {label: "Upcoming", path: "/movies/upcoming"},
        {label: "Now Playing", path: "/movies/nowplaying"},
        {label: "Week Trending", path: "/movies/weektrending"},
    ];
    const peopleSubMenuOptions = [
        {label: "Popular people", path: "/people/popular"},
        {label: "Week Trending", path: "/people/weektrending"},
    ];
    const personalSubMenuOptions = [
        {label: "Favorites", path: "/movies/favorites"},
        {label: "ToWatchList", path: "/movies/watchlist"},
    ];

    const handleMenuSelect = (pageURL) => {
        //navigate(pageURL, {replace: true}); 替换，因为replace: true会导致无法返回上一页，每次触发都会刷新历史浏览记录
        navigate(pageURL);
    };

    const handleMenu = (subMenuLabel, event) => {
        setAnchorEl(event.currentTarget);
        setActiveSubMenu(subMenuLabel);
    };

    const handleMobileMenu = (subMenuLabel, event) => {
        setMobileSubAnchorEl(event.currentTarget);
        setActiveSubMenu(subMenuLabel);
    };

    const handleSubMenuClose = () => {
        setAnchorEl(null);
        setMobileSubAnchorEl(null);
    };

    return (
        <>
            <ThemeProvider theme={colorTheme}>
                <AppBar position="fixed" color="primary" elevation={8} sx={{padding: 0.75}}>
                    <Toolbar>
                        <Typography variant="h4" sx={{flexGrow: 1}}>
                            TMDB Client
                        </Typography>
                        <Typography variant="h6" sx={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}
                                    align="center">
                            All you ever wanted to know about Movies!
                        </Typography>
                        {isMobile ? (
                            <>
                                <IconButton
                                    aria-label="menu"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={(event)=>handleMenu("",event)}
                                    color="inherit"
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    open={open}
                                    onClose={handleSubMenuClose}
                                >
                                    {menuOptions.map((opt) => {
                                        if (opt.label === "Movies") {
                                            return (
                                                <div
                                                    key={opt.label}
                                                >
                                                    <Button
                                                        color="inherit"
                                                        onClick={(event) => handleMobileMenu('Movies', event)}
                                                    >
                                                        {opt.label}
                                                    </Button>
                                                    {activeSubMenu === 'Movies' && (
                                                        <Menu
                                                            id="menu-appbar"
                                                            anchorEl={mobileSubAnchorEl}
                                                            anchorOrigin={{
                                                                vertical: "top",
                                                                horizontal: "left",
                                                            }}
                                                            keepMounted
                                                            transformOrigin={{
                                                                vertical: "top",
                                                                horizontal: "right",
                                                            }}
                                                            open={mobileSubOpen}
                                                            onClose={handleSubMenuClose}
                                                            autoFocus={false}
                                                        >
                                                            {movieSubMenuOptions.map((subOpt) => (
                                                                <MenuItem
                                                                    key={subOpt.label}
                                                                    onClick={() => {
                                                                        handleMenuSelect(subOpt.path);
                                                                        handleSubMenuClose();
                                                                    }}
                                                                >
                                                                    {subOpt.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Menu>
                                                    )}
                                                </div>
                                            );
                                        } else if (opt.label === "Personal") {
                                            return (
                                                <div
                                                    key={opt.label}
                                                >
                                                    <Button
                                                        color="inherit"
                                                        onClick={(event) => handleMobileMenu('Personal', event)}
                                                    >
                                                        {opt.label}
                                                    </Button>
                                                    {activeSubMenu === 'Personal' && (
                                                        <Menu
                                                            id="menu-appbar"
                                                            anchorEl={mobileSubAnchorEl}
                                                            anchorOrigin={{
                                                                vertical: "top",
                                                                horizontal: "left",
                                                            }}
                                                            keepMounted
                                                            transformOrigin={{
                                                                vertical: "top",
                                                                horizontal: "right",
                                                            }}
                                                            open={mobileSubOpen}
                                                            onClose={handleSubMenuClose}
                                                            autoFocus={false}
                                                        >
                                                            {personalSubMenuOptions.map((subOpt) => (
                                                                <MenuItem
                                                                    key={subOpt.label}
                                                                    onClick={() => {
                                                                        handleMenuSelect(subOpt.path);
                                                                        handleSubMenuClose();
                                                                    }}
                                                                >
                                                                    {subOpt.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Menu>
                                                    )}
                                                </div>
                                            );
                                        } else if (opt.label === "People") {
                                            return (
                                                <div
                                                    key={opt.label}
                                                >
                                                    <Button
                                                        color="inherit"
                                                        onClick={(event) => handleMobileMenu('People', event)}
                                                    >
                                                        {opt.label}
                                                    </Button>
                                                    {activeSubMenu === 'People' && (
                                                        <Menu
                                                            id="menu-appbar"
                                                            anchorEl={mobileSubAnchorEl}
                                                            anchorOrigin={{
                                                                vertical: "top",
                                                                horizontal: "left",
                                                            }}
                                                            keepMounted
                                                            transformOrigin={{
                                                                vertical: "top",
                                                                horizontal: "right",
                                                            }}
                                                            open={mobileSubOpen}
                                                            onClose={handleSubMenuClose}
                                                            autoFocus={false}
                                                        >
                                                            {peopleSubMenuOptions.map((subOpt) => (
                                                                <MenuItem
                                                                    key={subOpt.label}
                                                                    onClick={() => {
                                                                        handleMenuSelect(subOpt.path);
                                                                        handleSubMenuClose();
                                                                    }}
                                                                >
                                                                    {subOpt.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Menu>
                                                    )}
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <Button
                                                    key={opt.label}
                                                    color="inherit"
                                                    onClick={() => {
                                                        handleMenuSelect(opt.path);
                                                        handleSubMenuClose();
                                                    }}
                                                >
                                                    {opt.label}
                                                </Button>
                                            );
                                        }
                                    })}
                                </Menu>
                            </>
                        ) : (
                            <>
                                {menuOptions.map((opt) => {
                                    if (opt.label === "Movies") {
                                        return (
                                            <div
                                                key={opt.label}
                                                onMouseLeave={handleSubMenuClose}
                                                style={{display: 'inline-block'}}
                                            >
                                                <Button
                                                    color="inherit"
                                                    style={{marginRight: '10px'}}
                                                    onMouseEnter={(event) => handleMenu('Movies', event)}
                                                >
                                                    {opt.label}
                                                </Button>
                                                {activeSubMenu === 'Movies' && (
                                                    <Menu
                                                        id="menu-appbar"
                                                        anchorEl={anchorEl}
                                                        anchorOrigin={{
                                                            vertical: "bottom",
                                                            horizontal: "left",
                                                        }}
                                                        keepMounted
                                                        transformOrigin={{
                                                            vertical: "top",
                                                            horizontal: "left",
                                                        }}
                                                        open={open}
                                                        onClose={handleSubMenuClose}
                                                        autoFocus={false}
                                                    >
                                                        {movieSubMenuOptions.map((subOpt) => (
                                                            <MenuItem
                                                                key={subOpt.label}
                                                                onClick={() => {
                                                                    handleMenuSelect(subOpt.path);
                                                                    handleSubMenuClose();
                                                                }}
                                                            >
                                                                {subOpt.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                )}
                                            </div>
                                        );
                                    } else if (opt.label === "Personal") {
                                        return (
                                            <div
                                                key={opt.label}
                                                onMouseLeave={handleSubMenuClose}
                                                style={{display: 'inline-block'}}
                                            >
                                                <Button
                                                    color="inherit"
                                                    style={{marginRight: '10px'}}
                                                    onMouseEnter={(event) => handleMenu('Personal', event)}
                                                >
                                                    {opt.label}
                                                </Button>
                                                {activeSubMenu === 'Personal' && (
                                                    <Menu
                                                        id="menu-appbar"
                                                        anchorEl={anchorEl}
                                                        anchorOrigin={{
                                                            vertical: "bottom",
                                                            horizontal: "left",
                                                        }}
                                                        keepMounted
                                                        transformOrigin={{
                                                            vertical: "top",
                                                            horizontal: "left",
                                                        }}
                                                        open={open}
                                                        onClose={handleSubMenuClose}
                                                        autoFocus={false}
                                                    >
                                                        {personalSubMenuOptions.map((subOpt) => (
                                                            <MenuItem
                                                                key={subOpt.label}
                                                                onClick={() => {
                                                                    handleMenuSelect(subOpt.path);
                                                                    handleSubMenuClose();
                                                                }}
                                                            >
                                                                {subOpt.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                )}
                                            </div>
                                        );
                                    } else if (opt.label === "People") {
                                        return (
                                            <div
                                                key={opt.label}
                                                onMouseLeave={handleSubMenuClose}
                                                style={{display: 'inline-block'}}
                                            >
                                                <Button
                                                    color="inherit"
                                                    style={{marginRight: '10px'}}
                                                    onMouseEnter={(event) => handleMenu('People', event)}
                                                >
                                                    {opt.label}
                                                </Button>
                                                {activeSubMenu === 'People' && (
                                                    <Menu
                                                        id="menu-appbar"
                                                        anchorEl={anchorEl}
                                                        anchorOrigin={{
                                                            vertical: "bottom",
                                                            horizontal: "left",
                                                        }}
                                                        keepMounted
                                                        transformOrigin={{
                                                            vertical: "top",
                                                            horizontal: "left",
                                                        }}
                                                        open={open}
                                                        onClose={handleSubMenuClose}
                                                        autoFocus={false}
                                                    >
                                                        {peopleSubMenuOptions.map((subOpt) => (
                                                            <MenuItem
                                                                key={subOpt.label}
                                                                onClick={() => {
                                                                    handleMenuSelect(subOpt.path);
                                                                    handleSubMenuClose();
                                                                }}
                                                            >
                                                                {subOpt.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                )}
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <Button
                                                key={opt.label}
                                                style={{marginRight: '10px'}}
                                                color="inherit"
                                                onClick={() => handleMenuSelect(opt.path)}
                                            >
                                                {opt.label}
                                            </Button>
                                        );
                                    }
                                })}
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
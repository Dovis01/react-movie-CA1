import backgroundMainImage from '../images/pexels-eberhard-grossgasteiger-1366919.jpg';
import backgroundCardImage from '../images/pexels-laura-tancredi-7078717.jpg';

const backgroundImageStyles = {
    backgroundMainContainer: {
        backgroundImage: `url(${backgroundMainImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        zIndex: -1,
        position: 'absolute',
        right: 0,
        left: 0,
    },
    backgroundCardContainer: {
        backgroundImage: `url(${backgroundCardImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
    },
    backgroundDetailContainer:{
        backgroundColor: 'rgba(219,232,240,0.7)',
        zIndex: -10,
        position: 'relative',
    },
};

export default backgroundImageStyles;
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
    window: {
        width,
        height,
    },
    isSmallDevice: width < 375,
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 250,
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10
    }
};

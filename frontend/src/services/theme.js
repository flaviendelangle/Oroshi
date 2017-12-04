import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import * as colors from 'material-ui/styles/colors';
import merge from 'lodash.merge';

const muiTheme = {
  palette: {
    textColor: colors.grey200,
    primary1Color: colors.blueGrey800, // Header background
    primary2Color: colors.blueGrey800,
    backgroundColor: colors.blueGrey900,
    paperBackground: colors.grey200,
    paperColor: colors.grey800,
    titleColor: colors.grey400,
    alternateTextColor: colors.amber900
  }
};

const theme = merge(darkBaseTheme, muiTheme);
console.log('THEME : ', theme);

export default theme;
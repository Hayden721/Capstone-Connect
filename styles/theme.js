import { color } from "react-native-reanimated";

const colors = {
  white: '#ffffff',
  black: '#000000',
  grey_0: '#d5d5d5',
  grey_1: '#a6a6a6',
  blackPearl: '#1e272e',
  londonSquare: '#808e9b',
  goodNight: '#485460',
  hintOfElusiveBlue: '#d2dae2',
  red: '#e84118',
  blue: '#3679fe',
};

export const theme = {
  background:colors.white,
  text: colors.black,
  blackPearlBackgorund: colors.blackPearl,
  //imageColor
  imageBackground: colors.grey_0,
  imageButtonBackground: colors.hintOfElusiveBlue,
  imageButtonIcon: colors.londonSquare,
  logoColor: colors.goodNight,
  //loginTextInput
  label: colors.grey_1,
  inputPlaceholder:colors.grey_1,
  inputBorder: colors.grey_1,
  // error Message
  errorText: colors.red,
  //button
  buttonBackground: colors.blackPearl,
  buttonTitle: colors.white,
  buttonUnfilledTitle: colors.blue,
  buttonLogout: colors.red,

  headerTintColor: colors.black,

  listBorder: colors.grey_0,
  listTime: colors.grey_1,
  listDescription: colors.grey_1,
  listIcon: colors.black,

  sendButtonActivate: colors.blue,
  sendButtonInactivate: colors.grey_1,

};
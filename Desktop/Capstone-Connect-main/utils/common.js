export const validateEmail = email => {
  const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9]+(\.)?[0-9?A-z0-9?]+@[o]+(\.)+[s][h][i][n][h][a][n]+(\.)+[a][c]+(\.)+[k][r]$/;
  return regex.test(email);
};
// 공백 제거 함수
export const removeWhitespace = text => {
  const regex = /\s/g;
  return text.replace(regex, '');
}
export const saveToken = () => {
  // url에 있는 토큰이름 가져오기
  const params = new URLSearchParams(window.location.search);
  // localstorage에 토큰 저장(string 형태)
  const token = JSON.stringify(params.get('accessToken'));
  const userID = JSON.stringify(params.get('userId'));
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('userID', userID);
};

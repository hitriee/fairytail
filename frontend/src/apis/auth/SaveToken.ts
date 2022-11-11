function SaveToken() {
  // url에 있는 토큰이름 가져오기
  const params = new URLSearchParams(window.location.search);
  // localstorage에 넣기 위해 string 형태로 변환
  const token = JSON.stringify(params.get('accessToken'));
  window.localStorage.setItem('token', token);
  // console.log(window.location.search);
}

export default SaveToken;

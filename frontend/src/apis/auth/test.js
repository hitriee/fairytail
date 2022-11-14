import axios from 'axios';

async function GetUser() {
  const res = await axios({
    // url: 'https://k7c209.p.ssafy.io/user',
    url: 'http://k7c209.p.ssafy.io:8000/health_check',
    method: 'get',
    headers: {Authorization: `Bearer ${localStorage.token}`},
    // body: {Authorization: `Bearer ${localStorage.token}`}
  })
    .then(res => res)
    // .then(re => {
    //   // re.data;
    //   navigate('/main');
    // })

    .catch(err => {
      console.error(err);
    });
  return res;
}

// export default GetUser;
GetUser();

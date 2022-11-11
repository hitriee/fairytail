import axios from 'axios';
import {useNavigate} from 'react-router-dom';

async function GetUser() {
  const navigate = useNavigate();

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

export default GetUser;

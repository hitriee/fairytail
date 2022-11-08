const noticeDAO = require('../model/noticeDAO');
const admin = require('../config/pushConn');

const pushNotice = async (req, res) => {
  const parameters = {
    notice_num: req.query.num,
  };
  const result = await noticeDAO.read_notice(parameters);

  // fcm send message
  let message = {
    token: '안드로이드 token값',
    notification: {
      // 보내는 위치 알려주기 위해 body에 Notice 넣어줌
      body: 'Notice',
    },
    data: {
      title: result[0].notice_title,
      body: result[0].notice_content,
    },
    android: {
      priority: 'high',
    },
  };

  admin
    .messaging()
    .send(message)
    .then(res => {
      console.log('Success sent message : ', res);
      res.send(res);
    })
    .catch(err => {
      console.log('Error Sending message !! : ', err);
      res.send(err);
    });
};

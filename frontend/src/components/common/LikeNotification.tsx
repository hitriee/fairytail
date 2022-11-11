export {};
// import {useRecoilState, useRecoilValue} from 'recoil';
// import {likeInfoState, likeModalState} from '@apis/Recoil';
// import MyNotification from '@individual/MyNotification';
// import {useEffect} from 'react';
// import {returnFalse} from '@common/commonFunc';

// function LikeNotification() {
//   const [open, setOpen] = useRecoilState(likeModalState);
//   const info = useRecoilValue(likeInfoState);
//   useEffect(() => {
//     setInterval(() => {
//       setOpen(returnFalse);
//     }, 1000);
//   }, []);

//   return <>{open ? <MyNotification item={info} /> : null}</>;
// }
// export default LikeNotification;

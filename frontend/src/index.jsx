import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { createBrowserHistory } from "history";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// const customHistory = createBrowserHistory({
//   // basename: config.urlBasename || ""
// });
// root.render(
//   <React.StrictMode>
//     <BrowserRouter history={customHistory}>
//       <Routes>
//         <Route
//           component={({ history }) => {
//             window.appHistory = history;
//             return <App />;
//           }}
//         />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

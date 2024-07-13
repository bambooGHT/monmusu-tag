import Request from "./axios";

export default Request;
// let lang = localStorage.getItem("lang");
// if (!lang) {
//   localStorage.setItem("lang", "JP");
//   lang = "jp";
// }

// const syncGet = (baseURL: string) => {
//   const xhr = new XMLHttpRequest();
//   return <T>(url: string, config?: Object): T => {
//     try {
//       xhr.open('GET', baseURL + url, false);
//       xhr.setRequestHeader("content-Type", "application/json");
//       // xhr.setRequestHeader("lang", lang);
//       xhr.send();
//       return JSON.parse(xhr.responseText);
//     } catch (error: any) {
//       message.add({ type: "error", message: xhr.responseText, duration: 3000 });
//       throw new Error(xhr.responseText);
//     }
//   };
// };

// const cancelreq = new cancelDupReq();
// import { ref } from "vue";

// const useSkeleton = (minTime: number) => {
//   const startTime = new Date().getTime();
//   const showSkeleton = ref(true);
//   let timeout = 0;

//   return (loading: boolean) => {
//     clearTimeout(timeout);
//     const currentTime = new Date().getTime();
//     const elapsedTime = currentTime - startTime;

//     if (elapsedTime >= minTime) {
//       showSkeleton.value = loading;
//     } else {
//       timeout = setTimeout(() => {
//         showSkeleton.value = loading;
//       }, minTime - elapsedTime);
//     }
    
//     return showSkeleton;
//   };
// };

// export default useSkeleton;
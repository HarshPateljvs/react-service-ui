import { memo } from "react";

const TeacherPanel = () => {
  console.log('[ARTIFICIALLY SLOW] Rendering 500 <SlowPost />');

//   let items = [];
//   for (let i = 0; i < 2500; i++) {
//     items.push(<SlowPost key={i} index={i} />);
//   }

//   return (
//     <>
//       <h1>Teacher Panel - Artificially Slow Render</h1>
//       <ul className="items">{items}</ul>
//     </>
//   );
// };

// const SlowPost = ({ index }: { index: number }) => {
//   // Slow down intentionally
//   let startTime = performance.now();
//   while (performance.now() - startTime < 1) {
//     // Do nothing, emulate heavy computation
//   }

  // return <li className="item">Post #{index + 1}</li>;
  return <><h1>Teacher Panel</h1></>;
};

export default memo(TeacherPanel);
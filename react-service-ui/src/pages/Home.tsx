import { AVTUseState,AVTUseEffect } from '../Library/customHooks/index'; // Importing custom hooks

function Home() {
  const [count, setCount] = AVTUseState("ke",0); // Just like useState


  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };
   AVTUseEffect('asas', () => {
      }, [count]); // Runs whenever 'count' changes

  return (
    <div>
        <div>
      <h2>Timer: {count} seconds</h2>
    </div>
      <h1>Custom Hook Demo</h1>

      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment Count</button>

      <br /><br />

    </div>
  );
}

export default Home;

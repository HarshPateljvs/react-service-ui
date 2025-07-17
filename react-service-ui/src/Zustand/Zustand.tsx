import { useCounterStore } from "./store";
import CommonButton from "../Library/Components/Form/CommonButton";
import ComponentLifecycle from "./componentlifecycle";
import ddddddd from "../Zustand/demo";

const secondincremntUpdate = () => {
  useCounterStore.setState((state) => ({
    secodCounter: state.secodCounter + 1, 
  }));
};

const seconddescrementUpdate = () => {
  useCounterStore.setState((state) => ({
    secodCounter: state.secodCounter - 1, 
  }));
};

const Zustand = () => {
  const count = useCounterStore((state) => state.count);
  const secondcount = useCounterStore((state) => state.secodCounter);
  return (
    <OtherComponent count={count} secondcount={secondcount}></OtherComponent>
  );
};
interface OtherComponentProps {
  count: number;
  secondcount: number;
}

const OtherComponent = ({ count, secondcount }: OtherComponentProps) => {
  const increment = useCounterStore((state) => state.increament);
  const decrement = useCounterStore((state) => state.decreament);
ddddddd.use
  return (
    <>
      <div>First :{count}</div>
      <div className="flex w-4 gap-2 shrink">
        <CommonButton onClick={increment}>increament</CommonButton>
        <CommonButton onClick={decrement}>decrement</CommonButton>
      </div>
      <hr />
      <div>Second :{secondcount}</div>
      <div className="flex w-4 gap-2 shrink">
        <CommonButton onClick={secondincremntUpdate}>increament</CommonButton>
        <CommonButton onClick={seconddescrementUpdate}>decrement</CommonButton>
      </div>

      <hr/>
      <ComponentLifecycle></ComponentLifecycle>
    </>
  );
};
export default Zustand;


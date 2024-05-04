import { FC, useCallback, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { drawPick, drawReset, selectDraw, setDrawCountDown } from "./featuers/slices/drawSlice"
import { useCountdown } from "./hooks/useCountDown";
import { formatTime } from "./utils/formats";

const App:FC = () => {
  const minRef = useRef<HTMLInputElement>(null);
  const { countDown, list, picker, intervalMS } = useSelector(selectDraw);
  const dispatch = useDispatch();
  const changeMin = useCallback(() => {
    if (minRef.current) {
      const seconds = Number(minRef.current.value) * 60;
      dispatch(setDrawCountDown(seconds));
    }
  }, [dispatch]);
  const draw = useCallback(() => dispatch(drawPick()), [dispatch]);
  const reset = useCallback(() => dispatch(drawReset()), [dispatch]);
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: countDown,
      intervalMs: intervalMS,
      extraCallback: draw
    })
  useEffect(() => {
    resetCountdown();
  }, [countDown, resetCountdown]);

  return (
    <main className="container-sm">
      <h1>init proj</h1>
      <input type="tel" ref={minRef} />
      <p>display: { countDown }</p>
      <p>count: { formatTime(count) }</p>
      <p>list</p>
      <ul>
        {list.map((el, idx) => (
          <li key={idx}>{el}</li>
        ))}
      </ul>
      <p>picker: {picker}</p>
      <button onClick={changeMin} >設定時間</button>
      <button onClick={startCountdown}>開始倒數</button>
      <button onClick={stopCountdown}>暫停倒數</button>
      <button onClick={resetCountdown}>重置倒數</button>
      <button onClick={draw}>抽獎</button>
      <button onClick={reset}>重置名單</button>
    </main>
  )
}

export default App

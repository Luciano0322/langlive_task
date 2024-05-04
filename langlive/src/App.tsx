import { FC, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { drawPick, drawReset, selectDraw, setDrawCountDown } from "./featuers/slices/drawSlice"

const App:FC = () => {
  const minRef = useRef<HTMLInputElement>(null);
  const { countDown, list, picker } = useSelector(selectDraw);
  const dispatch = useDispatch();
  const changeMin = () => {
    if (minRef.current) {
      const seconds = Number(minRef.current.value) * 60;
      dispatch(setDrawCountDown(seconds));
    }
  }
  const draw = () => dispatch(drawPick());
  const reset = () => dispatch(drawReset());
  return (
    <main className="container-sm">
      <h1>init proj</h1>
      <input type="tel" ref={minRef} />
      <p>display: { countDown }</p>
      <p>list</p>
      <ul>
        {list.map((el, idx) => (
          <li key={idx}>{el}</li>
        ))}
      </ul>
      <p>picker: {picker}</p>
      <button onClick={changeMin} >設定時間</button>
      <button onClick={draw}>抽獎</button>
      <button onClick={reset}>重置名單</button>
    </main>
  )
}

export default App

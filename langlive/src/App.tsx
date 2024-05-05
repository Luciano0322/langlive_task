import { FC, useCallback, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { drawPick, drawReset, selectDraw, setDrawCountDown } from "./featuers/slices/drawSlice"
import { useCountdown } from "./hooks/useCountDown";
import { formatTime } from "./utils/formats";
import { useBoolean } from "./hooks/useBoolean";
import Modal from "./components/Modal";

const App:FC = () => {
  const minRef = useRef<HTMLInputElement>(null);
  const { value: isFocus, setTrue: setFocus, setFalse: setBlur } = useBoolean(false);
  const { value: isModalOpen, setTrue: modalOpen, setFalse: madalClose } = useBoolean(false);
  const { countDown, list, picker, intervalMS } = useSelector(selectDraw);
  const dispatch = useDispatch();
  const changeMin = useCallback(() => {
    if (minRef.current) {
      const seconds = Number(minRef.current.value) * 60;
      dispatch(setDrawCountDown(seconds));
    }
  }, [dispatch]);
  const draw = useCallback(() => {
    dispatch(drawPick());
    modalOpen();
  }, [dispatch, modalOpen]);
  const reset = useCallback(() => dispatch(drawReset()), [dispatch]);
  const [count, { startCountdown, stopCountdown, resetCountdown }, isRunning] =
    useCountdown({
      countStart: countDown,
      intervalMs: intervalMS,
      extraCallback: draw
    })
  useEffect(() => {
    resetCountdown();
  }, [countDown, resetCountdown]);

  return (
    <main className="container pt-4 mx-auto grid gap-2 grid-cols-1 md:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold underline">抽獎功能</h1>
        <div className="flex my-2 px-2 flex-wrap items-center gap-1">
          <div className="my-2 relative min-w-min">
            <input 
              className="p-1 border-b-2 transition-all w-full focus:border-b-2 focus:outline-none focus:border-blue-500" 
              id="seconds" 
              type="tel" 
              ref={minRef}
              onFocus={setFocus}
              onBlur={setBlur}
            />
            <label 
              className={`absolute left-1 transition-all duration-200 ease-in ${isFocus || minRef.current?.value ? `-top-3 text-xs text-blue-500`: `top-2 text-base`}`} 
              htmlFor="seconds"
            >設定倒數時間</label>
            <small className="pt-1 text-xs">單位: 分鐘</small>
          </div>
          <button 
            className="rounded-lg bg-blue-200 font-bold text-blue-600 shadow-md p-2 transition-all hover:brightness-50 hover:shadow-xl hover:-translate-y-1 active:brightness-125 disabled:bg-gray-300 disabled:text-black" 
            onClick={changeMin} 
            disabled={isRunning}
          >
            設定時間
          </button>
        </div>
        <h2 className="text-xl px-2 font-bold text-blue-800">倒數時間</h2>
        <p className={`text-5xl px-2 font-bold ${isRunning ? `text-blue-700`:`text-red-700`}`}>{ formatTime(count) }</p>
        <div className="flex gap-3 items-center p-2">
          <button 
            className="rounded-lg bg-green-200 font-bold text-green-700 shadow-md p-2 transition-all hover:brightness-50 hover:shadow-xl hover:-translate-y-1 active:brightness-125 disabled:bg-gray-300 disabled:text-black" 
            onClick={startCountdown}
            disabled={isRunning}
          >
              開始抽獎
          </button>
          <button 
            className="rounded-lg bg-yellow-200 font-bold text-yellow-700 shadow-md p-2 transition-all hover:brightness-50 hover:shadow-xl hover:-translate-y-1 active:brightness-125 disabled:bg-gray-300 disabled:text-black" 
            onClick={stopCountdown}
            disabled={!isRunning}
          >
            暫停抽獎
          </button>
          <button 
            className="rounded-lg bg-red-200 font-bold text-red-700 shadow-md p-2 transition-all hover:brightness-50 hover:shadow-xl hover:-translate-y-1 active:brightness-125 disabled:bg-gray-300 disabled:text-black" 
            onClick={resetCountdown}
          >
            重置抽獎
          </button>
        </div>
      </div>
      <div className="rounded-lg shadow-md py-2 mx-2 bg-yellow-200">
        <h3 className="text-xl font-bold text-blue-500 px-2">人員名單</h3>
        <hr/>
        <ul className="max-h-40 overflow-y-scroll border-2 border-dotted border-red-500 [&>*:nth-child(odd)]:bg-yellow-500">
          {list.map((el, idx) => (
            <li className="px-2" key={idx}>{el}</li>
          ))}
        </ul>
        <hr />
        <div className="flex items-center justify-end mt-2 px-2">
          <button 
            className="rounded-lg bg-red-200 font-bold text-red-700 shadow-md p-2 transition-all hover:brightness-50 hover:shadow-xl hover:-translate-y-1 active:brightness-125 disabled:bg-gray-300 disabled:text-black" 
            onClick={reset}
          >
            重置名單
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={madalClose} winnerName={picker}/>
    </main>
  )
}

export default App;

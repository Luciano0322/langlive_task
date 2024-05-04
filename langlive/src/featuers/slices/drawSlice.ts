import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// 資料型別我這裡簡單處理，通常長大到一定程度我會考量拆出.d.ts的副檔，統一集中管理
interface DrawState {
  list: string[];
  picker: string | null;
  intervalMS: number;
  countDown: number;
}

// 這裡模擬人員名單，但注意這個名單應該由 rtk-query 接到回傳資料後處理
const INIT_LIST: string[] = ["Alex", "Bob", "Cathy", "Duke", "Ellie", "Frank", "George", "Harry"];

// 預設一分鐘可改倒數時間，每秒處理所以 intervalMS = 1000
const initialState: DrawState = {
  list: INIT_LIST,
  picker: null,
  intervalMS: 1000,
  countDown: 60,
}

// function randomDraw<T>(items: T[]): T | undefined {
//   if (items.length === 0) return undefined;  // 如果陣列是空的，返回 undefined
//   const randomIndex = Math.floor(Math.random() * items.length);
//   return items[randomIndex];  // 返回隨機選取的元素
// }

const drawSlice = createSlice({
  name: 'draw',
  initialState,
  reducers: {
    // 這裡固定會有 sate & action 兩參數，直接對應於上面的 state
    drawReset: (state) => {
      state.list = INIT_LIST;
      state.picker = null;
    },
    setDrawCountDown: (state, action) => {
      state.countDown = action.payload as number;
    },
    drawPick: (state) => {
      const randomIndex = Math.floor(Math.random() * state.list.length);
      state.picker = state.list[randomIndex];
      state.list = state.list.filter(el => el !== state.list[randomIndex]);
    },
  },
})

export const selectDraw = (state: RootState ) => state.draw;

export const { drawReset, drawPick, setDrawCountDown } = drawSlice.actions;

export default drawSlice.reducer;
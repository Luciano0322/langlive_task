# React Typescript vite 的基本預設
## 資夾分類
基本上 follow 我 Redux 教學文章的做法，有興趣深入了解可以看![這個文章連結](https://ithelp.ithome.com.tw/users/20129020/ironman/5360?page=1)，我就是作者，這裡沒有展開 rtk query 的做法，因為沒有需求，如果想知道怎麼處理的話可以參考我求職信件上面的 ![github 範例](https://github.com/Luciano0322/atrt-client)。
  
## hooks的處理
我是沒有直接安裝 usehook-ts 這個第三方套件來處理倒數計時的問題，因為我也曾經寫過 custom hook 的技術分享文一段時間，自從這個第三方套件開源之後就比較少做 custom hook 這件事了，但我還是有能力自己建構 hook 的，原理基本上可以參考其他公開的 github repo，或是![這個系列文章](https://ithelp.ithome.com.tw/articles/10285456)。

## 功能節點的拆分
- 首先會考慮抽獎功能的思維邏輯，這部分的 slice 只針對抽獎功能做切分。
- 倒數計時的 hook 設計，要牽涉到useEffect的使用層面，custom hook是比較合適的解決方案，在使用 redux 這類的狀態工具，最忌諱就是不分青紅皂白全部往裡面送，在專案不斷長大的情況下，沒有確實拆分side effect的使用情境，會增加後續修改重構的時程。
- 會這麼拆分就是想要保有後續需求變更時的修改彈性。



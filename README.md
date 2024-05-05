# 浪live_interview
 for interview question
## 建構想法
1. 有倒數計時的功能。
2. 從名單列表中撈人進行隨機抽獎功能。
3. 倒數計時的功能需要有可以設定時間、開始、結束與重設的按鈕。
4. 名單人數應該由 api 回傳信息以確保，資料母體不會被串改的可能。
5. 邏輯為 1 -> 2 倒數功能結束後觸發抽獎邏輯。
  
### 技術選型
- 依照題目要求state management 使用 redux-toolkit，樣式我考慮採用 tailwindcss。
- 殺雞焉用牛刀，所以考慮採用基本的 react + typescript，
有太多經驗是不想去多學怎麼使用 react-router/tanstack-router 而採用 nextjs，
在踩入使用 nextjs 之前請先搞懂架構與渲染模式的差異，可以參考 [我的部落格文章](https://pse.is/5we5kq)。




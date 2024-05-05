// 這部分還可以依照後續需求新增或修改，目前以2位數分鐘倒數為初設預設值
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  // 使用模板字面量和 `.padStart(2, '0')` 來確保時間始終以兩位數顯示
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
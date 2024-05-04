import { FC } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  winnerName: string | null;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, winnerName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold">抽獎結果</h2>
        {winnerName ? <p className="text-gray-700 mt-4">恭喜 <span className="font-semibold">{winnerName}</span> 中獎！</p> : <p className="text-gray-700 mt-4">正在進行抽獎...</p>}
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>關閉</button>
      </div>
    </div>
  );
};

export default Modal;
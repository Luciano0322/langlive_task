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
        <hr/> 
        {winnerName ? <p className="text-gray-700 mt-4">恭喜 <span className="font-semibold">{winnerName}</span> 中獎！</p> : <p className="text-gray-700 mt-4">正在進行抽獎...</p>}
        <div className="flex justify-end items-center">
          <button 
            className="rounded-lg bg-blue-200 font-bold text-blue-600 shadow-md p-2 transition-all hover:brightness-50 hover:shadow-xl hover:-translate-y-1 active:brightness-125 disabled:bg-gray-300 disabled:text-black" 
            onClick={onClose}
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
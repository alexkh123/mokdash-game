import React from 'react';
import { X, Backpack, Coins, Shirt, Footprints, Wand2, CupSoda, Flame, Utensils, HeartHandshake, Sparkles, Droplet } from 'lucide-react';
import { InventoryItem } from '../types';

interface BackpackModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: InventoryItem[];
  coins: number;
}

const getItemIcon = (iconName: string) => {
  switch (iconName) {
    case 'Coins': return <Coins className="w-6 h-6 text-amber-400" />;
    case 'Shirt': return <Shirt className="w-6 h-6 text-sky-300" />;
    case 'Footprints': return <Footprints className="w-6 h-6 text-amber-600" />;
    case 'Wand2': return <Wand2 className="w-6 h-6 text-amber-200" />;
    case 'CupSoda': return <CupSoda className="w-6 h-6 text-sky-400" />;
    case 'Flame': return <Flame className="w-6 h-6 text-orange-400" />;
    case 'Utensils': return <Utensils className="w-6 h-6 text-emerald-400" />;
    case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-rose-400" />;
    case 'Droplet': return <Droplet className="w-6 h-6 text-amber-300" />;
    default: return <Sparkles className="w-6 h-6 text-yellow-400" />;
  }
};

export const BackpackModal: React.FC<BackpackModalProps> = ({ isOpen, onClose, items, coins }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FFF9E5] border-4 border-[#8B4513] rounded-3xl max-w-lg w-full shadow-2xl p-6 text-[#5D4037] relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#D2B48C] pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#FFD700] rounded-2xl border-2 border-[#8B4513] shadow-sm">
              <Backpack className="w-6 h-6 text-[#8B4513]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#8B4513] font-heading">תרמיל המסע</h2>
              <p className="text-xs text-[#8B4513]/80 font-bold">ציוד וחפצים שנאספו בדרך לירושלים</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-[#FF4444] hover:bg-red-600 rounded-xl text-white font-black border-2 border-[#8B4513] transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Coin Balance Highlight */}
        <div className="bg-[#FFD700] p-4 rounded-2xl border-4 border-[#8B4513] mb-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Coins className="w-7 h-7 text-[#8B4513] animate-bounce" />
            <div>
              <span className="text-xs text-[#8B4513]/80 font-bold block">ארנק מעשר שני</span>
              <span className="text-lg font-black text-[#8B4513]">{coins} מטבעות כסף</span>
            </div>
          </div>
          <span className="text-xs bg-[#8B4513] text-white px-3 py-1 rounded-xl font-bold shadow-sm">
            פדיון קודש
          </span>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pl-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border-2 border-[#D2B48C] hover:border-[#8B4513] rounded-2xl p-3 flex items-start gap-3 transition-all shadow-sm"
            >
              <div className="p-2.5 bg-[#FDF6E3] rounded-xl border-2 border-[#D2B48C] flex-shrink-0">
                {getItemIcon(item.icon)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h3 className="font-bold text-sm text-[#8B4513] truncate">{item.name}</h3>
                  <span className="text-[10px] bg-[#8B4513] text-white px-1.5 py-0.5 rounded-lg font-black">
                    x{item.quantity}
                  </span>
                </div>
                <p className="text-xs text-[#5D4037] font-medium leading-snug">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t-2 border-[#D2B48C] text-center">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#FF4444] hover:bg-red-600 text-white font-black text-lg rounded-2xl border-b-4 border-red-800 active:translate-y-1 shadow-md transition-all"
          >
            סגור תרמיל
          </button>
        </div>

      </div>
    </div>
  );
};

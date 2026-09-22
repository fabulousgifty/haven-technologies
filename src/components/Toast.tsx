import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div
      id="global-toast-notification"
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 max-w-sm bg-white border border-slate-200 shadow-xl rounded-xl p-4 flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />}
        {isError && <AlertCircle className="w-5 h-5 text-red-500" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-[#1769E0]" />}
      </div>
      <div className="flex-1 text-sm text-[#0B1F3A] font-medium leading-snug">
        {toast.message}
      </div>
      <button
        id="dismiss-toast-btn"
        onClick={hideToast}
        className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded cursor-pointer"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

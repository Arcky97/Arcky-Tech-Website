import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  label: string; 
  enabled: boolean; 
  onChange: (value:boolean) => void;
  className?: string;
}

export default function ToggleSwitch({ label, enabled, onChange, className }: Props) {
  return (
    <div className={`lg:w-1/3 items-center justify-between ${className ?? ""}`}>
      <label className="block text-white text-lg font-bold block mb-2">{label}</label>
      <button
        className={`relative w-14 h-7 flex items-center rounded-full transition-colors duration-300 ease-in-out ${
          enabled ? "bg-blue-500" : "bg-gray-500"
        }`}
        onClick={() => onChange(!enabled)}
      >
        <AnimatePresence>
          {enabled ? (
            <motion.span
              key="check"
              className="absolute left-2 text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Check size={14}/>
            </motion.span>
          ) : (
            <motion.span
              key="cross"
              className="absolute right-2 text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <X size={14}/>
            </motion.span>
          )}
        </AnimatePresence>
        <div
          className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out ${
            enabled ? "translate-x-7" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
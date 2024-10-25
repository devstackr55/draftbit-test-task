import { ChevronDown, Smartphone } from "lucide-react";
import { useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";

export const MarginPopover: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
}> = ({ isOpen, onClose, anchorEl }) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  useClickOutside(popoverRef, onClose);

  if (!isOpen || !anchorEl) return null;

  const rect = anchorEl.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const shouldShowBelow = rect.bottom + 300 <= viewportHeight;

  const popoverStyle = {
    position: "absolute" as const,
    ...(shouldShowBelow
      ? { top: `${rect.bottom + 8}px` }
      : { bottom: `${window.innerHeight - rect.top + 8}px` }),
    left: `${rect.left - 180}px`,
    zIndex: 1000,
  };

  const arrowStyle = {
    position: "absolute" as const,
    ...(shouldShowBelow
      ? {
          top: "-8px",
          borderBottom: "8px solid rgb(71, 85, 105)",
        }
      : {
          bottom: "-8px",
          borderTop: "8px solid rgb(71, 85, 105)",
        }),
    left: "180px",
    width: 0,
    height: 0,
    borderLeft: "8px solid transparent",
    borderRight: "8px solid transparent",
  };

  return (
    <div
      ref={popoverRef}
      className="bg-slate-900 rounded-lg w-96 shadow-xl z-50 border border-[rgb(71,85,105)]"
      style={popoverStyle}
    >
      <div style={arrowStyle} />

      <div className="p-4 border-b border-[rgb(71,85,105)]">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-[rgb(248,250,252)]" />
          <span className="text-[rgb(248,250,252)] font-medium">marginTop</span>
        </div>
        <p className="text-blue-400 text-sm mt-1">
          Configure a value for Mobile screen sizes or larger
        </p>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-[rgb(248,250,252)] text-sm">
            Static Value:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="bg-slate-800 text-[rgb(248,250,252)] rounded px-3 py-1.5 flex-grow focus:ring-2 focus:ring-blue-500 outline-none"
              defaultValue="auto"
            />
            <select className="bg-slate-800 text-[rgb(248,250,252)] px-3 py-1.5 rounded focus:ring-2 focus:ring-blue-500 outline-none">
              <option>pt</option>
              <option>%</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[rgb(248,250,252)] text-sm">
            Dynamic Value:
          </label>
          <div className="flex gap-2">
            <button
              disabled
              className="bg-slate-800 text-[rgb(248,250,252)] opacity-50 px-3 py-1.5 rounded flex-grow flex items-center justify-between cursor-not-allowed"
            >
              <span>Select...</span>
              <ChevronDown size={16} />
            </button>
            <button
              disabled
              className="bg-slate-800 text-[rgb(248,250,252)] opacity-50 p-1.5 rounded cursor-not-allowed"
            >
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        <p className="text-[rgb(248,250,252)] text-sm">
          If configured, will be applied to Mobile or larger breakpoints. If you
          configure a static style, it will be used as a fallback if the data
          evaluates to undefined.
        </p>
      </div>
    </div>
  );
};

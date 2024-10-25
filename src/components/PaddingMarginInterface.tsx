import React, { useState, useCallback } from "react";
import { MarginPopover } from "./Popover";

const fontStyle = {
  fontFamily: '"Inter var", sans-serif',
};

export default function Component() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setIsPopoverOpen(true);
    },
    []
  );

  const handlePopoverClose = useCallback(() => {
    setIsPopoverOpen(false);
  }, []);

  const SpacingButton: React.FC<{
    value?: string;
    isActive?: boolean;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    style?: React.CSSProperties;
  }> = ({ value = "auto", isActive = false, onClick, style }) => (
    <button
      className={`py-1 rounded text-center ${
        isActive
          ? "bg-orange-500 text-white"
          : "bg-slate-800 text-[rgb(248,250,252)] hover:bg-slate-700"
      }`}
      style={{ width: "2.5rem", fontSize: "0.75rem", ...style }}
      onClick={onClick}
    >
      {value}
    </button>
  );

  return (
    <div className="bg-slate-900 p-8 rounded-lg" style={fontStyle}>
      <div className="text-blue-400 text-sm mb-4">INDIVIDUAL</div>

      <div className="relative flex flex-col items-center gap-2">
        {/* Top margin */}
        <SpacingButton onClick={handlePopoverOpen} />

        <div className="flex items-center gap-2">
          {/* Left margin */}
          <SpacingButton onClick={handlePopoverOpen} />

          {/* Padding container */}
          <div className="relative" style={{ width: "200px", height: "200px" }}>
            <div
              className="absolute inset-0 rounded"
              style={{
                border: "4px solid rgb(71, 85, 105)",
              }}
            />

            <div className="absolute top-4 left-4 text-[rgb(248,250,252)] text-sm">
              Padding
            </div>

            {/* Top padding button */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: "1rem" }}
            >
              <SpacingButton onClick={handlePopoverOpen} />
            </div>

            {/* Left padding button */}
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: "1rem" }}
            >
              <SpacingButton onClick={handlePopoverOpen} />
            </div>

            {/* Right padding button */}
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ right: "1rem" }}
            >
              <SpacingButton
                value="16pt"
                isActive={true}
                onClick={handlePopoverOpen}
              />
            </div>

            {/* Bottom padding button */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ bottom: "1rem" }}
            >
              <SpacingButton onClick={handlePopoverOpen} />
            </div>
          </div>

          {/* Right margin */}
          <SpacingButton onClick={handlePopoverOpen} />
        </div>

        {/* Bottom margin */}
        <SpacingButton onClick={handlePopoverOpen} />
      </div>

      <MarginPopover
        isOpen={isPopoverOpen}
        onClose={handlePopoverClose}
        anchorEl={anchorEl}
      />
    </div>
  );
}

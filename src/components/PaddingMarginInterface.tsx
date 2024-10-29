import React, { useState, useCallback } from "react";
import { getSpacingConfig, SpacingConfig, updateSpacingConfig } from "../utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MarginPopover from "./Popover";
import { useMarginPadding } from "../hooks/useMarginPadding"; // Adjust the import path as needed
import { useUpdateMarginPadding } from "../hooks/useUpdateMarginPadding"; // Update the path as necessary

interface dataConfig {
  id: number;
  componentId: number;
  borderId: string;
  layoutId: string;
  effectId: string;
  marginPaddingId: string;
  positionId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Add the SpacingConfig interface to the props
interface PaddingMarginConfigProps {
  data: dataConfig; // Use the SpacingConfig interface for the data prop
}

const fontStyle = {
  fontFamily: '"Inter var", sans-serif',
};

export default function PaddingMarginConfig({
  data,
}: PaddingMarginConfigProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeProperty, setActiveProperty] = useState<
    keyof SpacingConfig | null
  >(null);

  const marginPaddingId = data.marginPaddingId;
  const { data: spacingConfig, isLoading } = useMarginPadding(marginPaddingId);

  const mutation = useUpdateMarginPadding(); // Use the custom hook

  const handlePopoverOpen = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement>,
      property: keyof SpacingConfig
    ) => {
      setAnchorEl(event.currentTarget);
      setActiveProperty(property);
      setIsPopoverOpen(true);
    },
    []
  );

  const handlePopoverClose = useCallback(() => {
    setIsPopoverOpen(false);
    setActiveProperty(null);
  }, []);

  const handleValueChange = useCallback(
    (value: string) => {
      if (activeProperty && spacingConfig) {
        const newConfig = { ...spacingConfig, [activeProperty]: value };
        console.log("newConfig", newConfig);
        mutation.mutate({ newConfig, marginPaddingId });
      }
    },
    [activeProperty, spacingConfig, mutation]
  );

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!spacingConfig) {
    return <div>Error loading spacing configuration</div>;
  }

  return (
    <div className="bg-slate-900 p-8 rounded-lg" style={fontStyle}>
      <div className="text-blue-400 text-sm mb-4">INDIVIDUAL</div>

      <div className="relative flex flex-col items-center gap-2">
        {/* Top margin */}
        <SpacingButton
          value={spacingConfig?.marginTopValue}
          onClick={(e) => handlePopoverOpen(e, "marginTop")}
        />

        <div className="flex items-center gap-2">
          {/* Left margin */}
          <SpacingButton
            value={spacingConfig?.marginLeftValue}
            onClick={(e) => handlePopoverOpen(e, "marginLeft")}
          />

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
              <SpacingButton
                value={spacingConfig?.paddingTopValue}
                onClick={(e) => handlePopoverOpen(e, "paddingTop")}
              />
            </div>

            {/* Left padding button */}
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: "1rem" }}
            >
              <SpacingButton
                value={spacingConfig?.paddingLeftValue}
                onClick={(e) => handlePopoverOpen(e, "paddingLeft")}
              />
            </div>

            {/* Right padding button */}
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ right: "1rem" }}
            >
              <SpacingButton
                value={spacingConfig?.paddingRightValue}
                isActive={true}
                onClick={(e) => handlePopoverOpen(e, "paddingRight")}
              />
            </div>

            {/* Bottom padding button */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ bottom: "1rem" }}
            >
              <SpacingButton
                value={spacingConfig?.paddingBottomValue}
                onClick={(e) => handlePopoverOpen(e, "paddingBottom")}
              />
            </div>
          </div>

          {/* Right margin */}
          <SpacingButton
            value={spacingConfig?.marginRightValue}
            onClick={(e) => handlePopoverOpen(e, "marginRight")}
          />
        </div>

        {/* Bottom margin */}
        <SpacingButton
          value={spacingConfig?.marginBottomValue}
          onClick={(e) => handlePopoverOpen(e, "marginBottom")}
        />

        {activeProperty && (
          <MarginPopover
            isOpen={isPopoverOpen}
            onClose={handlePopoverClose}
            anchorEl={anchorEl}
            property={activeProperty}
            value={spacingConfig[activeProperty]}
            onChange={handleValueChange}
          />
        )}
      </div>
    </div>
  );
}

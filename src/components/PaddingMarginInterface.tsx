import React, { useState, useCallback } from "react";
import { getSpacingConfig, SpacingConfig, updateSpacingConfig } from "../utils";
import MarginPopover from "./Popover";
import { useMarginPadding } from "../hooks/useMarginPadding";
import { useUpdateMarginPadding } from "../hooks/useUpdateMarginPadding";

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

interface PaddingMarginConfigProps {
  data: dataConfig; // Use the SpacingConfig interface for the data prop
}

const fontStyle = {
  fontFamily: '"Inter var", sans-serif',
};

export default function PaddingMarginConfig({
  data,
}: PaddingMarginConfigProps) {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [unit, setUnit] = useState(""); // State for selected unit
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeProperty, setActiveProperty] = useState<
    keyof SpacingConfig | null
  >(null);

  const marginPaddingId = data.marginPaddingId;
  const { data: spacingConfig, isLoading } = useMarginPadding(marginPaddingId);

  const mutation = useUpdateMarginPadding();
  const handlePopoverOpen = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement>,
      property: keyof SpacingConfig
    ) => {
      const baseProperty = property?.replace(/Value$/, "Unit"); // e.g., marginTopValue -> marginTop
      console.log(spacingConfig?.data);
      setUnit(spacingConfig?.data[baseProperty]);
      setAnchorEl(event.currentTarget);
      setActiveProperty(property);
      setIsPopoverOpen(true);
    },
    [spacingConfig]
  );

  const handlePopoverClose = useCallback(() => {
    if (activeProperty && spacingConfig && selectedValue) {
      const newConfig = {
        ...spacingConfig.data,
        [activeProperty]: selectedValue,
      };
      delete newConfig.id;
      delete newConfig.layoutSetting;
      mutation.mutate({ newConfig, marginPaddingId });
    }
    setIsPopoverOpen(false);
  }, [activeProperty, spacingConfig, selectedValue, mutation, marginPaddingId]);

  const handleValueChange = useCallback((value: any) => {
    setSelectedValue(value);
  }, []);

  const handleUnitChange = (newUnit: string) => {
    const baseProperty = activeProperty?.replace(/Value$/, "Unit"); // e.g., marginTopValue -> marginTop
    setUnit(newUnit);
    if (newUnit && baseProperty) {
      const newConfig = {
        ...spacingConfig.data,
        [baseProperty]: newUnit,
      };
      delete newConfig.id;
      delete newConfig.layoutSetting;
      mutation.mutate({ newConfig, marginPaddingId });
    }
  };

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
          value={spacingConfig?.data.marginTopValue}
          onClick={(e) => handlePopoverOpen(e, "marginTopValue")}
        />

        <div className="flex items-center gap-2">
          {/* Left margin */}
          <SpacingButton
            value={spacingConfig?.data?.marginLeftValue}
            onClick={(e) => handlePopoverOpen(e, "marginLeftValue")}
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
                value={spacingConfig?.data.paddingTopValue}
                onClick={(e) => handlePopoverOpen(e, "paddingTopValue")}
              />
            </div>

            {/* Left padding button */}
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: "1rem" }}
            >
              <SpacingButton
                value={spacingConfig?.data.paddingLeftValue}
                onClick={(e) => handlePopoverOpen(e, "paddingLeftValue")}
              />
            </div>

            {/* Right padding button */}
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ right: "1rem" }}
            >
              <SpacingButton
                value={spacingConfig?.data.paddingRightValue}
                isActive={true}
                onClick={(e) => handlePopoverOpen(e, "paddingRightValue")}
              />
            </div>

            {/* Bottom padding button */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ bottom: "1rem" }}
            >
              <SpacingButton
                value={spacingConfig?.data.paddingBottomValue}
                onClick={(e) => handlePopoverOpen(e, "paddingBottomValue")}
              />
            </div>
          </div>

          {/* Right margin */}
          <SpacingButton
            value={spacingConfig?.data.marginRightValue}
            onClick={(e) => handlePopoverOpen(e, "marginRightValue")}
          />
        </div>

        {/* Bottom margin */}
        <SpacingButton
          value={spacingConfig?.data.marginBottomValue}
          onClick={(e) => handlePopoverOpen(e, "marginBottomValue")}
        />

        {activeProperty && (
          <MarginPopover
            isOpen={isPopoverOpen}
            onClose={handlePopoverClose}
            anchorEl={anchorEl}
            property={activeProperty}
            value={spacingConfig.data[activeProperty]}
            onChange={handleValueChange}
            handleUnitChange={handleUnitChange}
            unit={unit}
          />
        )}
      </div>
    </div>
  );
}

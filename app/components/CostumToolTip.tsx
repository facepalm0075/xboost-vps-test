"use client";

import { Tooltip, Zoom } from "@mui/material";

type props = {
  children: any;
  title: string;
};

export function ToolTipLG({ children, title }: props) {
  return (
    <Tooltip
      title={title}
      TransitionComponent={Zoom}
      TransitionProps={{ timeout: 200 }}
      componentsProps={{
        tooltip: {
          sx: {
            fontSize: "17px",
            "& .MuiTooltip-arrow": {},
            bgcolor: "#252525",
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
}

export function ToolTipEO({ children, title }: props) {
  return (
    <Tooltip
      disableInteractive
      title={title}
      placement="top"
      arrow
      TransitionComponent={Zoom}
      TransitionProps={{ timeout: 200 }}
      componentsProps={{
        tooltip: {
          sx: {
            border: "1px solid #57f2fd",
            fontSize: "14px",
            fontWeight: "300",
            "& .MuiTooltip-arrow": { color: "#57f2fd" },
            bgcolor: "black",
            textAlign: "center",
            padding: "5px 10px",
          },
        },
      }}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -4],
              },
            },
          ],
        },
      }}
    >
      {children}
    </Tooltip>
  );
}

import { Box, Slider, SliderThumb } from "@mui/material";
import { BoostingPage } from "../svgs";

type props = {
  maxNum:number
  numberChanged:(num:number)=>void
  cNum:number
  name:string
};

function SelectWins({maxNum,numberChanged,cNum,name}:props) {
    
  let number = cNum
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      numberChanged(newValue)
      
    }
  };
  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: Math.ceil(maxNum/2),
      label: Math.ceil(maxNum/2).toString(),
    },
    {
      value: maxNum,
      label: maxNum.toString(),
    },
  ];
  return (    
      <Box sx={{ color: "white" }}>
        <Slider
          onChange={handleChange}
          aria-label="Always visible"
          min={1}
          step={1}
          value={number}
          max={maxNum}
          valueLabelDisplay="on"
          aria-labelledby="non-linear-slider"
          marks={marks}
          sx={{
            color: "#57f2fd",
            height: 8,
            "& .MuiSlider-track": {
              border: "none",
            },
            "& .MuiSlider-thumb": {
              height: 16,
              width: 16,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              backgroundColor: "#57f2fd",
              border: "4px solid white",
              "&::before": {
                boxShadow: "0 0px 12px 0 rgba(0,0,0,1)",
              },
              "&.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${"rgb(0 253 255 / 16%)"}`,
              },
              "&:hover": {
                boxShadow: `0px 0px 0px 8px ${"rgb(0 253 255 / 16%)"}`,
              },
              "&.Mui-active": {
                width: 27,
                height: 27,
              },
            },
            "& .MuiSlider-valueLabel": {
              lineHeight: 1.2,
              fontSize: 14,
              fontWeight: 900,
              background: "unset",
              padding: 0,
              width: 30,
              height: 30,
              color: "white",
              border: "2px solid #57f2fd",
              borderRadius: "50% 50% 50% 0",
              transformOrigin: "bottom left",
              transform: "translate(50%, -116%) rotate(-45deg) scale(0)",
              "&::before": { display: "none" },
              "&.MuiSlider-valueLabelOpen": {
                transform: "translate(50%, -116%) rotate(-45deg) scale(1)",
              },
              "& > *": {
                transform: "rotate(45deg)",
              },
            },
            "& .MuiSlider-mark": {
              color: "#999",
              height: 7,
              transform: "translateY(2px)",
            },
            "& .css-1bvr8oc-MuiSlider-markLabel": {
              color: "#999 !important",
            },
            "& .css-1ucwjgd-MuiSlider-markLabel": {
              color: "white !important",
            },
          }}
        />
      </Box>
  );
}

export default SelectWins;

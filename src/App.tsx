import "./styles.css";
import Quote from "./Quote";
import { useCallback, useMemo, useState } from "react";
import { purple, red, blue, green, orange, pink } from "@mui/material/colors";
import { SxProps, Theme, Box } from "@mui/material";

export default function App() {
  const [color, setColor] = useState("");
  const midColor = 800;
  const colors = useMemo(
    () => [
      purple[midColor],
      blue[midColor],
      green[midColor],
      red[midColor],
      orange[midColor],
      pink[midColor]
    ],
    []
  );

  const colorStyles: SxProps<Theme> = {
    backgroundColor: color,
    "&:hover": {
      backgroundColor: color
    }
  };

  const selectRandomColor = useCallback(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  }, [colors]);

  return (
    <Box
      className="App"
      sx={{
        backgroundColor: color,
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Quote colorStyles={colorStyles} selectRandomColor={selectRandomColor} />
    </Box>
  );
}

import {Button} from "@mui/material"
export default function ShareButton() {
  return (
    <Button variant="interact"
     sx={{
        minWidth: 0, // bỏ min-width mặc định 64px của MUI
        width: 50,
        height: 50,
        borderRadius: "50%", // 👈 làm tròn
        padding: 0, // bỏ padding thừa
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <svg
        width="25"
        height="25"
        viewBox="0 0 42 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.6264 24.9047L1.41602 15.8892C13.7515 8.76428 27.1884 3.84111 41.1476 1.33184C39.043 15.6362 34.5609 29.4688 27.8943 42.2335L18.6264 24.9047ZM18.6264 24.9047L29.5343 13.4874"
          stroke="#CDCCCD"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
}

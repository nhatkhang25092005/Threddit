export const OVERLAY_BASE_STYLE = {
  position: "fixed",
  zIndex: 2200,
  background: "rgba(20,20,20,0.98)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  padding: 6,
  minWidth: 220,
  maxHeight: 280,
  overflowY: "auto",
  boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
};

export const ROW_BASE_STYLE = {
  display: "flex",
  alignItems: "center",
  gap:2,
  padding: "8px 10px",
  borderRadius: 2,
  cursor: "pointer",
  color: "white",
};

export const AVATAR_BOX_STYLE = {
  width: 28,
  height: 28,
  borderRadius: "999px",
  background: "rgba(255,255,255,0.15)",
  overflow: "hidden",
  flex: "0 0 auto",
};

export const TEXT_WRAP_STYLE = { lineHeight: 1.2 };
export const DISPLAY_NAME_STYLE = { fontSize: 13, fontWeight: 600 };
export const USERNAME_STYLE = { fontSize: 12, opacity: 0.75 };

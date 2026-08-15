/* Brand mark in the Studio navbar. Keeps the editor feeling like Fluidly. */
export function StudioLogo() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontWeight: 700,
        fontSize: "0.95rem",
      }}
    >
      <span
        style={{
          display: "grid",
          placeItems: "center",
          width: 24,
          height: 24,
          borderRadius: 6,
          background: "linear-gradient(135deg,#17c4b1,#0c7d72)",
          color: "#04201e",
          fontFamily: "Georgia, serif",
          fontWeight: 700,
        }}
      >
        F
      </span>
      Fluidly Blog
    </span>
  );
}

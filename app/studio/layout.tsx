/* The Studio renders full-screen and manages its own theme. Hide the
   marketing grain overlay so it doesn't sit on top of the editor. */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`.grain{display:none!important}`}</style>
      {children}
    </>
  );
}

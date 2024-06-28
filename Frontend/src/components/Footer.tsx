import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <footer className="footer mt-auto py-3 bg-light text-center" style={{ position: "sticky", top: "100%" }}>
        <div className="container">
          <span className="text-muted"> Copyright &copy; www.eds.com | Ankit Pandey, AIT Pune-21135 </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-3">
      <div className="mx-auto text-center font-semibold">
        <p>Copyright &copy; {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="text-center py-3 font-semibold">
        <p>Copyright &copy; {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;

const Button = ({ children, onClick }) => {
  return (
    <button
      className="font-bold text-light hover:text-muted mr-4 md:hidden"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

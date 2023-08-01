const Button = ({
  title,
  onClick,
}: {
  title: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className="px-4 py-2 bg-purple-500 rounded-md text-white font-semibold"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;

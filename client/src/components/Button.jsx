/* eslint-disable react/prop-types */
const Button = ({
  children,
  variant = "vintage",
  size = "lg",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-300 focus:outline-none";

  const variants = {
    vintage:
      "bg-gradient-to-r from-[#FFB249] to-[#FF7F50] text-black hover:shadow-lg hover:shadow-[#FFB249]/30",
    outline:
      "border border-[#FFB249] text-[#FFB249] hover:bg-[#FFB249] hover:text-black",
    default: "bg-gray-800 text-white hover:bg-gray-700",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-lg", // adjusted for better spacing
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

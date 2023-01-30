import { motion } from "framer-motion";
import Image from "next/image";

const buttonVariants = {
  hover: {
    scale: 1.06,
  },
  tap: {
    scale: 0.99,
  },
};

export default function Button({
  type = "primary",
  size = "medium",
  label,
  href,
  className,
  loading,
  onClick,
  target,
  image = null,
}) {
  const sizeStyles = {
    small: { padding: "8px 16px 8px 16px", fontSize: "14px", height: "30px" },
    medium: {
      padding: "8px 32px 8px 32px",
      fontSize: "16px",
      height: "40px",
    },
    large: { padding: "8px 32px 8px 32px", fontSize: "18px", height: "40px" },
  };
  const colorClasses = {
    primary: {
      backgroundColor: "#fb8c00",
      color: "white",
    },
    secondary: {
      backgroundColor: "#4f9cf9",
      color: "white",
    },
    tertiary: {
      backgroundColor: "white",
      color: "#043873",
    },
    special: {
      backgroundColor: "#333333",
      color: "#ffffff",
    },
    danger: {
      backgroundColor: "#f44336",
      color: "#ffffff",
    },
    success: {
      backgroundColor: "#4caf50",
      color: "#ffffff",
    },
  };
  return (
    <div>
      <motion.a
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        style={{
          ...colorClasses[type],
          ...sizeStyles[size],
          borderRadius: "0.25rem ",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        href={href}
        className={className}
        onClick={onClick}
        target={target}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {label}

          {image ? (
            <Image
              src={image}
              alt="button arrow"
              style={{ marginLeft: "5px" }}
            />
          ) : null}
        </div>
      </motion.a>
    </div>
  );
}
import Link from "next/link";

const BackButton = () => {
  return (
    <Link href="/" className="back-to-home-btn inline-block mt-1 mb-1">
      🌱 Back to roots
    </Link>
  );
};

export default BackButton;

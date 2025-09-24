import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = () => {
  return (
    <Link href="/" className="back-to-home-btn" aria-label="Back to homepage">
      <FiArrowLeft aria-hidden="true" className="h-4 w-4" />
      <span>Back to roots</span>
    </Link>
  );
};

export default BackButton;

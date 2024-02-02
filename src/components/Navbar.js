import Link from "next/link";
import Image from "next/image";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center py-2 shadow-md">
      <div className="logo mx-5">
        <Link href={"/"}>
          <Image src="/logo.webp" alt="logo" width={40} height={40} />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 md:text-md">
          <Link href="/tshirt">
            <li>T-shirt</li>
          </Link>
          <Link href="/hoodie">
            <li>Hoodies</li>
          </Link>
          <Link href="/sticker">
            <li>Stickers</li>
          </Link>
          <Link href="/mug">
            <li>Mugs</li>
          </Link>
        </ul>
      </div>
      <div className="absolute right-0 md:top-4 top-12 mx-5">
        <button>
          <IoCartOutline className="text-xl md:text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;

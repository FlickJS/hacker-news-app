import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const Navigation = () => {
  const pathname = usePathname();
  const pathSegments = useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname]
  );

  return (
    <div className="flex items-center p-4 font-bold">
      <Link href="/" className="text-primary">
        Back to Home
      </Link>
      {pathSegments.map((segment, index) => (
        <span key={index} className="flex items-center">
          <span className="text-gray-500 mx-1">/</span>
          {segment.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())}
        </span>
      ))}
    </div>
  );
};

export default Navigation;

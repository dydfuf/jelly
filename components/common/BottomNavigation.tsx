import {
  CalendarIcon,
  HamburgerMenuIcon,
  HomeIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import ActiveLine from "components/client/ActiveLine";

export default function BottomNavigation() {
  return (
    <div className="flex justify-between h-60 w-full items-center border-t-1 bg-white">
      {BOTTOM_NAVIGATION_LISTS.map((bottomNavigation) => {
        const { href, icon } = bottomNavigation;
        return (
          <Link
            key={href}
            className="w-full h-full flex items-center justify-center relative mx-8"
            href={href}
          >
            <ActiveLine href={href} />
            {icon}
          </Link>
        );
      })}
    </div>
  );
}

const BOTTOM_NAVIGATION_LISTS = [
  {
    href: "/memory",
    icon: <HomeIcon width={30} height={30} />,
    label: "추억",
  },
  {
    href: "/schedule",
    icon: <CalendarIcon width={30} height={30} />,
    label: "일정",
  },
  { href: "/plan", icon: <RocketIcon width={30} height={30} />, label: "계획" },
  {
    href: "/settings",
    icon: <HamburgerMenuIcon width={30} height={30} />,
    label: "설정",
  },
];

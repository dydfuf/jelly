import {
  CardStackIcon,
  HamburgerMenuIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BottomNavigation() {
  const router = useRouter();

  return (
    <div className="flex justify-between h-75 w-full items-center border-t-1 bg-white pb-15">
      {BOTTOM_NAVIGATION_LISTS.map((bottomNavigation) => {
        const { href, icon, activeRegex } = bottomNavigation;
        return (
          <Link
            key={href}
            className="w-full h-full flex items-center justify-center relative mx-8"
            href={href}
          >
            {activeRegex.test(router.pathname) && (
              <div className="w-full h-4 rounded-full bg-black absolute top-0" />
            )}
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
    activeRegex: /^\/memory/,
  },
  {
    href: "/memories",
    icon: <CardStackIcon width={30} height={30} />,
    label: "추억들",
    activeRegex: /^\/memories/,
  },
  // {
  //   href: "/schedule",
  //   icon: <CalendarIcon width={30} height={30} />,
  //   label: "일정",
  //   activeRegex: /^\/schedule/,
  // },
  // {
  //   href: "/plan",
  //   icon: <RocketIcon width={30} height={30} />,
  //   label: "계획",
  //   activeRegex: /^\/plan/,
  // },
  {
    href: "/settings",
    icon: <HamburgerMenuIcon width={30} height={30} />,
    label: "설정",
    activeRegex: /^\/settings/,
  },
];

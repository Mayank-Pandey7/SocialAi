import { LayoutDashboard, Sparkles, TrendingUp, BarChart2, CalendarDays } from "lucide-react";

const navItems = [
  { to: "/dashboard",  icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { to: "/generator",  icon: <Sparkles size={18} />,        label: "Generator" },
  { to: "/trending",   icon: <TrendingUp size={18} />,      label: "Trending" },
  { to: "/analyzer",   icon: <BarChart2 size={18} />,       label: "Analyzer" },
  { to: "/scheduler",  icon: <CalendarDays size={18} />,    label: "Scheduler" },
];
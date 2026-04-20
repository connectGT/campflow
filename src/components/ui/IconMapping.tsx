"use client";

import React from "react";
import { 
  Waves, 
  Activity, 
  Trophy, 
  Target, 
  Zap, 
  Shield, 
  Brain, 
  Leaf, 
  Heart, 
  Clock, 
  Users, 
  Utensils, 
  Apple, 
  Flower2, 
  LineChart, 
  ClipboardList, 
  Shirt, 
  Bus, 
  PartyPopper,
  Rocket,
  AlertTriangle,
  Calendar,
  Sparkles,
  Medal,
  Wind,
  Microscope,
  Handshake,
  GraduationCap,
  Briefcase,
  Globe,
  LucideIcon
} from "lucide-react";

export type IconName = 
  | "waves" 
  | "activity" 
  | "trophy" 
  | "target" 
  | "zap" 
  | "shield" 
  | "brain" 
  | "leaf" 
  | "heart" 
  | "clock" 
  | "users" 
  | "utensils" 
  | "apple" 
  | "flower" 
  | "chart" 
  | "report" 
  | "shirt" 
  | "bus" 
  | "party"
  | "rocket"
  | "alert"
  | "calendar"
  | "sparkles"
  | "medal"
  | "wind"
  | "microscope"
  | "handshake"
  | "education"
  | "briefcase"
  | "globe";

const iconMap: Record<string, LucideIcon> = {
  waves: Waves,
  activity: Activity,
  trophy: Trophy,
  target: Target,
  zap: Zap,
  shield: Shield,
  brain: Brain,
  leaf: Leaf,
  heart: Heart,
  clock: Clock,
  users: Users,
  utensils: Utensils,
  apple: Apple,
  flower: Flower2,
  chart: LineChart,
  report: ClipboardList,
  shirt: Shirt,
  bus: Bus,
  party: PartyPopper,
  rocket: Rocket,
  alert: AlertTriangle,
  calendar: Calendar,
  sparkles: Sparkles,
  medal: Medal,
  wind: Wind,
  microscope: Microscope,
  handshake: Handshake,
  education: GraduationCap,
  briefcase: Briefcase,
  globe: Globe,
};

interface IconProps extends React.ComponentProps<LucideIcon> {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = iconMap[name.toLowerCase()] || Sparkles;
  return <LucideIcon {...props} />;
}

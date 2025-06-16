import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge"; // ✅ CORRECT PACKAGE

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

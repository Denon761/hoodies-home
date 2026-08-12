import * as Icons from "lucide-react";

export function getIcon(name, fallback = "Circle") {
  return Icons[name] || Icons[fallback] || Icons.Circle;
}

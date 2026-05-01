import { Shield, Star, Clock, Home, MapPin } from "lucide-react";

const trustItems = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Star, label: "5-Star Google Reviews" },
  { icon: Clock, label: "175+ Combined Years" },
  { icon: Home, label: "Residential & Commercial" },
  { icon: MapPin, label: "Victoria, BC" },
];

const TrustBar = () => (
  <div className="bg-card border-y border-border py-3">
    <div className="container mx-auto px-4 md:px-8 max-w-[1280px]">
      <ul className="flex flex-wrap items-center justify-between gap-3">
        {trustItems.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground">
            <Icon className="w-4 h-4 text-primary flex-shrink-0" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default TrustBar;

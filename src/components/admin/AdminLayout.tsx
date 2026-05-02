import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, Upload, Image } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const tabs = [
    { label: "Upload", icon: Upload, path: "/admin/upload" },
    { label: "Media Library", icon: Image, path: "/admin/media" },
  ];

  return (
    <div className="min-h-screen bg-card">
      <header className="sticky top-0 z-30 bg-background border-b border-border h-14 flex items-center px-6 gap-4">
        <img
          src="https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100027458/9cc16a08-504a-4d.png"
          alt="CBS Masonry"
          crossOrigin="anonymous"
          className="h-8 w-auto object-contain flex-shrink-0"
        />
        <div className="h-5 w-px bg-border" />

        {/* Nav tabs */}
        <nav className="flex items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="flex-1" />
        <span className="text-xs text-muted-foreground hidden sm:block">{user?.email}</span>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 border border-border rounded hover:bg-muted"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </header>

      {children}
    </div>
  );
};

export default AdminLayout;

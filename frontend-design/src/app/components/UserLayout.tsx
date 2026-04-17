import { Outlet } from "react-router";
import { Sparkles } from "lucide-react";

export function UserLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Sparkles className="size-6 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-lg">TVA AI Assistant</h1>
                <p className="text-xs text-muted-foreground">INVEST Criteria Validator</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Tennessee Valley Authority
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/50 mt-16">
        <div className="container mx-auto px-6 py-6 text-center text-sm text-muted-foreground">
          <p>Powered by AI • Ensuring quality work items for better project outcomes</p>
        </div>
      </footer>
    </div>
  );
}

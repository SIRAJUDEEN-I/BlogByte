import { BlogDashboard } from "@/components/dashboard/blog-dashboard";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  // ✅ Server-side authentication check
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogDashboard />
    </div>
  );
};

export default Dashboard;
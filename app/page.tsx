
import SideBarDashboard from "@/components/dashboard/sideBar";


export default function Home() {
  return (
    <div className="flex  min-h-screen items-center justify-center  font-sans bg-black">
      <h1> this is simple dashboards</h1>
      <div className="">
        <SideBarDashboard></SideBarDashboard>
      </div>
    </div>
  );
}

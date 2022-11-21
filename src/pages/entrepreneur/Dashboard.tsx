import { SideBar } from "../../components/Sidebar";

export const Dashboard: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-row">
      <SideBar/>
      <div className="p-8">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
}
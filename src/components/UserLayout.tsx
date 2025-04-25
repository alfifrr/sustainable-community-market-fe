import { User } from "@/lib/types";

interface UserLayoutProps {
  user: User;
}

const UserLayout = ({ user }: UserLayoutProps) => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-base-300 rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}`}
              alt={user.name || ""}
              className="rounded-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className={`${user.is_verified ? "text-info" : "text-warning"}`}>
              {user.is_verified ? "Verified" : "Not verified"}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-base-200 rounded">
              <p className="text-sm text-primary">Member since</p>
              <p className="font-medium">
                {new Date(user.date_joined).toLocaleDateString()}
              </p>
            </div>
            <div className="p-4 bg-base-200 rounded">
              <p className="text-sm text-primary">Last activity</p>
              <p className="font-medium">
                {user.last_activity
                  ? new Date(user.last_activity).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;

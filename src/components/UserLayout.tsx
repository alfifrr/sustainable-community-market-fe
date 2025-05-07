import { User2 } from "lucide-react";
import { User } from "@/lib/types";

interface UserLayoutProps {
  user: User;
}

const UserLayout = ({ user }: UserLayoutProps) => {
  return (
    <main
      className="container mx-auto px-4 py-6 md:py-8"
      aria-label="User Profile Section"
    >
      <div className="bg-base-300 rounded-lg shadow-lg p-4 md:p-6 transition-shadow hover:shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0">
          <div
            className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-base-200 rounded-full flex items-center justify-center"
            aria-hidden="true"
          >
            <User2 className="w-16 h-16 md:w-20 md:h-20 text-base-content/50" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">
              {user.name}
            </h1>
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                ${
                  user.is_verified
                    ? "bg-info/10 text-info"
                    : "bg-warning/10 text-warning"
                }`}
              role="status"
              aria-label={`User verification status: ${
                user.is_verified ? "Verified" : "Not verified"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full mr-2 
                ${user.is_verified ? "bg-info" : "bg-warning"}`}
              ></span>
              {user.is_verified ? "Verified" : "Not verified"}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="p-4 bg-base-200 rounded-lg hover:bg-base-200/80 transition-colors"
              role="group"
              aria-labelledby="member-since-label"
            >
              <p
                id="member-since-label"
                className="text-sm text-primary font-medium mb-1"
              >
                Member since
              </p>
              <p className="font-medium text-base-content">
                {new Date(user.date_joined).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div
              className="p-4 bg-base-200 rounded-lg hover:bg-base-200/80 transition-colors"
              role="group"
              aria-labelledby="last-activity-label"
            >
              <p
                id="last-activity-label"
                className="text-sm text-primary font-medium mb-1"
              >
                Last activity
              </p>
              <p className="font-medium text-base-content">
                {user.last_activity
                  ? new Date(user.last_activity).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "No recent activity"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserLayout;

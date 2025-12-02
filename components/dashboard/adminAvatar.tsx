import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const title:string = "Admin";

const AdminIcon = () => (
  <Avatar>
    <AvatarFallback>
      <User className="size-6" />
    </AvatarFallback>
  </Avatar>
);

export default AdminIcon;

import CustomAvatar from "@/components/user/profile/customAvatar";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <nav>
        <div className="title text-xl m-4 italic">QUICKADE</div>
        <div>{/* <CustomAvatar /> */}</div>
      </nav>
      {children}
    </div>
  );
}

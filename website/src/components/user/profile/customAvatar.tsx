import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default function CustomAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

import { SignOutButton, UserButton } from "@clerk/nextjs";

export default function SignOutPage() {
  return (
    <div>
      <SignOutButton />
      <UserButton />
    </div>
  );
}

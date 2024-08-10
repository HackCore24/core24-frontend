import { Login } from "@/screens/Login";

export default function LoginPage() {
  const botName = process.env.NEXT_PUBLIC_BOT_NAME;
  return <Login botName={botName!} />;
}

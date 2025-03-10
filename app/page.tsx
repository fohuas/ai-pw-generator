import { PasswordGenerator } from "../components/password-generator";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">AI密码生成器</h1>
        <PasswordGenerator />
      </div>
    </div>
  );
}

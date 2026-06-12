import { redirect } from "next/navigation";

export default function AdminRegisterPage() {
  
  const enabled = process.env.ENABLE_ADMIN_REGISTRATION === "true";
  if (!enabled) redirect("/pixels/login");

  return <RegisterForm />;
}

function RegisterForm() {
  return <RegisterClient />;
}


import RegisterClient from "./RegisterClient";

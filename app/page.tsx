import AuthForm from "@/components/AuthForm";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <section>
        <AuthForm/>
      </section>
    </main>
  );
}

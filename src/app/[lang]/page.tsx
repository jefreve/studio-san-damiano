import { getDictionary } from "@/lib/get-dictionary";

export default async function Home({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-5xl font-light mb-6 tracking-tight">
          {dictionary.home.welcome}
        </h1>
        <p className="text-xl text-brand-dark/80 max-w-2xl font-light">
          {dictionary.home.description}
        </p>
      </main>
    </div>
  );
}

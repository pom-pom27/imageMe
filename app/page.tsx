export const dynamic = "force-dynamic";

import PostGrid from "@/components/PostGrid";

export default function Home() {
  return (
    <main className="flex-1 mb-7">
      <PostGrid key="211" />
    </main>
  );
}

//TODO:
// add required on form
// add react form on mobile
// add loading and success indicator when upload form

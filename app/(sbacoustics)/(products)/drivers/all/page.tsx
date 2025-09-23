import { Suspense } from "react";import AllDriversPageClient from "./pageClient";
import PageLoader from "@/components/pageLoader";

export default function Page() {
  return (
    <Suspense fallback={<PageLoader/>}>
      <AllDriversPageClient />
    </Suspense>
  );
}
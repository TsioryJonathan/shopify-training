import { Suspense } from "react";
import SearchContent from "./SearchContent";
import { Loader2 } from "lucide-react";

// Loading component for suspense
function SearchLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-[136px] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Chargement de la recherche...</p>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  );
}



import { NewTabHome } from "~/components/new-tab-home";

export const dynamic = "force-static";
export const revalidate = false;

export default function HomePage() {
  return <NewTabHome />;
}

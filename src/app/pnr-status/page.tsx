import { redirect } from "next/navigation";

export default async function PnrStatusPage({
  searchParams,
}: {
  searchParams: Promise<{ pnr?: string; train?: string }>;
}) {
  const params = await searchParams;

  if (params?.pnr) {
    redirect(`/pnr/result?pnr=${encodeURIComponent(params.pnr)}`);
  }

  if (params?.train) {
    redirect(`/check-train?train=${encodeURIComponent(params.train)}`);
  }

  redirect("/pnr");
}

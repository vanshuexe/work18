import api from "../../../lib/api.cjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  return api.get(request, (await params).endpoint);
}

export async function POST(request, { params }) {
  return api.post(request, (await params).endpoint);
}

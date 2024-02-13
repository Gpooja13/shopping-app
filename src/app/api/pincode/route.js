import { NextResponse } from 'next/server';

export async function GET() {
  let pincodes={
    "209801":["Unnao","Uttar Pradesh"],
    "220014":["Lucknow","Uttar Pradesh"],
    "110003":["Delhi","Delhi"],
    "402201":["Navi Mumbai","Maharashtra"]
  }
  return NextResponse.json(pincodes);
}
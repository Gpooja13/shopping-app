import { NextResponse } from "next/server";

export async function GET() {
  let pincodes = {
    209801: ["Unnao", "Uttar Pradesh"],
    220014: ["Lucknow", "Uttar Pradesh"],
    110003: ["Delhi", "Delhi"],
    110001: ["New Delhi", "Delhi"],
    400001: ["Mumbai", "Maharashtra"],
    700001: ["Kolkata", "West Bengal"],
    600001: ["Chennai", "Tamil Nadu"],
    500001: ["Hyderabad", "Telangana"],
    560001: ["Bangalore", "Karnataka"],
    380001: ["Ahmedabad", "Gujarat"],
    302001: ["Jaipur", "Rajasthan"],
    800001: ["Patna", "Bihar"],
    600002: ["Saidapet", "Tamil Nadu"],
    110002: ["Barakhamba Road", "Delhi"],
    400002: ["Grant Road", "Maharashtra"],
    700002: ["North Kolkata", "West Bengal"],
    560002: ["Vasanth Nagar", "Karnataka"],
    380002: ["Navrangpura", "Gujarat"],
    302002: ["Bani Park", "Rajasthan"],
    800002: ["Kadam Kuan", "Bihar"],
    600003: ["George Town", "Tamil Nadu"],
    110003: ["Patel Nagar", "Delhi"],
    400003: ["Colaba", "Maharashtra"],
    700003: ["South Kolkata", "West Bengal"],
    560003: ["Mahatma Gandhi Road", "Karnataka"],
    380003: ["Ellisbridge", "Gujarat"],
    302003: ["Moti Dungri", "Rajasthan"],
    800003: ["Gandhi Maidan", "Bihar"],
    600004: ["Thousand Lights", "Tamil Nadu"],
    110004: ["Paharganj", "Delhi"],
    400004: ["Cumballa Hill", "Maharashtra"],
  };
  return NextResponse.json(pincodes);
}

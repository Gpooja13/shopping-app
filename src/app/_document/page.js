// import { Html, Head, Main, NextScript } from 'next/document'
 
// export default function Document() {
//   return (
//     <Html lang="en">
//       <Head className='overflow-x-hidden' />
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   )
// }

import Document, { Html, Head, Main, NextScript } from "next/document";
import RootLayout from "@/components/RootLayout";

class MyDocument extends Document {
  render() {
    return (
      <Html >
        <Head className="overflow-x-hidden"/>
        <body className="overflow-x-hidden">
          <RootLayout>
            <Main />
            <NextScript />
          </RootLayout>
        </body>
      </Html>
    );
  }
}

export default MyDocument;

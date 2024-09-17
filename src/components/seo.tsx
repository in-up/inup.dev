import { DefaultSeo } from "next-seo";

const config = {
  title: "inup.dev",
  description: "Developer Inup’s Static Blog",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://inupdev.vercel.app",
    site_name: "inup.dev",
    images: [
      {
        url: "https://samuelkraft.com/og.jpg",
        alt: "OG image",
      },
    ],
  },
};

export default function SEO() {
  return <DefaultSeo {...config} />;
}

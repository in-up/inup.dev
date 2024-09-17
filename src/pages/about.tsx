import Image from "next/image";
import { NextSeo } from "next-seo";

import Link from "components/Link";
import Section from "components/Section";
import avatar from "public/avatar.png";

export const connectLinks = [
  { label: "GitHub", href: "https://github.com/in-up" },
];

const seoTitle = "About | Inup";
const seoDesc = "Description";

export default function About({}: {}) {
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDesc}
        openGraph={{
          title: seoTitle,
          description: seoDesc,
          url: `https://inupdev.vercel.app/about/`,
          site_name: "inup.dev",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <div className="flex flex-col gap-16 md:gap-24">
        <div className="-mb-8 sm:hidden animate-in">
          <Image src={avatar} width={48} height={48} alt="avatar" />
        </div>
        <div
          className="flex flex-col gap-16 animate-in sm:animate-none md:gap-24"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <Section heading="About me" headingAlignment="right">
            <div className="flex flex-col gap-6">
              <p>&nbsp; 페이지를 준비하고 있습니다 🌓</p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </Section>
          <Section heading="Connect" headingAlignment="right">
            <ul className="flex gap-6 animated-list">
              {connectLinks.map((link) => (
                <li className="transition-opacity" key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </>
  );
}

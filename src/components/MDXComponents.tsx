import CustomImage from "components/blog/image";
import Video from "components/blog/video";
import Link from "components/Link";
import Warning from "components/warning";

interface CustomLinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const CustomLink: React.FC<CustomLinkProps> = (props) => {
  const href = props?.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link {...props} href={href} legacyBehavior>
        <a>{props.children}</a>
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const H1: React.FC = (props) => (
  <h1 className="text-3xl font-bold" {...props} />
);
const H2: React.FC = (props) => (
  <h3 className="text-2xl font-bold" {...props} />
);
const H3: React.FC = (props) => <h4 className="text-xl font-bold" {...props} />;

const MDXComponents = {
  Image: CustomImage,
  Video: Video,
  a: CustomLink,
  Link: CustomLink,
  Warning: Warning,
  h1: H1,
  h2: H2,
  h3: H3,
};

export default MDXComponents;

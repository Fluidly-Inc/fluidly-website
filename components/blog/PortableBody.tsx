import { PortableText, type PortableTextComponents } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import styles from "./blog.module.css";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
    blockquote: ({ children }) => <blockquote className={styles.quote}>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    code: ({ children }) => <code className={styles.inlineCode}>{children}</code>,
    link: ({ children, value }) => (
      <a href={value?.href} rel="noopener noreferrer" className={styles.link}>
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className={styles.figure}>
          <Image
            src={urlFor(value).width(1200).fit("max").auto("format").url()}
            alt={value.alt || ""}
            width={1200}
            height={800}
            className={styles.bodyImage}
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
    code: ({ value }) => (
      <pre className={styles.codeBlock}>
        <code>{value?.code}</code>
      </pre>
    ),
  },
};

export function PortableBody({ value }: { value: Parameters<typeof PortableText>[0]["value"] }) {
  return (
    <div className={styles.prose}>
      <PortableText value={value} components={components} />
    </div>
  );
}

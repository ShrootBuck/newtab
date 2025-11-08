import { shortcutIconUrls } from "./shortcuts";

export default function Head() {
  return (
    <>
      {shortcutIconUrls.map((iconUrl) => (
        <link
          key={iconUrl}
          rel="preload"
          as="image"
          href={`/${iconUrl}`}
          type="image/svg+xml"
          crossOrigin="anonymous"
        />
      ))}
    </>
  );
}

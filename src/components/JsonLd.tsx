/**
 * schema.org JSON-LD.
 *
 * SECURITY: JSON inside a <script> is not HTML-escaped by the browser, so a
 * "</script>" inside a string would break out of the block. We serialize
 * static data and escape "<", ">" and "&" plus U+2028/U+2029 to their JSON
 * \u escapes — the result is still valid JSON and can never close the tag.
 * The data object is a compile-time constant (src/data/site.ts).
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }} />;
}

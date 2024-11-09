/* Extensions can run scripts that read and modify the content of a page. These are called content scripts. 
    They live in an isolated world, meaning they can make changes to their JavaScript environment without 
    conflicting with their host page or other extensions' content scripts. */

/* looks for the article tag in a given site */
const article = document.querySelector("article");

/*`document.querySelector` may return null if the selector doesn't match anything. */
/* in JS null, 0 and undefined evaluate as false when inspected as booleans. */
if (article) {
  // match any series of characters that isn't a space  
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);

  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");

  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");

  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  //nullish or, returns heading if date is null/undefined
  (date ?? heading).insertAdjacentElement("afterend", badge);
}

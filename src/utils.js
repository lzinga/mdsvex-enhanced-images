export const possibleAttributes = [
  "fetchpriority",
  "loading",
  "decoding",
  "class",
];

export function splitObjectByKeys(obj, keys) {
  const [included, excluded] = Object.entries(obj).reduce(
    ([included, excluded], [key, value]) => {
      if (keys.includes(key)) {
        included[key] = value;
      } else {
        excluded[key] = value;
      }
      return [included, excluded];
    },
    [{}, {}]
  );
  return [included, excluded];
}

export function processAttributesAndConfig(nodeUrl, config = {}) {

  // Clone/deepcopy the config object to avoid side effects for other images
  // Due to the way we process the config, we need to make sure we don't modify the original object
  // => https://github.com/lzinga/mdsvex-enhanced-images/issues/9
  let configCopy = JSON.parse(JSON.stringify(config));

  // create a standard url (to cleanly parse the query string)
  const url = new URL(nodeUrl, "http://localhost"); // base url is irrelevant but needed by URL constructor

  /* Query string CSS class names handling */
  // get possible "class" entries from the query string
  const searchParams = new URLSearchParams(url.search);
  const classesInQuery = searchParams
    .getAll("class")
    .flatMap((e) => e.split(";")) // class names can be separated by ';' in the query string
    .map((c)=> c.trim()); 

  // merge classes from the query string with the ones from the config (if any)
  //  - normalize the possible classes from config
  //  - normalize the possible classes from the query
  //  - combine in a Set to remove duplicates
  //  - convert back to an array and generate the class attribute string
  const normalizedConfigClasses = configCopy?.attributes?.class
    ? configCopy.attributes.class
        .trim()
        .split(" ")
        .map((c) => c.trim())
    : [];
  const classesInQuerySet = new Set(classesInQuery);
  const classesInConfigSet = new Set(normalizedConfigClasses);
  const allClasses = Array.from(
    new Set([...classesInConfigSet, ...classesInQuerySet])
  );
  //finally, generate the class attribute string
  const combinedClassesAttrStr =
    allClasses.length > 0 ? `class="${allClasses.join(" ")}"` : "";

  // Classes processed: remove them from searchParams and config
  // here, we mutate the configCopy object, but as it's a copy, so no side effects (see above)
  searchParams.delete("class");
  if (configCopy.attributes) {
    delete configCopy.attributes.class;
  }

  /* Attributes and image processing directives handling */

  // get the rest of the query string as attributes
  const urlParamsAttributes = Object.fromEntries(searchParams);

  // split the attributes from urlParamsAttributes into attributes and image directives
  const [attributes, directives] = splitObjectByKeys(
    urlParamsAttributes,
    possibleAttributes
  );

  // Combine/merge config.attributes with attributes from URL, with URL parameters taking precedence
  const combinedAttributes = {
    ...(configCopy?.attributes ?? {}),
    ...attributes,
  };

  const combinedAttributesStr = Object.entries(combinedAttributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");

  // Combine/merge image directives from config with image directives from URL, with URL parameters taking precedence
  const combinedDirectives = {
    ...(configCopy?.imagetoolsDirectives ?? {}),
    ...directives,
  };

  // Finally, format the combined directives as URL parameters
  const combinedDirectivesStr = Object.entries(combinedDirectives)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
    
  const combinedDirectivesUrlParams = combinedDirectivesStr
    ? `&${combinedDirectivesStr}`
    : "";

  return {
    combinedClassesAttrStr,
    combinedAttributesStr,
    combinedDirectivesUrlParams,
  };
}

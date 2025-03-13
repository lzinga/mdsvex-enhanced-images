import { visit } from "unist-util-visit";
import { processAttributesAndConfig } from "./utils.js";

const RE_SCRIPT_START =
  /<script(?:\s+?[a-zA-z]+(=(?:["']){0,1}[a-zA-Z0-9]+(?:["']){0,1}){0,1})*\s*?>/;
const RE_SRC = /src\s*=\s*"(.+?)"/;

export default function enhancedImage(config = {}) {
  return function transformer(tree) {
    let scripts = "";
    visit(tree, "image", (node) => {
      if (node.url.startsWith(".")) {
        // Process the attributes and config
        const {
          combinedClassesAttrStr,
          combinedAttributesStr,
          combinedDirectivesUrlParams,
        } = processAttributesAndConfig(node.url, config);

        // Now, clean possible search params from the node.url
        // They've been processed and are now in the result of processAttributesAndConfig call
        node.url = node.url.split("?")[0];

        // Generate a unique identifier for the import
        const importName = `_img${Math.random().toString(36).substr(2, 9)}`;

        // Create the import statement
        const importStatement = `import ${importName} from '${decodeURIComponent(
          node.url
        )}?enhanced${combinedDirectivesUrlParams}';\n`;
        scripts += `${importStatement}`;

        // Create the image component
        const imageComponent = `<enhanced:img src={${importName}} alt="${
          node.alt ?? ""
        }" ${combinedClassesAttrStr} ${combinedAttributesStr}></enhanced:img>`;

        // Replace the node with the import and component
        node.type = "html";
        node.value = imageComponent;
      }
    });

    let is_script = false;
    visit(tree, "html", (node) => {
      if (RE_SCRIPT_START.test(node.value)) {
        is_script = true;
        node.value = node.value.replace(RE_SCRIPT_START, (script) => {
          return `${script}\n${scripts}`;
        });
      }
    });

    if (!is_script) {
      tree.children.push({
        type: "html",
        value: `<script>\n${scripts}</script>`,
      });
    }
  };
}

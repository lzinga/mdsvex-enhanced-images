> ## Project Unmaintained
>
> **This project is no longer under active development.**
>
> Please use [**CollierCZ/markdoc-svelte**](https://github.com/CollierCZ/markdoc-svelte) — a maintained and feature‑rich Svelte preprocessor for Markdoc.
>
> For similar configuration or migration details, see:  
> [Relative image paths · Issue #25 · CollierCZ/markdoc-svelte](https://github.com/CollierCZ/markdoc-svelte/issues/25)
>
> While I am not making direct changes myself anymore, **pull requests are welcome**, and I will continue to review and merge well‑formed contributions.




<h1 align="center">mdsvex-enhanced-images</h1>
<p align="center" style="text-decoration: none;">
	<a href="https://github.com/lzinga/mdsvex-enhanced-images/actions/workflows/main.yml"><img src="https://github.com/lzinga/mdsvex-enhanced-images/actions/workflows/main.yml/badge.svg" alt="main"></a>
	<a href="https://www.npmjs.com/package/@lzinga/mdsvex-enhanced-images"><img alt="NPM Version" src="https://img.shields.io/npm/v/%40lzinga%2Fmdsvex-enhanced-images"></a>
	<img alt="GitHub License" src="https://img.shields.io/github/license/lzinga/mdsvex-enhanced-images">
	<a href="https://github.com/lzinga/mdsvex-enhanced-images/commits/main/"><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/lzinga/mdsvex-enhanced-images"></a>
</p>

<p align="center">
	<strong>🚀 <a href="https://lzinga.github.io/mdsvex-enhanced-images/">Live Demo</a></strong>
</p>

This plugin allows you to:
- use relative urls to images from the markdown file while also using the `enhanced:img` library from `@sveltejs/enhanced-img`.
- add CSS class names and extra attributes (`loading`, `fetchpriority`, and `decoding`) to images directly in markdown (image by image) or through the plugin configuration (to all images).
- add imagetools directives to images in markdown (image by image) or through the plugin configuration (to all images).

Special thanks to https://github.com/mattjennings/mdsvex-relative-images, for the inspiration.

Feel free to open a PR or an issue if you have any suggestions or feature requests!

## 🎯 Live Demo

Experience the plugin in action with our [interactive demo](https://lzinga.github.io/mdsvex-enhanced-images/) hosted on GitHub Pages. The demo showcases:

- **Basic image processing** with automatic `enhanced:img` component generation
- **CSS class application** via URL parameters
- **HTML attribute injection** for performance optimization
- **Image processing directives** like rotation, tinting, and effects
- **Real-time examples** of all plugin features

The demo is automatically deployed from the `/demo` directory using SvelteKit's static adapter.

### 🛠️ Local Demo Development

To run the demo locally for testing and development:

```bash
# Install demo dependencies
npm run demo:install

# Run demo in development mode (with hot reloading)
npm run demo:dev

# Build and serve demo locally (mimics production)
npm run demo:serve

# Build demo only
npm run demo:build
```

These scripts will automatically build the plugin first, then set up the demo environment.

## Contributors

<!-- readme: collaborators,contributors -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/lzinga">
                    <img src="https://avatars.githubusercontent.com/u/9082450?v=4" width="100;" alt="lzinga"/>
                    <br />
                    <sub><b>Lucas</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/0gust1">
                    <img src="https://avatars.githubusercontent.com/u/578154?v=4" width="100;" alt="0gust1"/>
                    <br />
                    <sub><b>Augustin C.</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/jimmux">
                    <img src="https://avatars.githubusercontent.com/u/4867161?v=4" width="100;" alt="jimmux"/>
                    <br />
                    <sub><b>James Antony Francis Manley</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: collaborators,contributors -end -->


## Usage

### Installation

```bash
npm install --save-dev @lzinga/mdsvex-enhanced-images
```

(or the equivalent pnmp / yarn / bun commands)

### Configuration

Configure the package in your mdsvex config.

```ts
import enhancedImage from 'mdsvex-enhanced-images';

const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [
		mdsvex({
			extensions: ['.md'],
			remarkPlugins: [[
				enhancedImage,
				{
					// Optional: attributes to add to **all** `img` tags
					attributes: {
						fetchpriority: "auto", // browser's default
						loading: "eager", // browser's default
						decoding: "auto", // browser's default
						class: "test-decoration test-shadow" // add classes to all images
					},
					// Optional: imagetools directives to add to **all** `img` tags
					// see https://github.com/JonasKruckenberg/imagetools/blob/main/docs/directives.md#format
					imagetoolsDirectives:{
						tint: "rgba(10,33,127)",
						blur: 10,
					}
				}
			]]
		})
	],
	kit: {
		adapter: adapter()
	}
};

```

Now you can add images like

```markdown
### Image With Space Local Folder
![Image With Space Local Folder](./img%20with%20space.png)

### Image no space, local folder
![Image no space, local folder](./img.png)

### Image no space, lib folder
![Image no space, lib folder](../lib/images/img.png)
```

You can also individually add css classes and extra attribute to images:

```markdown
### Image with css classes:
![Image no space, lib folder](../lib/images/img.png?class=my-class1;my-class2)

### Image with more attributes (here, loading=lazy):
![Image no space, lib folder](../lib/images/img.png?loading=lazy)

### Image with imagetools directives

![Image no space, lib folder](../lib/images/img.png?rotate=90)
```

and in the page the images get replaced with the component like so.

```html
<enhanced:img src={importedImage} alt="Image With Space Local Folder"></enhanced:img>
```

and in the HTML it appears like
```html
<picture>
    <!--[-->
    <source srcset="/@imagetools/43b0240cd054a16b2f8a777b81bc4080b1acf480 64w, /@imagetools/158187b3c4aa0009b5a8dab06fd646564597d12f 128w" type="image/avif" />
    <source srcset="/@imagetools/7dfbb97480e17bfd34ea5b9bf456e0904ac39232 64w, /@imagetools/51b34cea801d67387212057d7d251b64e3bcf3b5 128w" type="image/webp" />
    <source srcset="/@imagetools/749bd9a6a3c3e0aebf61154883f9a65b72404e47 64w, /@imagetools/0de3b0f0f739a05f1b5c3bde640e029bd344ccf8 128w" type="image/png" />
    <!--]-->
    <img src="/@imagetools/0de3b0f0f739a05f1b5c3bde640e029bd344ccf8" alt="abc" width="128" height="128" />
</picture>
```


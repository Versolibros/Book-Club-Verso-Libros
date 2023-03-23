# Verso Libros Shopify Theme

[Getting started](#getting-started) |
[Store authentication](#store-authentication) |
[Local development](#local-development) |
[CSS & JS Assets](#css--js-assets) |
[Syncing theme code with the storefront](#syncing-theme-code-with-the-storefront) |
[Developer tools](#developer-tools)

A theme for the Shopify storefront for [Verso Libros](https://www.versolibros.com/). Forked from the main [Verso Shopify theme repo](https://github.com/castiron/verso-shopify-theme).

## Getting started

1. Clone the repo:
```bash
git clone git@github.com:castiron/verso-libros-shopify-theme.git
```
2. Install [Shopify CLI](https://shopify.dev/themes/tools/cli/install) through Ruby Gems or Homebrew.

## Store authentication

The first time you run one of Shopify CLI's `theme` commands (e.g. `shopify theme dev`), you will need to include a `--store` flag. The CLI will store this value for future commands. Should you wish to change stores, pass a different flag value the next time you run a `shopify theme` command.

### Available stores

| Store | Flag value |
| --- | --- |
| Production | verso-libros |

The first time you run a `shopify` command, you will also be required to log into your CIC Shopify Partners account. Credentials are in 1Pass. If the CLI shows any authentication errors, you may need the store owner (Zach) to create a staff account for you.

## Local development

See the [Shopify CLI documentation](https://shopify.dev/docs/themes/tools/cli) for information about local theme development.

## CSS & JS Assets

To simplify maintenance, this repo includes only bundled CSS & JS files (and no bundling tools). These have been compiled from the main [Verso Shopify theme repo](https://github.com/castiron/verso-shopify-theme). To make changes to these, do so in the main repo, build them, and copy the compiled files into this repo.

## Syncing theme code with the storefront

This repo is wired up to the published theme in the production store in order to track changes made in Shopify Admin. (See [Version control for Shopify themes](https://shopify.dev/themes/best-practices/version-control) for more information on the general rationale and approach.) Any changes pushed to `origin/main` will be deployed to the production store.

## Developer tools

### Shopify CLI

[Shopify CLI](https://github.com/Shopify/shopify-cli) provides a set of commands for theme development, including creating, publishing, deleting, and auditing themes, as well as launching a development server for local theme development.

### Theme Check

[Theme Check](https://shopify.dev/themes/tools/cli/theme-commands#check) will analyze the theme's code for errors and check that it follows Shopify’s best practices.

```bash
shopify theme check [ ROOT ] [ options ]
```

Use the `-a` or `--auto-correct` flag to automatically fix errors.

The configuration for this command is found in `./theme-check.yml`.

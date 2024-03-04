# EngageMint Frontend Template

This is a template for the frontend of EngageMint projects. It is based on Vite and is set up for any project already registered with EngageMint.

## Getting Started

- Clone this repository
- Run `yarn install`
- Create a .env.local file and add the following:
  ```
  VITE_TICKER='YOUR PROJECT TICKER'
  VITE_PAGE_HEADER="YOUR PAGE TITLE"
  VITE_PAGE_DESCRIPTION="YOUR PAGE DESCRIPTION"
  VITE_LOGO_URL="YOUR LOGO URL"
  ```

## Development
Run `yarn dev` to start the development server.

## Customization
- Change the icons in the `public` folder
- Change the colors in the `./project-theme.ts` file

## Deployment
Run `yarn build` to build the project. The output will be in the `dist` folder.

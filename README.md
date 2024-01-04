# Algotive Front-end Challenge

This is a simple React SPA built with Vite + Typescript. I chose Vite as a framework because of simple out-of-the-box setup and easy integration with Tailwinds.

The app consists of a Single Page App that fetches data (music videos) from the server and displays them in a nice interactive and responsive UI.

**NOTE:** A proxy server was created on vite.config.ts, this is to avoid issues with the back-end that only accepts request from the same origin.

## Structure

### Components:

1. **VideoCatalog** - Fetches data, and renders a paginated list of video cards.
2. **VideoCard** - The individual video card that's rendered for each item of the catalog.
3. **VideoViewer** - A popup that renders some info on the video as well as an embeded YouTube player for playing it.
4. **ModalError** - A popup to display errors when something goes wrong while consuming the API.
5. **Loader** - Displays briefly when resolving the request made to the server. It uses CircularProgress component from MUI library.
6. **Icons** - JSX for svg icons are from HeroIcons (Tailwind's icon library)

### Context:

A simple context that handles the **Loader and ModalError display logic**. While this might be overkill for this simple app, it is scalable for more complex applications that might handle multiple requests to the server from different sections of the App.

### Styling:

The app is built using Tailwinds utility classes.

## How to run

### Requirements

- Node v18.17.0 or later
- npm
- Docker

Download, install Docker and run on the terminal the following command:

`docker run -p 8000:8000 public.ecr.aws/z1m5q8w6/algotive-challenge/backend-repo:1.0.0`

Once the Django server is running, you can run the Vite App by installing dependencies. Type in a terminal window on the root directory of the app the following commnad:

`npm install`

Once the installation is done, run the project:

`npm run dev`

This will run the App on [http://localhost:5173](http://localhost:5173), which can now be visited in the browser.

**NOTE:** To test error handling, you can either change the API url, or stop running the Docker image to get a 500 error.

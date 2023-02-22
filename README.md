# 📕 About

Yet another weather app made with React, not much innovation to see here.
A few points if you're still somehow interested:
* Self-imposed constraint of zero js dependencies (other than React, of course ;)) for the funs
* Uses TailwindCSS to make CSS less painful.

# Running it locally

Both ViteJS and netlify CLI are needed to run locally, the former used as app bootstrap and the latter to make netlify functions (used for inverse geolocation functionalities) work correctly.
Once that's configured and the env variables are set, it should run with:

`npm install`

`netlify dev`

# 🗄️ Project Structure

Most of the code lives in the `src` folder and looks like this:

```sh
src
|
+-- components        # shared components used across the entire application
|
+-- features          # feature based modules
|
+-- pages            # pages
|
+-- utils             # shared utility functions & types
```

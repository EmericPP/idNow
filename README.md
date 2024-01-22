## Getting Started

First, run the development server:

```bash
yarn dev
```


## Time spent: 7 hours

## Technical choices

### Frontend Framework: Next.js
Next.js comes with many practical features for a single-page application, saving me a lot of time, especially for setting up routing and style management. It's worth noting that Create React App has recently been deprecated, and Next.js has become one of the main frameworks associated with React.

I used the latest version of the Next.js routing: App Router. As for the folder structure:

/components: A folder for each component with a CSS module file and a JSX file, possibly a test file or Storybook for further development.

/hooks: All React logic intended to be reusable.

/services: Code that communicates with external APIs.

/assets: For icons, images, etc.

### Face detector solution
I used face-api.js, making my choice based on GitHub and npm statistics. As a model, I added TinyFaceDetector because it's fast and lightweight, making it suitable for webcam image detection. I reduced the size for image processing to increase speed, as recommended for webcam-based facial recognition.

### Languages
Typescript helps me avoid many typing errors that could cause issues later on.

### Linters & Clean Code
Eslint and Prettier, which seem essential.

### Style and CSS
Given the simplicity of the user interface/design system in this case, I added styles via CSS modules.
this is a responsive web application

### Development
I made sure to separate the face-api.js part from the face detection hook to easily switch to another face detection/recognition API. The useFaceDetector hook was designed to be reused elsewhere in the app without depending on a specific video tag, providing flexibility in design for other future parts of the application.

## Future Improvements
Here are some points I would have liked to implement with more time:

### Unit Tests
Implement unit tests with Vitest or Jest.

### I18N
Handle internationalization to avoid hardcoded text in the code.

### Icon Management with SVGR

### Implement Real Authentication
Add facial recognition, store facial characteristics on the server side, retrieve a JWT token

### Restrict Detection
Allow authentication only if there is a single person in front of the screen.

## Work splitting in a real environment

1. **Initialize the project:** Install the framework and all the necessary tooling as described above.

2. **Set up a minimal version of faceapi:** Verify that there are no major constraints.

3. **Develop the functionality:** Based on the user story.

4. **Integrate the design:** Add CSS and incorporate the mockup.

5. **Tests:** Perform testing.

Another solution would be to break down the user story into smaller deliverables for faster release.

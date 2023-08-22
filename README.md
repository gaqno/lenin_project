
<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>Lenin Project
</h1>
<h3>◦ Code like a revolutionary. #lenin_project</h3>
<h3>◦ Developed with the software and tools listed below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/esbuild-FFCF00.svg?style&logo=esbuild&logoColor=black" alt="esbuild" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style&logo=PostCSS&logoColor=white" alt="PostCSS" />
<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style&logo=Autoprefixer&logoColor=white" alt="Autoprefixer" />
<img src="https://img.shields.io/badge/Chai-A30701.svg?style&logo=Chai&logoColor=white" alt="Chai" />
<img src="https://img.shields.io/badge/Vitest-6E9F18.svg?style&logo=Vitest&logoColor=white" alt="Vitest" />
<img src="https://img.shields.io/badge/Vite-646CFF.svg?style&logo=Vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/Swiper-6332F6.svg?style&logo=Swiper&logoColor=white" alt="Swiper" />
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style&logo=Axios&logoColor=white" alt="Axios" />
<img src="https://img.shields.io/badge/Vue.js-4FC08D.svg?style&logo=vuedotjs&logoColor=white" alt="Vue.js" />
<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style&logo=ESLint&logoColor=white" alt="ESLint" />

<img src="https://img.shields.io/badge/OpenAI-412991.svg?style&logo=OpenAI&logoColor=white" alt="OpenAI" />
<img src="https://img.shields.io/badge/SemVer-3F4551.svg?style&logo=SemVer&logoColor=white" alt="SemVer" />
<img src="https://img.shields.io/badge/SVGO-3E7FC1.svg?style&logo=SVGO&logoColor=white" alt="SVGO" />
<img src="https://img.shields.io/badge/Lodash-3492FF.svg?style&logo=Lodash&logoColor=white" alt="Lodash" />
<img src="https://img.shields.io/badge/Flat-3481FE.svg?style&logo=Flat&logoColor=white" alt="Flat" />
<img src="https://img.shields.io/badge/Koa-33333D.svg?style&logo=Koa&logoColor=white" alt="Koa" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Ajv-23C8D2.svg?style&logo=Ajv&logoColor=white" alt="Ajv" />
<img src="https://img.shields.io/badge/Buffer-231F20.svg?style&logo=Buffer&logoColor=white" alt="Buffer" />
<img src="https://img.shields.io/badge/Markdown-000000.svg?style&logo=Markdown&logoColor=white" alt="Markdown" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style&logo=JSON&logoColor=white" alt="JSON" />
</p>
<img src="https://img.shields.io/github/languages/top/gaqno/lenin_project?style&color=5D6D7E" alt="GitHub top language" />
<img src="https://img.shields.io/github/languages/code-size/gaqno/lenin_project?style&color=5D6D7E" alt="GitHub code size in bytes" />
<img src="https://img.shields.io/github/commit-activity/m/gaqno/lenin_project?style&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/license/gaqno/lenin_project?style&color=5D6D7E" alt="GitHub license" />
</div>

---

## 📒 Table of Contents
- [📒 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [⚙️ Features](#-features)
- [📂 Project Structure](#project-structure)
- [🧩 Modules](#modules)
- [🚀 Getting Started](#-getting-started)
- [🗺 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)

---


## 📍 Overview

The Lenin Project is a chatbot interface implemented with Vue.js and Nuxt.js, along with a state management system using Pinia. It utilizes the OpenAI API to provide chat-based language completion. The project's core purpose is to enable users to have interactive and dynamic conversations with the chatbot, leveraging the capabilities of the OpenAI language model. This project adds value by providing a user-friendly interface for seamless and intuitive interactions with the chatbot, enhancing the overall user experience.

---

## ⚙️ Features

| Feature                | Description                           |
| ---------------------- | ------------------------------------- |
| **⚙️ Architecture**     | The system follows a modular architecture designed for a Vue.js/Nuxt.js web application. It uses components, stores, and utility files to separate concerns and promote reusability. |
| **📖 Documentation**   | The codebase lacks comprehensive documentation, making it challenging for newcomers to understand and contribute to the project effectively. Improving the documentation would enhance the developer experience. |
| **🔗 Dependencies**    | The system relies on several external libraries and tools such as Nuxt.js, Vue.js, Tailwind CSS, Pinia, Vite, ESLint, and Jest. These libraries provide utilities for building, styling, state management, and testing the application. |
| **🧩 Modularity**      | The codebase demonstrates modularity through the organization of files into directories according to functionality. Components, stores, utility files, and configuration files are logically separated. However, there should be more separation between components involved in the chatbot implementation. |
| **✔️ Testing**          | The codebase includes a set of tests for the `useChatCompletion` function. Leveraging Jest for testing is a positive sign, but the test coverage is limited, and additional tests are needed to ensure the overall application quality. |
| **⚡️ Performance**      | As a static site generated by Nuxt.js, the system benefits from server-side rendering, enabling faster loading times. It also utilizes plugins like Vite for optimized builds. Monitoring and further optimization may be required depending on real-world usage. |
| **🔐 Security**        | The codebase does not have explicit security measures. Developers should consider implementing security measures such as authentication, authorization, and input validation to protect user data and prevent common web vulnerabilities. |
| **🔀 Version Control** | The system utilizes Git for version control to track code changes, facilitate collaboration, and maintain multiple branches for development, testing, and bug fixes. The use of version control is vital for team development and code management. |
| **🔌 Integrations**    | The system incorporates the OpenAI API and uses the `@vercel/analytics` package for integrating with Vercel analytics. Future integrations may be required depending on desired functionality. |
| **📶 Scalability**     | The codebase does not explicitly address scalability. However, using a Vue.js/Nuxt.js framework and implementing modularity allows incremental scalability by adding and optimizing components, stores, and performance tuning as the application grows. Additional concerns regarding database scaling should be addressed as the application evolves. |

---


## 📂 Project Structure


```bash
repo
├── app.vue
├── components
│   └── loading-component.vue
├── global.css
├── global.d.ts
├── i18n.config.ts
├── nuxt.config.ts
├── package.json
├── pages
│   └── index.vue
├── plugins
│   └── vercel.ts
├── public
│   ├── BuranUSSR.ttf
│   └── favicon.ico
├── README.md
├── server
│   └── tsconfig.json
├── service
│   └── openai.ts
├── store
│   ├── app.ts
│   └── client.ts
├── tailwind.config.js
├── test
│   └── openai.test.ts
├── tsconfig.json
├── types
│   ├── backend-conversation.ts
│   └── git.ts
├── vitest.config.js
└── yarn.lock

9 directories, 23 files
```

---

## 🧩 Modules

<details closed><summary>Root</summary>

| File                                                                                      | Summary                                                                                                                                                                                                                                                                                                                      |
| ---                                                                                       | ---                                                                                                                                                                                                                                                                                                                          |
| [nuxt.config.ts](https://github.com/gaqno/lenin_project/blob/main/nuxt.config.ts)         | This code snippet sets up configuration for a Nuxt.js project. It includes modules for Vue.js utilities, state management, linting, styling, internationalization, icons, and image delay. It also configures plugins, components, Pinia store options, i18n settings, Tailwind CSS path, and runtime environment variables. |
| [vitest.config.js](https://github.com/gaqno/lenin_project/blob/main/vitest.config.js)     | This code snippet configures the Vite build tool for a Vue project. It includes the Vue plugin, sets up testing with Jest in a JS DOM environment, and defines aliases for specific file paths.                                                                                                                              |
| [.eslintrc](https://github.com/gaqno/lenin_project/blob/main/.eslintrc)                   | The code snippet is a configuration file for ESLint, which is used to enforce coding style and best practices. It extends a TypeScript-specific config and includes rules for Vue.js projects. It also adds custom rules for indenting, HTML formatting, attribute style, and other code quality improvements.               |
| [tailwind.config.js](https://github.com/gaqno/lenin_project/blob/main/tailwind.config.js) | This code snippet exports a configuration object for a Tailwind CSS setup with just-in-time mode. It specifies which files to include for styling and defines various plugins for customized functionality. It also sets up daisyUI with disabled logs and extends the theme with custom animations and keyframes.           |
| [global.css](https://github.com/gaqno/lenin_project/blob/main/global.css)                 | This code snippet imports the "Poppins" font from Google Fonts. It also includes the base, component, and utility classes from Tailwind CSS, enabling advanced styling and layouts.                                                                                                                                          |
| [i18n.config.ts](https://github.com/gaqno/lenin_project/blob/main/i18n.config.ts)         | This code snippet exports a function that defines an internationalization (i18n) configuration. It sets the legacy mode to false, the locale to "pt" (Portuguese), and provides empty message objects for Portuguese, English, and Chinese translations.                                                                     |
| [.npmrc](https://github.com/gaqno/lenin_project/blob/main/.npmrc)                         | The code snippet configures two settings:-"shamefully-hoist=true" allows for hoisting dependencies even when it might lead to issues.-"strict-peer-dependencies=false" disables strict checking for peer dependencies.                                                                                                       |
| [app.vue](https://github.com/gaqno/lenin_project/blob/main/app.vue)                       | This code snippet consists of a template defining the structure of a web page, a script section where an application store and global CSS are imported and utilized, and a style section defining some CSS transitions and animations. The page also displays a loading component when the app is in a loading state.        |
| [global.d.ts](https://github.com/gaqno/lenin_project/blob/main/global.d.ts)               | The provided code snippet sets up and customizes the Pinia store for state management in Vue.js applications. It also provides customizations for mapping stores and imports necessary modules.                                                                                                                              |

</details>

<details closed><summary>Plugins</summary>

| File                                                                            | Summary                                                                                                                                                                                                                                                                                                             |
| ---                                                                             | ---                                                                                                                                                                                                                                                                                                                 |
| [vercel.ts](https://github.com/gaqno/lenin_project/blob/main/plugins/vercel.ts) | The code enables injection of analytics from the Vercel platform into a Vue.js/Nuxt.js project by using the `@vercel/analytics` package. The `defineNuxtPlugin` function helps set up the plugin, while the `context` object allows injecting the analytics. The `vercelPlugin` is exported for use in the project. |

</details>

<details closed><summary>Components</summary>

| File                                                                                                       | Summary                                                               |
| ---                                                                                                        | ---                                                                   |
| [loading-component.vue](https://github.com/gaqno/lenin_project/blob/main/components/loading-component.vue) | The code creates a modal component with a loading icon at the center. |

</details>

<details closed><summary>Service</summary>

| File                                                                            | Summary                                                                                                                                                                                                                                                                                                                                                                                     |
| ---                                                                             | ---                                                                                                                                                                                                                                                                                                                                                                                         |
| [openai.ts](https://github.com/gaqno/lenin_project/blob/main/service/openai.ts) | The provided code snippet defines the function `useChatCompletion` which takes a question as input. It uses the OpenAI API to interact with a language model called "gpt-3.5-turbo-0613". The function creates a chat completion request with the given question and a predefined context, and retrieves the model's response. The response is then returned as the output of the function. |

</details>

<details closed><summary>Test</summary>

| File                                                                                   | Summary                                                                                                                                                                                                                                                                           |
| ---                                                                                    | ---                                                                                                                                                                                                                                                                               |
| [openai.test.ts](https://github.com/gaqno/lenin_project/blob/main/test/openai.test.ts) | The code snippet defines a set of tests for the useChatCompletion function from the openai service.The tests check if the function returns a valid response from the OpenAI API, if the response is not empty, if it is a string, and if it is different from the input question. |

</details>

<details closed><summary>Types</summary>

| File                                                                                                      | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---                                                                                                       | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [backend-conversation.ts](https://github.com/gaqno/lenin_project/blob/main/types/backend-conversation.ts) | The code snippet defines two interface types, `ConversationMessage` and `Conversation`. `ConversationMessage` describes a message within a conversation, including its ID, author role, content type, message parts, and metadata.`Conversation` represents a conversation entity, containing an action, an array of messages, a parent message ID, a model, timezone offset, a flag for history and training disabled, and an unknown (or null) Arkose token. |
| [git.ts](https://github.com/gaqno/lenin_project/blob/main/types/git.ts)                                   | The code snippet defines an interface called User that specifies the properties of a user object, including login credentials, personal information, social media links, and various URLs. It also includes the user's follower and following counts, as well as timestamps for account creation and recent updates.                                                                                                                                           |

</details>

<details closed><summary>Store</summary>

| File                                                                          | Summary                                                                                                                                                                                                                                                                            |
| ---                                                                           | ---                                                                                                                                                                                                                                                                                |
| [client.ts](https://github.com/gaqno/lenin_project/blob/main/store/client.ts) | The code snippet defines a client store, which manages user data. It initializes an empty user object and provides actions to set and retrieve the user data. The store follows the defineStore syntax and uses the User type from a specific module for strong typing.            |
| [app.ts](https://github.com/gaqno/lenin_project/blob/main/store/app.ts)       | This code snippet defines a store called "app" with state properties such as darkMode, loading, language, sidemenu, modal, and toast. It also includes actions to toggle dark mode, sidemenu, and language, as well as functions to set loading state and modify modal properties. |

</details>

<details closed><summary>Pages</summary>

| File                                                                          | Summary                                                                                                                                                                                                                                                                                                                                                                                            |
| ---                                                                           | ---                                                                                                                                                                                                                                                                                                                                                                                                |
| [index.vue](https://github.com/gaqno/lenin_project/blob/main/pages/index.vue) | This code snippet represents the front-end implementation of a chatbot interface. It includes a sidebar menu, a chat history display, and an input field for the user to interact with the chatbot. The code handles user input, fetches data from an API, and updates the UI accordingly. Additionally, it includes functionalities for clearing the conversation history and displaying updates. |

</details>

---

## 🚀 Getting Started

### ✔️ Prerequisites

Before you begin, ensure that you have the following prerequisites installed:
> - `ℹ️ Requirement 1`
> - `ℹ️ Requirement 2`
> - `ℹ️ ...`

### 📦 Installation

1. Clone the lenin_project repository:
```sh
git clone https://github.com/gaqno/lenin_project
```

2. Change to the project directory:
```sh
cd lenin_project
```

3. Install the dependencies:
```sh
npm install
```

### 🎮 Using lenin_project

```sh
npm run build && node dist/main.js
```

### 🧪 Running Tests
```sh
npm test
```

---


## 🗺 Roadmap

> - [X] `ℹ️  Task 1: Implement X`
> - [ ] `ℹ️  Task 2: Refactor Y`
> - [ ] `ℹ️ ...`


---

## 🤝 Contributing

Contributions are always welcome! Please follow these steps:
1. Fork the project repository. This creates a copy of the project on your account that you can modify without affecting the original project.
2. Clone the forked repository to your local machine using a Git client like Git or GitHub Desktop.
3. Create a new branch with a descriptive name (e.g., `new-feature-branch` or `bugfix-issue-123`).
```sh
git checkout -b new-feature-branch
```
4. Make changes to the project's codebase.
5. Commit your changes to your local branch with a clear commit message that explains the changes you've made.
```sh
git commit -m 'Implemented new feature.'
```
6. Push your changes to your forked repository on GitHub using the following command
```sh
git push origin new-feature-branch
```
7. Create a new pull request to the original project repository. In the pull request, describe the changes you've made and why they're necessary.
The project maintainers will review your changes and provide feedback or merge them into the main branch.

---

## 📄 License

This project is licensed under the `ℹ️  INSERT-LICENSE-TYPE` License. See the [LICENSE](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository) file for additional info.

---

## 👏 Acknowledgments

> - `ℹ️  List any resources, contributors, inspiration, etc.`

---

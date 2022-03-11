# Table of Content

- [Table of Content](#table-of-content)
  - [1. Folder Structures](#1-folder-structures)
  - [2. Libraries & Frameworks](#2-libraries--frameworks)
  - [3. Installation & Set Up](#3-installation--set-up)
  - [4. License](#4-license)

## 1. Folder Structures

```bash
+---public
+---src
|   \---components
|   \---models
|   \---pages
    |   \---api
    |   \---employees
+---styles
\---utils
```

## 2. Libraries & Frameworks

| Name                                            | Description                                                            |
| ----------------------------------------------- | ---------------------------------------------------------------------- |
| [NextJS](https://nextjs.org/)                   | The React Framework for Production.                                    |
| [React Hook Form](https://react-hook-form.com/) | Performant, flexible and extensible forms with easy-to-use validation. |
| [Yup](https://github.com/jquense/yup)           | Yup is a schema builder for runtime value parsing and validation       |
| [Axios](https://axios-http.com/)                | is a promise-based HTTP Client for node.js and the browser             |

## 3. Installation & Set Up

1. Install project dependencies

```bash
  yarn install or npm install
```

2. Configure your URL database ini `next.config.js`

```env: {
  MONGO_URI="YOUR_MONGO_URI"
  }
```

3. Start the development server

```bash
  yarn dev or npm run dev
```

4. Build for production

```bash
  yarn build or npm run build
```

5. Run production mode

```bash
  yarn start or npm start
```

## 4. License

MIT © [Isnu Munandar]https://github.com/IsnuMdr)

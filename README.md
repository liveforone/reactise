## install

- `git clone https://github.com/liveforone/reactise.git pkgName`
- Remove `.git`
- Rename the Project. Change the folder name, name, version and description in package.json.
- `npm install`

## Maintenance

- `npx npm-check-updates -u -f "/react*/"`
- Except for devDependencies `npm i 패키지명@latest`
- If you want update pkg in devDependecies, Check [react package.json](https://github.com/facebook/react/blob/main/package.json) before you update.

## Caution

- I'm not sure why, but whenever I put `withdraw` in the `users` directory, I keep getting a file-not-found error. So, I created an `account` folder and am managing it separately.

## Dependencies used in the project

> Copy and Paste it!

- `npm install @heroicons/react`
- `npm i axios`
- `npm i react-hot-toast`

## Icon reference note

- You need to specify `w-x` and `h-x` values for the icons.
- Otherwise, the icon won't be visible.
- [Search icons](https://heroicons.com/)

## routing

- Routing is handled in the `routes.ts` file.
- From version 7 onward, the traditional `react-router-dom` is not used.
- If you want to refer to routing documentation, make sure to set the version to v7 in the React Router docs.
- If you replace `useNavigate()` with `window.location`, you lose all the benefits of an SPA. `useNavigate()` allows page transitions without a full page reload.

## When running in `npm dev` under strict mode, `useEffect` runs twice.

- In `npm dev`, React runs `useEffect` twice when in strict mode.
- As a result, features like `toast` or `alert` executed inside `useEffect` may appear twice on the screen.
- However, this is intended behavior and will not appear this way in production.

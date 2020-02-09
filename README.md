# React + Redux + Route + Server Side Rendering + Webpack
Пример использования React и Redux с рендерингом на стороне сервера.<br>
Репозитарий форкнут с [link to github](https://github.com/tylermcginnis/rrssr), пример с использованием локального состояния компонент.<br>
Часть кода заимствована с официального примера Redux [link to redux example](https://github.com/reduxjs/redux/tree/master/examples/async) ([link to redux.js.org](https://redux.js.org/advanced/example-reddit-api)).<br>
Все зависимости обновлены до последних версий (2020-02-xx).

# Getting started
```bash
# via npm
npm i
npm run-script start-dev (npm run-script start-prod)
```
# Основные моменты
Точка входа в серверную часть: 
```jsx
./src/server/index.js
```
Точка входа в клиентскую часть: 
```jsx
./src/browser/index.js
```
Webpack генерит два файла: 
```bash
'./src/public/bundle.js' и  './src/server.js'
```
Начально состояние передается в браузер через глобальную переменную:
```jsx
window.__INITIAL_DATA__
```
Начально состояние передается в серверную через:
```jsx
const context = { initStore }, которая приходит, при рендере на сервере (renderToString => компонент Grid) как: staticContext
```
В роутах (./src/shared/routes) нужно задать как инициализировать начальное стостояние:
```jsx
fetchInitialData
```

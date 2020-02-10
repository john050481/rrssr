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
## Точка входа в серверную часть: 
```js
./src/server/index.js
```
## Точка входа в клиентскую часть: 
```js
./src/browser/index.js
```
## Webpack генерит два файла: 
```bash
'./src/public/bundle.js' и  './src/server.js'
```
## Мы должны дважды инициализировать Store
при рендере на сервере (когда мы генерим приложение и отдаем его в браузер) и на клиенте (когда в браузер приходит уже отрендеренная страница и данные для инициализации стора), т.е.
### Начальное состояние стора передается в браузер через глобальную переменную:
```js
window.__INITIAL_DATA__
```
### Начальное состояние стора, при рендере на сервере, мы получаем через:
```js
const store = configureStore(initStoreData)
...
renderToString(
      <Provider store={store}>
      ...
```
## В роутах (./src/shared/routes) нужно задать как инициализировать начальное стостояние:
```js
fetchInitialData: (...) => {...}
```

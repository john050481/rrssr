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
`./src/public/bundle.js`
`./src/server.js`
## Мы должны дважды инициализировать Store:
При рендере на сервере (когда мы генерим приложение и отдаем его в браузер), и на клиенте (когда в браузер приходит уже отрендеренная страница и данные для инициализации стора), т.е.
### В переменной `initStoreData` содержится начальное состояние Стора:
>./src/server/index.js
```js
  promise.then((data) => {
    const initStoreData = {};
    if (activeRoute.path && activeRoute.path !== '/') {
      initStoreData.selectedLanguage = req.path.split('/').pop();
      initStoreData.reposByLanguage = {
        [initStoreData.selectedLanguage]: {
          items: data,
          isFetching: false,
          lastUpdated: new Date()
        }
      };
    }

```
### Начальное состояние стора, при рендере на сервере, мы получаем через:
>./src/server/index.js
```js
const store = configureStore(initStoreData)
...
renderToString(
      <Provider store={store}>
      ...
```
и передаем его в браузер:
```js
<script>window.__INITIAL_DATA__ = ${JSON.stringify(initStoreData)}</script>
```
### Начальное состояние стора получаем в браузере через глобальную переменную:
>./src/browser/index.js
```js
if (__isBrowser__) {
    initStoreData = window.__INITIAL_DATA__
    ...
```
## В роутах нужно задать как инициализировать начальное стостояние:
>./src/shared/routes.js
```js
fetchInitialData: (...) => {...}
```

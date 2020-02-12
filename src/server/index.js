import express from "express"
import cors from "cors"
import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter, matchPath } from "react-router-dom"
import { Provider } from 'react-redux'
import configureStore from '.././store/configureStore'
import App from '../shared/App'
import routes from '../shared/routes'

const app = express()

app.use(cors())
app.use(express.static("public"))

app.get("*", (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

//  if (!activeRoute.path) return next()

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data) => {
    const initStoreData = {};
    if (activeRoute.path && activeRoute.path !== '/') {
      initStoreData.selectedLanguage = req.path.split('/').pop();
      initStoreData.reposByLanguage = {
        [initStoreData.selectedLanguage]: {
          items: data,
          isFetching: false,
          lastUpdated: Date.now()
        }
      };
    }

    const context = { /*initStoreData*/ }

    const store = configureStore(initStoreData)

    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    )

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${JSON.stringify(initStoreData)}</script>
        </head>

        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `)
  }).catch(next)
})

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})

/*
  1) Just get shared App rendering to string on server then taking over on client.
  2) Pass data to <App /> on server. Show diff. Add data to window then pick it up on the client too.
  3) Instead of static data move to dynamic data (github gists)
  4) add in routing.
*/

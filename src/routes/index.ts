import routes from "./routes"

const routeConfig = (app) => {
    app.use('/v1', routes)
}

export default routeConfig;
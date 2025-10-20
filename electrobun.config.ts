export default {
    app: {
        name: "Writedown",
        identifier: "dev.latinovits.writedown",
        version: "0.0.1",
    },
    build: {
        bun: {
            entrypoint: "src/bun/index.ts",
        },
        views: {
            "main-ui": {
                entrypoint: "src/main-ui/index.ts",
            },
        },
        copy: {
            "src/main-ui/index.html": "views/main-ui/index.html",
        },
        mac: {
            bundleCEF: true,
        },
        linux: {
            bundleCEF: true,
        },
        win: {
            bundleCEF: true,
        },
    },
};
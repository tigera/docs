window.addEventListener('load', function() {
    const ui = SwaggerUIBundle({
        url: "/json/swagger.json",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
            SwaggerUIBundle.presets.apis,
            //   SwaggerUIStandalonePreset
        ],
        plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
        ],
        // layout: "StandaloneLayout"
    });
    window.swaggerUI = ui;
});

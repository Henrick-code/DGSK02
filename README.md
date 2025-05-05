# Docusaurus con login

este repo tiene la version 3.7 de docusaurus By facebook, con la modificacion en la qse han agregado los JS de login, register y perfil , que son funcionales con el back de Pocketbase , solo lo instalas con las configuracion default de pocketbase y listo.

si deseas puedes crear los html para que quede mas profesional  y dejas la logica en los js



# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

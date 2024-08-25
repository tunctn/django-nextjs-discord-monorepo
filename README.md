### Setup

To install packages of every workspace

```
yarn install
```

Setup virtual environment for python

```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Build

To build all apps and packages, run the following command:

```
yarn build
```

### Develop (Front-end)

To develop all typescript apps and packages, run the following command:

```
yarn dev
```

To add packages:

```
yarn <workspace> add <package-name>
```

To remove packages:

```
yarn <workspace> remove <package-name>
```

### Develop (Django Back-end)

To develop django app, run the following:

```
yarn server
```

To make migrations:

```
yarn migrate:make
```

To show migrations:

```
yarn migrate:show
```

To apply migrations:

```
yarn migrate
```

To flush database:

```
yarn db:flush
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

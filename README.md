### Setup

To install packages of every workspace

```
pnpm install
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
pnpm build
```

### Develop (Front-end)

To develop all typescript apps and packages, run the following command:

```
pnpm dev
```

To add packages:

```
pnpm install <package-name> --filter=<workspace>
```

To remove packages:

```
pnpm uninstall <package-name> --filter=<workspace>
```

### Develop (Django Back-end)

To develop django app, run the following:

```
pnpm server
```

To make migrations:

```
pnpm migrate:make
```

To show migrations:

```
pnpm migrate:show
```

To apply migrations:

```
pnpm migrate
```

To flush database:

```
pnpm db:flush
```

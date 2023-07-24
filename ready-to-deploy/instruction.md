# Frontend Local Deployment Instruction

Please follow the instruction to run the project locally. This instruction is for Ubuntu System.

- You can also view [the live demo]()

## Table of Contents

- [1. Environment](#1-environment)
- [2. Install `node`, `yarn` and `serve`](#install-all)
  - [2.1 Installing Node Using the Node Version Manager](#install-node)
  - [2.2 Check if `node` has been installed](#check-node)
  - [2.3 Install `yarn` via official Debian package repository](#install-yarn)
  - [2.4 Check if `yarn` has been installed](#check-yarn)
  - [2.5 Add `serve` by `yarn`](#add-serve)
  
- [3. Serve the Frontend](#serving)
  - [3.1 Extract the `.tar.gz` file](#extract)
  - [3.2 Serving the frontend](#serve-frontend)

## 1. Environment

We use `yarn` as package manager for the frontend. Please make sure you have `yarn` installed.

You can check that with following command:

- Check if `node` has been installed

  ```shell
  node -v
  ```

  Possible output (the version of installed `node`):

  ```shell
  v16.14.x
  ```

- Check if `yarn` has been installed

  ```shell
  yarn -v
  ```

  Possible output (the version of installed `yarn`):

  ```shell
  1.22.x
  ```

If the output doesn't match with the possible output above (e.g.`command not found: yarn`, mismatching version number or error occurs), please follow [this instruction](#1install-yarn) to install `node` and `yarn`.

Otherwise, you can [serve the frontend in localhost](#serving).

## <a name='install-all'>2. Install `yarn` and `serve`</a>
#### <a name='install-node'>2.1 Installing Node Using the Node Version Manager</a>

Download and run script via `curl`

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

Then source the `.bashrc` file.

```shell
source ~/.bashrc
```

Then install the `node v16.14.0`.

```shell
nvm install v16.14.0
```



#### <a name='check-node'>2.2 Check if `node` has been installed</a>

Check if `node` has been installed

```shell
node -v
```

Possible output (the version of installed `node`):

```shell
v16.14.x
```

#### <a name='install-yarn'>2.3 Install `yarn` via official Debian package repository</a>

In the terminal, execute

```shell
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

Then you can simply:

```shell
sudo apt update && sudo apt install yarn
```

You can also check out [other installation alternatives](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable).

#### <a name='check-yarn'>2.4 Check if `yarn` has been successfully installed</a>

In the terminal, execute

```shell
yarn -v
```

You'll see something like

```shell
v1.22.x
```

Which means `yarn` has been successfully installed.

#### <a name='add-serve'>2.5 Add `serve` by `yarn`</a>

```
yarn add serve
```

## <a name="serving">3. Serve the Frontend</a>

The frontend is served with `serve`.

#### <a name='extract'>3.1 Extract the `.tar.gz` file</a>

In the folder `ready-to-deploy` where `task_hero.tar.gz` is located (which is the current folder), execute:

```shell
tar -xzvf task_hero.tar.gz
```

There'll be a `task_hero` directory in the folder.

#### <a name='serve-frontend'>3.2 Serving the frontend</a>

- If you would like to use `yarn`:

  In the folder where `task_hero` directory is located, execute:

  ```shell
  serve -s task_hero
  ```



The app has been successfully started if you see something like:

```shell
   ┌────────────────────────────────────────────────────┐
   │                                                    │
   │   Serving!                                         │
   │                                                    │
   │   - Local:            http://localhost:3000        │
   │   - On Your Network:  http://192.168.137.60:3000   │
   │                                                    │
   │   Copied local address to clipboard!               │
   │                                                    │
   └────────────────────────────────────────────────────┘
```

Then you can go to http://localhost:3000 to view the application

Enjoy Ability Plus!

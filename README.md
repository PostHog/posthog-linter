# eslint-plugin-posthog

verifies capture calls match data definitions

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-posthog`:

```sh
npm install eslint-plugin-posthog --save-dev
```

## Usage

Add `posthog` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "posthog"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "posthog/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here



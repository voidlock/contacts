# Contacts - AngularJS Demo

## Quick Start

To quickly get up and running with a server. You must first install the latest
node v0.11. Then follow these steps

```shell
git clone https://github.com/voidlock/contacts.git
cd contacts
npm install
npm start
```

## Development

A development environment can be spun up using gulp. The steps to follow are
almost the same as in the Quick Start.

```shell
git clone https://github.com/voidlock/contacts.git
cd contacts
npm install
gulp
```

Gulp will spin up the server, and watchers to automaticaly call browserify on
changed source files. It will also spin up a livereload server.

## Testing

The test suite is built using Karma. Assuming you have a development
environment setup running the tests can be done using

```shell
npm test
```

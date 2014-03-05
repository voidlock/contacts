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

## Testing

The test suite is built using Karma. Assuming you have a followed the Quick Start
steps running the tests can be done using

```shell
npm test
```


## Development

A development server can be spun up using gulp. Once you've followed the steps from
the quick start just run gulp.

```shell
gulp
```

Gulp will spin up a server and watchers to automaticaly call browserify on
changed source files. It will also spin up a livereload server so that local
changes automatically refresh the browser.

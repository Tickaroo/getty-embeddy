# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [1.1.1]
- more tests

## [1.1.0]

### BREAKING CHANGES:
renamed 'loaderGifBase64' to 'loaderImgSrc'

### Changed
- build and testdbg npm tasks improved
- 'reason' variable in fail message and better default one
- add more valid http response codes

### Added
- tests! more coming

## [1.0.2]
fix a bug to show loaders for embed methods

## [1.0.1]
# getting ready for v 1.0. many changes and improvements.

### BREAKING CHANGES:
renamed 'parent' option to 'parentEl' for clarity
removed unused 'oembedEndpoint' option

### Added
- loader image control (src and css)
- onFail callback with default function
- custom delay
- better dev server for the demo page (fastest way to test the options)
- various console.warn() to help you debug easily
- smarter loader and failing logic
- various bugs fixed
- more! check the readme

## [0.1.0]
# renamed npm package and git repo to getty-embeddy !
### Added
- using "use strict"
- added some [JSDoc] (http://usejsdoc.org/) comments

### Changed
- rename HISTORY.md to CHANGELOG.md
- add .tern-project file for easier js editing [ternjs](http://ternjs.net/).
- cleanup some npm tasks
- using normal attr funcfions instead of dataset for better IE8 support

## [0.0.1] - 2016-09-14
- proof of concept

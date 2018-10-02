[![Build Status](https://travis-ci.org/apinf/apinf-fiware.svg?branch=master)](https://travis-ci.org/apinf/apinf-fiware)
[![Code Climate](https://codeclimate.com/github/apinf/apinf-fiware/badges/gpa.svg)](https://codeclimate.com/github/apinf/apinf-fiware)
[![Issue Count](https://codeclimate.com/github/apinf/apinf-fiware/badges/issue_count.svg)](https://codeclimate.com/github/apinf/apinf-fiware)

# apinf:fiware

An ES2015 Meteor OAuth handler package for FIWARE IdM.

This is a fully working OAuth handler, allowing you to use FIWARE IdM as your Meteor authentication method. If you want to use it "as is" you can just `meteor add apinf:fiware` to your application.

However, the package has been written to aid in understanding the mechanics of putting together an OAuth handler for any arbitrary provider. The trickier parts of the codebase are (hopefully) annotated well enough to comprehend what's going on in this bit of Meteor Magic, enabling you make a minimum number of changes for your chosen provider.

There's an [accompanying blog article](http://robfallows.github.io/2015/12/17/writing-an-oauth-2-handler.html) which should be read prior to forking and hacking!

See also the [complementary login package](https://github.com/apinf/apinf-accounts-fiware): `apinf:accounts-fiware`.

## Installation

Install `meteor add apinf:accounts-fiware` and this package will be automatically installed

## Changelog

 - **v0.2.1** Bugfix release. Fixes bugs discovered in 0.2.0
 - **v0.2.0** Support Keyrock v7. This is backwards incompatible change with earlier keyrock versions.
 - **v0.1.3** Version management fix
 - **v0.1.2** Minor bugfix to Meteor login
 - **v0.1.1** Documentation update
 - **v0.1.0** Initial Release

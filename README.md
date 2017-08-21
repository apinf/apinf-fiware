[![Code Climate](https://codeclimate.com/github/apinf/apinf-fiware/badges/gpa.svg)](https://codeclimate.com/github/apinf/apinf-fiware)
[![Issue Count](https://codeclimate.com/github/apinf/apinf-fiware/badges/issue_count.svg)](https://codeclimate.com/github/apinf/apinf-fiware)

# apinf:fiware

An ES2015 Meteor OAuth handler package for FIWARE IdM.

This is a fully working OAuth handler, allowing you to use FIWARE IdM as your Meteor authentication method. If you want to use it "as is" you can just `meteor add apinf:fiware` to your application.

However, the package has been written to aid in understanding the mechanics of putting together an OAuth handler for any arbitrary provider. The trickier parts of the codebase are (hopefully) annotated well enough to comprehend what's going on in this bit of Meteor Magic, enabling you make a minimum number of changes for your chosen provider.

There's an [accompanying blog article](http://robfallows.github.io/2015/12/17/writing-an-oauth-2-handler.html) which should be read prior to forking and hacking!

See also the [complementary login package](https://github.com/apinf/apinf-accounts-fiware): `apinf:accounts-fiware`.

### Installing package without atmosphere:

To install the package without download for atmosphere, you need to download this package and the `apinf:accounts-fiware` [in this link](https://github.com/apinf/apinf-accounts-fiware). Its important put the packages in the same folder.
After the download of the packages, its necessary set the meteor package directory variable in your environment

- Linux:
  
  To set the variable in linux open your bash file and write the following code in the end of your file:

  **export METEOR_PACKAGE_DIRS = "/path/to/packages"**
  
  You can also open the terminal and write the following command, but, every time that you open the terminal, you will need     run this command again:
  
  **METEOR_PACKAGE_DIRS="/path/to/packages"**
  
- Windows:
  
  To set the variable in windows go to the environment variable window, in the system variable session, add a new variable     called **METEOR_PACKAGE_DIRS** and set the directory where you downloaded the packages.
 

Enjoy :smile:

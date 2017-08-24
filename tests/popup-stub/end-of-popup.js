var renderEndOfLoginResponse = function (options) {
  // It would be nice to use Blaze here, but it's a little tricky
  // because our mustaches would be inside a <script> tag, and Blaze
  // would treat the <script> tag contents as text (e.g. encode '&' as
  // '&amp;'). So we just do a simple replace.

  options.loginStyle = 'popup'

  var escape = function (s) {
    if (s) {
      return s.replace(/&/g, "&amp;").
        replace(/</g, "&lt;").
        replace(/>/g, "&gt;").
        replace(/\"/g, "&quot;").
        replace(/\'/g, "&#x27;").
        replace(/\//g, "&#x2F;");
    } else {
      return s;
    }
  };

  // Escape everything just to be safe (we've already checked that some
  // of this data -- the token and secret -- are safe).
  var config = {
    setCredentialToken: !! options.setCredentialToken,
    credentialToken: escape(options.credentialToken),
    credentialSecret: escape(options.credentialSecret),
    storagePrefix: escape('Meteor.oauth.credentialSecret-'),
    redirectUrl: escape(options.redirectUrl),
    isCordova: false
  };

  var template;
  if (options.loginStyle === 'popup') {
    template = OAuth._endOfPopupResponseTemplate;
  } else if (options.loginStyle === 'redirect') {
    template = OAuth._endOfRedirectResponseTemplate;
  } else {
    throw new Error('invalid loginStyle: ' + options.loginStyle);
  }

  var result = template.replace(/##CONFIG##/, JSON.stringify(config))
    .replace(
      /##ROOT_URL_PATH_PREFIX##/, __meteor_runtime_config__.ROOT_URL_PATH_PREFIX
    );

  return "<!DOCTYPE html>\n" + result;
};

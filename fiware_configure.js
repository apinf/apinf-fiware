Template.configureLoginServiceDialogForFiware.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForFiware.fields = function () {
  return [
    {property: "rootURL", label: "FIWARE IdM URL"},
    {property: 'clientId', label: 'Client Id'},
    {property: 'secret', label: 'Client Secret'}
  ];
};

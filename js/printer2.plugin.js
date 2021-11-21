(function() {

  OCA.Printer2 = OCA.Printer2 || {};

  /**
   * @namespace
   */
  OCA.Printer2.Util = {

    /**
     * Initialize the Printer2 plugin.
     *
     * @param {OCA.Files.FileList} fileList file list to be extended
     */
    attach: function(fileList) {

      if (fileList.id === 'trashbin' || fileList.id === 'files.public') {
        return;
      }

      fileList.registerTabView(new OCA.Printer2.Printer2TabView('printer2TabView', {}));

    }
  };
})();

OC.Plugins.register('OCA.Files.FileList', OCA.Printer2.Util);

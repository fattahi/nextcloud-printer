(function() {

  var Printer2TabView = OCA.Files.DetailTabView.extend({

    id: 'printer2TabView',
    className: 'tab printer2TabView',

    /**
     * get label of tab
     */
    getLabel: function() {

      return t('printer2', 'Printer2');

    },

    /**
     * get icon of tab
     */
    getIcon: function() {

      return 'icon-info';

    },

    /**
     * Renders this details view
     *
     * @abstract
     */
    render: function() {
      this._renderSelectList(this.$el);

      this.delegateEvents({
        'change #choose-orientation': '_onChangeEvent'
      });

    },

    _renderSelectList: function($el) {
      $el.html('<div class="get-print">'
        + '<select id="choose-orientation">'
          + '<option value="">' + t('printer2', 'Choose link type') + '</option>'
          + '<option value="normal">Normal link</option>'
          + '<option value="onac">For ONAC</option>'
        + '</select></div>'
      );
    },

    /**
     * show tab only on files
     */
    canDisplay: function(fileInfo) {

      if(fileInfo != null) {
        if(!fileInfo.isDirectory()) {
          return true;
        }
      }
      return false;

    },

    /**
     * ajax callback for printing file
     */
    check: function(fileInfo, orientation) {
      // skip call if fileInfo is null
      if(null == fileInfo) {
        _self.updateDisplay({
          response: 'error',
          msg: t('printer2', 'No fileinfo provided.')
        });

        return;
      }

      var url = OC.generateUrl('/apps/printer2/printfile'),
          data = {sourcefile: fileInfo.getFullPath(), orientation: orientation},
          _self = this;
      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        data: data,
        async: true,
        success: function(data) {
          _self.updateDisplay(data, orientation);
        }
      });

    },

    /**
     * display message from ajax callback
     */
    updateDisplay: function(data, orientation) {

      var msg = '';
      if('success' == data.response) {
        msg = orientation + ': ' + data.msg;
      }
      if('error' == data.response) {
        msg = data.msg;
      }

      msg += '<br><br><a id="reload-print" class="icon icon-history" style="display:block" href=""></a>';

      this.delegateEvents({
        'click #reload-print': '_onReloadEvent'
      });

      this.$el.find('.get-print').html(msg);

    },

    /**
     * changeHandler
     */
    _onChangeEvent: function(ev) {
      var orientation = $(ev.currentTarget).val();
      if(orientation != '') {
        this.$el.html('<div style="text-align:center; word-wrap:break-word;" class="get-print"><p><img src="'
          + OC.imagePath('core','loading.gif')
          + '"><br><br></p><p>'
          + t('printer2', 'Printing document ...')
          + '</p></div>');
        this.check(this.getFileInfo(), orientation);
      }
    },

    _onReloadEvent: function(ev) {
      ev.preventDefault();
      this._renderSelectList(this.$el);
      this.delegateEvents({
        'change #choose-orientation': '_onChangeEvent'
      });
    }

  });

  OCA.Printer2 = OCA.Printer2 || {};

  OCA.Printer2.Printer2TabView = Printer2TabView;

})();

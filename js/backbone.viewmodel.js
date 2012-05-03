(function() {
  var ViewModel;

  ViewModel = (function() {

    ViewModel.name = 'ViewModel';

    ViewModel.prepare = function(record_or_collection) {
      var record, ret, _i, _len;
      if (record_or_collection.constructor.toString().indexOf("Array") === -1) {
        return new this(record_or_collection);
      } else {
        ret = [];
        for (_i = 0, _len = record_or_collection.length; _i < _len; _i++) {
          record = record_or_collection[_i];
          ret.push(new this(record));
        }
        return ret;
      }
    };

    function ViewModel(model) {
      var key, to_delegate, value, _i, _len, _ref, _ref1;
      this.model = model;
      if (!this.model) {
        throw "@model required";
      }
      _ref = _.clone(this.model.attributes);
      for (key in _ref) {
        value = _ref[key];
        this[key] = value;
      }
      if (this.delegate_functions != null) {
        this.delegate_functions = this.delegate_functions.split(' ');
        _ref1 = this.delegate_functions;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          to_delegate = _ref1[_i];
          this[to_delegate] = this._createDelegatedFunction(to_delegate);
        }
      }
    }

    ViewModel.prototype._createDelegatedFunction = function(delegated) {
      return function() {
        return this.model[delegated].apply(this.model, arguments);
      };
    };

    return ViewModel;

  })();

  Backbone.ViewModel = ViewModel;

}).call(this);

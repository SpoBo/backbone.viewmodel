class ViewModel

  @prepare: (record_or_collection) ->
    if record_or_collection.constructor.toString().indexOf("Array") == -1
      # It's not an array. So just make a single one.
      new @(record_or_collection)
    else
      # Build up a new array.
      ret = []
      for record in record_or_collection
        ret.push new @(record)
      ret

  constructor: (@model) ->
    throw "@model required" unless @model
    # Build the properties from the attributes.
    for key, value of _.clone(@model.attributes)
      @[key] = value

    # Set up delegation of functions
    if @delegate_functions?
      @delegate_functions = @delegate_functions.split(' ')
      for to_delegate in @delegate_functions
        @[to_delegate] = @_createDelegatedFunction(to_delegate)

  _createDelegatedFunction: (delegated) ->
    -> @model[delegated].apply @model, arguments

Backbone.ViewModel = ViewModel

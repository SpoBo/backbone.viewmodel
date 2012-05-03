ViewModel = Backbone.ViewModel

class Agent extends Backbone.Model

  showLicenseTo: (inspector) ->
    "showing license #{@.get('license')} to #{inspector}"

  sayGoodMorningTo: (time_of_day, person) ->
    "Good #{time_of_day} #{person}"

  cocktailPreference: ->
    'Martini, shaken, not stirred'

class AgentViewModel extends ViewModel

  delegate_functions: 'showLicenseTo sayGoodMorningTo'


describe 'ViewModel', ->

  it 'is defined', ->
    expect(ViewModel).toBeDefined()


  beforeEach () ->
    @james = new Agent(name: 'James', lastname: 'Bond', license: 'to kill')

  describe 'When wrapping a backbone model with the default ViewModel', ->

    beforeEach () ->
      @subject = new ViewModel(@james)

    it 'should have created mehods for the attributes', ->

      expect(@subject.name).toEqual('James')
      expect(@subject.lastname).toEqual('Bond')
      expect(@subject.license).toEqual('to kill')

    it 'should not have access to the functions', ->

      expect(@subject.showLicenseTo).not.toBeDefined()


  describe 'When wrapping a backbone model with a new ViewModel', ->

    beforeEach () ->
      @subject = new AgentViewModel(@james)

    it 'should have created mehods for the attributes', ->

      expect(@subject.name).toEqual('James')
      expect(@subject.lastname).toEqual('Bond')
      expect(@subject.license).toEqual('to kill')

    it 'should have access to the delegated functions', ->

      expect(@subject.showLicenseTo).toBeDefined()
      expect(@subject.sayGoodMorningTo).toBeDefined()

    it 'should not have access to the functions that are not delegated', ->

      expect(@subject.cocktailPreference).not.toBeDefined()

    it 'should be able to call the functions', ->

      expect(@subject.showLicenseTo('bad guy')).toEqual('showing license to kill to bad guy')
      expect(@subject.sayGoodMorningTo('afternoon', 'Miss Moneypenny')).toEqual('Good afternoon Miss Moneypenny')

  describe 'When preparing a single backbone model with the default ViewModel', ->

    beforeEach () ->
      @subject = ViewModel.prepare(@james)

    it 'should return an instance of ViewModel', ->
      expect(@subject.name).toBeDefined()

  describe 'When preparing a collection of backbone models with the default ViewModel', ->

    beforeEach () ->
      @evil_spy = new Agent(name: 'Dr.', lastname: 'Evil', license: 'to act like a baby')
      @agents = []
      @agents.push @evil_spy
      @agents.push @james
      @subject = ViewModel.prepare(@agents)

    it 'should return an array', ->
      expect(@subject.length).toEqual(2)

    it 'should contain the viewmodels', ->
      expect(@subject[0].name).toBeDefined()

  describe 'When preparing a single backbone model with a custom ViewModel', ->

    beforeEach () ->
      @subject = AgentViewModel.prepare(@james)

    it 'should return an instance of AgentViewModel', ->
      expect(@subject.license).toEqual('to kill')
      expect(@subject.showLicenseTo('bad guy')).toEqual('showing license to kill to bad guy')

(function() {
  var Agent, AgentViewModel, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  ViewModel = Backbone.ViewModel;

  Agent = (function(_super) {

    __extends(Agent, _super);

    Agent.name = 'Agent';

    function Agent() {
      return Agent.__super__.constructor.apply(this, arguments);
    }

    Agent.prototype.showLicenseTo = function(inspector) {
      return "showing license " + (this.get('license')) + " to " + inspector;
    };

    Agent.prototype.sayGoodMorningTo = function(time_of_day, person) {
      return "Good " + time_of_day + " " + person;
    };

    Agent.prototype.cocktailPreference = function() {
      return 'Martini, shaken, not stirred';
    };

    return Agent;

  })(Backbone.Model);

  AgentViewModel = (function(_super) {

    __extends(AgentViewModel, _super);

    AgentViewModel.name = 'AgentViewModel';

    function AgentViewModel() {
      return AgentViewModel.__super__.constructor.apply(this, arguments);
    }

    AgentViewModel.prototype.delegate_functions = 'showLicenseTo sayGoodMorningTo';

    return AgentViewModel;

  })(ViewModel);

  describe('ViewModel', function() {
    it('is defined', function() {
      return expect(ViewModel).toBeDefined();
    });
    beforeEach(function() {
      return this.james = new Agent({
        name: 'James',
        lastname: 'Bond',
        license: 'to kill'
      });
    });
    describe('When wrapping a backbone model with the default ViewModel', function() {
      beforeEach(function() {
        return this.subject = new ViewModel(this.james);
      });
      it('should have created mehods for the attributes', function() {
        expect(this.subject.name).toEqual('James');
        expect(this.subject.lastname).toEqual('Bond');
        return expect(this.subject.license).toEqual('to kill');
      });
      return it('should not have access to the functions', function() {
        return expect(this.subject.showLicenseTo).not.toBeDefined();
      });
    });
    describe('When wrapping a backbone model with a new ViewModel', function() {
      beforeEach(function() {
        return this.subject = new AgentViewModel(this.james);
      });
      it('should have created mehods for the attributes', function() {
        expect(this.subject.name).toEqual('James');
        expect(this.subject.lastname).toEqual('Bond');
        return expect(this.subject.license).toEqual('to kill');
      });
      it('should have access to the delegated functions', function() {
        expect(this.subject.showLicenseTo).toBeDefined();
        return expect(this.subject.sayGoodMorningTo).toBeDefined();
      });
      it('should not have access to the functions that are not delegated', function() {
        return expect(this.subject.cocktailPreference).not.toBeDefined();
      });
      return it('should be able to call the functions', function() {
        expect(this.subject.showLicenseTo('bad guy')).toEqual('showing license to kill to bad guy');
        return expect(this.subject.sayGoodMorningTo('afternoon', 'Miss Moneypenny')).toEqual('Good afternoon Miss Moneypenny');
      });
    });
    describe('When preparing a single backbone model with the default ViewModel', function() {
      beforeEach(function() {
        return this.subject = ViewModel.prepare(this.james);
      });
      return it('should return an instance of ViewModel', function() {
        return expect(this.subject.name).toBeDefined();
      });
    });
    describe('When preparing a collection of backbone models with the default ViewModel', function() {
      beforeEach(function() {
        this.evil_spy = new Agent({
          name: 'Dr.',
          lastname: 'Evil',
          license: 'to act like a baby'
        });
        this.agents = [];
        this.agents.push(this.evil_spy);
        this.agents.push(this.james);
        return this.subject = ViewModel.prepare(this.agents);
      });
      it('should return an array', function() {
        return expect(this.subject.length).toEqual(2);
      });
      return it('should contain the viewmodels', function() {
        return expect(this.subject[0].name).toBeDefined();
      });
    });
    return describe('When preparing a single backbone model with a custom ViewModel', function() {
      beforeEach(function() {
        return this.subject = AgentViewModel.prepare(this.james);
      });
      return it('should return an instance of AgentViewModel', function() {
        expect(this.subject.license).toEqual('to kill');
        return expect(this.subject.showLicenseTo('bad guy')).toEqual('showing license to kill to bad guy');
      });
    });
  });

}).call(this);

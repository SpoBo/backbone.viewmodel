Backbone.ViewModel
===

A silly library to easily add a layer of viewlogic to your models.
Similar to the draper gem for ruby.

I chose to write this because I like Spine's way of handling models.
Using get('attribute-name') everywhere in my viewtemplates makes me a little bit sad.

I also feel that viewlogic does not belong on the model. For example determining
what CSS class to use for the model or doing some formatting. It's neat when you
can keep your templates as clean as possible.

Lastly, I could miss the ball completely with this extention. Maybe Backbone doesn't need this at all. User discretion is adviced! If you feel stuff needs to change please contact me or send me a pull request.

How to wield this amazing power?
---
Check the specs for some more details.

Best results when using CoffeeScript.

Here is a sample Model:

```
	class Invoice extends Backbone.Model
	  defaults:
        subject: ''
        amount: 0
        amount_paid: 0

  	  paid: ->
	    @amout <= @amount_paid
```

Here is what the template could look like:

```
  <div class="invoice <%= @css_class() %>">
 		<%= @subject %> - <%= @amount_in_currency() %>
	</div>
```

Here is it's ViewModel:

``````
	class InvoiceViewModel extends Backbone.ViewModel

	  delegate_functions: 'paid'

	  css_class: ->
    	if @paid()
	      'paid'
    	else
	      'unpaid'

	  amount_in_currency: ->
		  I18n.toCurrency(@amount, {precision: 2})
``````

And finally here is how to use said ViewModel for this template:

```
	template = $(@view('invoices/invoice')(new InvoiceViewModel(@model_instance)))
```

How to play?
---

Just copy over the backbone.viewmodel.js file in your lib folder.

How to collaborate?
---

Fork, branch & pull request.

Easiest way I found to compile the coffeescript is to use [jitter](https://github.com/TrevorBurnham/Jitter).

in the root folder: ```jitter lib js spec```



# Feedr Homework

A 5-10 minute presentation including 3 technical hurdles, 2 new things you learned, Q&A.


### 3 Technical hurdles

 1. Struggled with constructors.
	 * Spent hours trying to turn the incoming JSON data into an array for each Key
	 * Realized that I could use jQuery to create variables for each JSON Key, and insert the corresponding Pair into a new DOM element
		 * E.g. `let title = $('<h3>').text(this.title).css('text-transform', 'lowercase');`
 2. Using callbacks did not occur to me until realizing how repetitive my solution was
	 * Ended up using a callback within the `$.Ajax` request, to determine which source to pull from
 3. Deciphering the JSON data
	 * It took awhile to figure out how to dig into nested arrays
	 * NYT Books documentation was a lifesaver


### 2 Things your learned

 1. Using jQuery to construct objects.
 2. jQuery `.append` can be infinitely chained.

<!-- Html Elements for Search -->
<div id="search-container">
<input class="form-control mr-sm-2" type="text" id="search-input" placeholder="Type to search">
<hr/>
<ul id="results-container"></ul>
</div>

<!-- Script pointing to search.js -->
<script src="/learn/assets/js/search.js" type="text/javascript"></script>

<!-- Configuration -->
<script>
SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: '/learn/search.json'
})
</script>
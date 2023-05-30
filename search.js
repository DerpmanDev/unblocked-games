  document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.toLowerCase();
    const links = document.getElementsByClassName('search-results')[0].getElementsByTagName('a');
    let foundResults = false;

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const linkText = link.innerText.toLowerCase();

      if (linkText.includes(query)) {
        link.style.display = 'block';
        foundResults = true;
      } else {
        link.style.display = 'none';
      }
    }

    if (!foundResults) {
      const message = document.getElementById('searchMessage');
      message.innerText = 'No results found.';
      message.style.display = 'block';
    } else {
      const message = document.getElementById('searchMessage');
      message.style.display = 'none';
    }
  });
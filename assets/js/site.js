(function () {
  const root = document.documentElement;
  const storedTheme = window.localStorage.getItem("site-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
    root.classList.add("theme-dark");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const toggleButtons = document.querySelectorAll("[data-theme-toggle]");
    const menuButtons = document.querySelectorAll("[data-menu-toggle]");
    const mobilePanel = document.querySelector("[data-mobile-panel]");
    const searchInputs = document.querySelectorAll("[data-filter-input]");
    const searchPageInput = document.querySelector("[data-search-page-input]");
    const searchResults = document.querySelector("[data-search-results]");
    const taxonomyResults = document.querySelector("[data-taxonomy-results]");

    toggleButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const nextIsDark = !root.classList.contains("theme-dark");
        root.classList.toggle("theme-dark", nextIsDark);
        window.localStorage.setItem("site-theme", nextIsDark ? "dark" : "light");
      });
    });

    menuButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        if (!mobilePanel) {
          return;
        }

        const isOpen = mobilePanel.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(isOpen));
      });
    });

    searchInputs.forEach(function (input) {
      input.addEventListener("input", function () {
        const query = input.value.trim().toLowerCase();
        const items = document.querySelectorAll("[data-filter-item]");

        items.forEach(function (item) {
          const haystack = (item.getAttribute("data-filter-text") || "").toLowerCase();
          item.hidden = query.length > 0 && haystack.indexOf(query) === -1;
        });
      });
    });

    function getIndexUrl(element) {
      return element ? element.getAttribute("data-index-url") : null;
    }

    function normalizeList(value) {
      return Array.isArray(value) ? value.filter(Boolean) : [];
    }

    function matchesQuery(entry, query) {
      if (!query) {
        return true;
      }

      const haystack = [
        entry.title,
        entry.description,
        entry.content,
        normalizeList(entry.categories).join(" "),
        normalizeList(entry.tags).join(" ")
      ].join(" ").toLowerCase();

      return haystack.indexOf(query) !== -1;
    }

    function renderSearchResults(entries, query) {
      if (!searchResults) {
        return;
      }

      const filtered = entries.filter(function (entry) {
        return matchesQuery(entry, query);
      });

      const countMarkup = '<p class="search-results__count">' + filtered.length + ' result' + (filtered.length === 1 ? '' : 's') + (query ? ' for "' + query.replace(/"/g, '&quot;') + '"' : '') + '</p>';

      const itemsMarkup = filtered.map(function (entry) {
        const categories = normalizeList(entry.categories).slice(0, 2);
        const tags = normalizeList(entry.tags).slice(0, 3);
        const chips = categories.concat(tags).map(function (value) {
          return '<span class="chip">' + value + '</span>';
        }).join('');

        return [
          '<article class="search-results__item">',
          '<div class="chip-row">',
          '<span class="chip">' + (entry.type === 'research_project' ? 'Project' : 'Post') + '</span>',
          chips,
          '</div>',
          '<h2 class="search-results__title"><a href="' + entry.url + '">' + entry.title + '</a></h2>',
          '<p class="post-card__summary">' + (entry.description || '') + '</p>',
          '<a class="section-link" href="' + entry.url + '">Open</a>',
          '</article>'
        ].join('');
      }).join('');

      searchResults.innerHTML = '<div class="search-results">' + countMarkup + (itemsMarkup || '<p class="empty-state">No results match your query.</p>') + '</div>';
    }

    function renderTaxonomy(entries) {
      if (!taxonomyResults) {
        return;
      }

      const taxonomyType = taxonomyResults.getAttribute("data-taxonomy-type");
      const groups = {};

      entries.forEach(function (entry) {
        normalizeList(entry[taxonomyType]).forEach(function (value) {
          if (!groups[value]) {
            groups[value] = [];
          }
          groups[value].push(entry);
        });
      });

      const terms = Object.keys(groups).sort(function (left, right) {
        return left.localeCompare(right);
      });

      if (terms.length === 0) {
        taxonomyResults.innerHTML = '<p class="empty-state">No taxonomy terms are available yet.</p>';
        return;
      }

      taxonomyResults.innerHTML = '<div class="taxonomy-results">' + terms.map(function (term) {
        const items = groups[term].map(function (entry) {
          return '<li class="taxonomy-group__item"><a href="' + entry.url + '">' + entry.title + '</a><span class="taxonomy-group__meta">' + (entry.type === 'research_project' ? 'Project' : 'Post') + '</span></li>';
        }).join('');

        return '<section class="taxonomy-group"><h2 class="taxonomy-group__title">' + term + '</h2><ul class="taxonomy-group__list">' + items + '</ul></section>';
      }).join('') + '</div>';
    }

    function loadIndexData(target, callback) {
      const indexUrl = getIndexUrl(target);
      if (!indexUrl) {
        return;
      }

      fetch(indexUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (entries) {
          callback(entries);
        })
        .catch(function () {
          if (searchResults) {
            searchResults.innerHTML = '<p class="empty-state">Search data could not be loaded.</p>';
          }
          if (taxonomyResults) {
            taxonomyResults.innerHTML = '<p class="empty-state">Taxonomy data could not be loaded.</p>';
          }
        });
    }

    if (searchPageInput && searchResults) {
      loadIndexData(searchResults, function (entries) {
        renderSearchResults(entries, "");

        searchPageInput.addEventListener("input", function () {
          renderSearchResults(entries, searchPageInput.value.trim().toLowerCase());
        });
      });
    }

    if (taxonomyResults) {
      loadIndexData(taxonomyResults, function (entries) {
        renderTaxonomy(entries);
      });
    }
  });
})();
const article = {
  id: 1,
  title: "article-item",
  featuredImage: "https://picsum.photos/id/204/536/354?grayscale",
  description: "article image untuk element article",
};

class ArticleItems extends HTMLElement {
  constructor() {
    super();
  }

  set article(article) {
    this._article = article;
    this.render();
  }

  render() {
    this.innerHTML = `
      <img class="featured-image" src="${this._article.featuredImage}" alt="${this._article.title}">
      <div class="article-info">
        <h2><a href="${this._article.id}">${this._article.title}</a></h2>
        <p>${this._article.description}</p>
      </div>
    `;
  }
}

customElements.define("article-item", ArticleItems);

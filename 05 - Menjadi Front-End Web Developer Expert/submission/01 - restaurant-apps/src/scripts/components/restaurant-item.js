class RestaurantItem extends HTMLElement {
  get restaurant() {
    return this._restaurant;
  }

  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="card-image">
                <img src="${this._restaurant.pictureId}" alt="Restaurant Image">
            </div>
                <div class="card-content">
                <h2>Rating: ${this._restaurant.rating}</h2>
                <h3>${this._restaurant.name}</h3>
                <p>${this._restaurant.description}</p>
            </div>
    `;
  }
}

customElements.define("restaurant-item", RestaurantItem);

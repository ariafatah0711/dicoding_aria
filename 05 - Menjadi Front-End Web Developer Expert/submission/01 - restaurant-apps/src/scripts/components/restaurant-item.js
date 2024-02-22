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
    // <li class="card">
    //     <div class="card-image">
    //         <img src=${this.restaurant.pictureId} alt="">
    //     </div>
    //     <div class="card-content" tabindex="0">
    //         <h2>Rating: 4.6</h2>
    //         <h3>Bring Your Phone Cafe</h3>
    //         <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet</p>
    //     </div>
    // </li>
  }
}

customElements.define("restaurant-item", RestaurantItem);

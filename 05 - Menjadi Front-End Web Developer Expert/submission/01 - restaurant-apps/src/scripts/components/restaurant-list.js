import "./restaurant-item.js";

class RestaurantList extends HTMLElement {
  get restaurants() {
    return this._restaurants;
  }

  set restaurants(restaurants) {
    this._restaurants = restaurants;
    this.render();
  }

  render() {
    this.innerHTML = `
        <style>
            restaurant-list {
                // padding: 10px 0;
                display: grid;
                flex-direction: column;
                grid-template-columns: 1fr;
            }
            @media screen and (min-width: 700px) {
                restaurant-list {
                grid-template-columns: repeat(2, 1fr);
                }
                restaurant-list .card-image {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 250px;
                overflow: hidden;
                }
            }
            @media screen and (min-width: 900px) {
                restaurant-list {
                grid-template-columns: repeat(3, 1fr);
                }
                restaurant-list .card-image {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 200px;
                }
            }
            
            restaurant-list .card-image img,
            restaurant-list .card-content {
                width: 100%;
            
            }
            
            restaurant-list restaurant-item {
                padding: 10px 10px;
                /* max-height: 400px; */
                display: grid;
                align-content: flex-start;
                flex-direction: column;
                overflow: hidden;
            
            }
            
            restaurant-list .card-content {
                display: flex;
                flex-direction: column;
            
            }
            
            restaurant-list restaurant-item p {
                font-size: 0.7rem;
                white-space: wrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        </style>
    `;

    this._restaurants.forEach((restaurant) => {
      const restaurantItemElement = document.createElement("restaurant-item");
      restaurantItemElement.restaurant = restaurant;
      restaurantItemElement.tabIndex = 0;

      this.appendChild(restaurantItemElement);
    });
  }
}

customElements.define("restaurant-list", RestaurantList);

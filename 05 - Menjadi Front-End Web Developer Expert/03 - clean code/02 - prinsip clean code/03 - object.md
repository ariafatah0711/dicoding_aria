Gunakan Getters dan Setters
    bad => 
        ```
        class SportCar {
            constructor(maxSpeed) {
                this.maxSpeed = maxSpeed;
            }
        }
        
        const sportCar = new SportCar(320);
        console.log(`SportCar mampu melaju hingga kecepatan: ${sportCar.maxSpeed}km/h`);
        
        /* Output:
        SportCar mampu melaju hingga kecepatan: 320km/h
        */

        class SportCar {
            constructor(maxSpeed, nitro = 100) {
                this.maxSpeed = maxSpeed;
                this.nitro = nitro;
            }
        }
        
        const sportCar = new SportCar(320);
        console.log(`SportCar mampu melaju hingga kecepatan: ${sportCar.maxSpeed + sportCar.nitro}km/h`); // baris kode ini ikut diubah
        
        /* Output:
        SportCar mampu melaju hingga kecepatan: 420km/h
        */
        ```
    good -> 
        ```
        class SportCar {
            constructor(maxSpeed, nitro = 100) {
                this._maxSpeed = maxSpeed;
                this._nitro = nitro;
            }
            
            get maxSpeed() {
                return this._maxSpeed + this._nitro;
            }
        }
    
        const sportCar = new SportCar(320);
        console.log(`SportCar mampu melaju hingga kecepatan: ${sportCar.maxSpeed}km/h`);
        
        /* Output:
        ```
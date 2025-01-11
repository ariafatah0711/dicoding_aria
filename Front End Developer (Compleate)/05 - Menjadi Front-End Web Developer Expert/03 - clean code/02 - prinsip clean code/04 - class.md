Gunakan ES6 Classes daripada ES5 Function

Method Chaining
    bad => 
        ```
        const car = new Car();
        car.setColor('White');
        car.setManufacture('Suzuki');
        car.setModel('Ignis');
        car.save();
        ```
    good => 
        ```
        const car = new Car()
            .setColor('White')
            .setManufacture('Suzuki')
            .setModel('Ignis')
            .save();
        ```
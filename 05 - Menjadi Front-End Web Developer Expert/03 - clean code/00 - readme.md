meinstall eslint
    npm install eslint --save-dev

memasang eslint
    npx eslint --init

    lalu menjawab oertanyaan

mengaudit kode
    "lint": "eslint ./src"

prinsip membuat variable
    niat
        bad => let d; // elapsed time in days
        good => let elapsedTimeInDays;
    
    memiliki arti =>  memberikan nama yang jelas
        bad => const makeCapitalSentance = (array1, array2) => array1.map((item, index) => `${item} is capital of ${array2[index]}`);
        good => const makeCapitalSentance = (capitals, countries) => capitals.map((capital, index) => `${capital} is capital of ${countries[index]}`);

    mudah diucap
        bad => const yyyymmdd = moment().format('YYYY/MM/DD');
        good => const currentDate = moment().format('YYYY/MM/DD');
    
    mudah dicari
        bad =>
            // Nilai apakah 86400000 ini?
            setTimeout(blastOff, 86400000);
        good => 
            // Deklarasikan sebagai constant variabel (gunakan huruf kapital).
            const MILLISECONDS_IN_A_DAY = 86_400_000;
            
            setTimeout(blastOff, MILLISECONDS_IN_A_DAY);
    
    Ekplisit (Avoid Mental Mapping) => hindari menerjemahkan kata menjadi sebuah kata lain walaupun kata tersebut sudah umum digunakan (mental mapping).
        bad =>
            ```
            const locations = ['Jakarta', 'Bandung', 'Surabaya', 'Denpasar', 'Sumbawa'];
 
            locations.forEach((l) => {
            doSomeStuff();
            doSomeOtherStuff();
            
            /*
            ....
            ....
            ....
            ....
            ....
            */
            // tunggu, 'l' itu apa ya?
            dispatch(l);
            });
            ```
        good => 
            ```
            const locations = ['Jakarta', 'Bandung', 'Surabaya', 'Denpasar', 'Sumbawa'];
 
            locations.forEach((location) => {
            doSomeStuff();
            doSomeOtherStuff();
            
            /*
            ....
            ....
            ....
            ....
            ....
            */
            dispatch(location);
            });
            ```
        
    Hindari penambahan kata yang tidak perlu
        bad => 
            ```
            const Car = {
                carMake: 'Honda',
                carModel: 'Accord',
                carColor: 'Blue',
            };
            
            const paintCar = (car) => {
                car.carColor = 'Red';
            };
            ```
        good => 
            ```
            const Car = {
                make: 'Honda',
                model: 'Accord',
                color: 'Blue',
            };
            
            const paintCar = (car) => {
                car.color = 'Red';
            };
            ```
    
    Gunakan default argument
        bad => 
        ```
            const createMicrobrewery = (name) => {
                const breweryName = name || 'Hipster Brew Co.';
                // .....
            };
        ```
        good =>
        ```
        const createMicrobrewery = (name = 'Hipster Brew Co.') => {
            // ......
        };
        ```

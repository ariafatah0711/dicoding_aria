prinsip membuat function dengan baik
    Argumen Fungsi => Memberikan batasan pada jumlah argumen fungsi merupakan hal yang sangat penting.
        Satu atau dua argumen merupakan jumlah yang ideal. Tiga? Sebaiknya hindari jika memungkinkan. Jika lebih dari itu
        bad => 
            ```
                const createMenu = (title, body, buttonText, cancellable) => {
                    // ...
                };
                
                createMenu('Foo', 'Bar', 'Baz', true);
            ```
        good => 
            ```
                const createMenu = ({ title, body, buttonText, cancellable }) => {
                    // ...
                };
                
                createMenu({
                    title: 'Foo',
                    body: 'Bar',
                    buttonText: 'Baz',
                    cancellable: true,
                });
            ```

    Melakukan satu hal =>  Ketika fungsi melakukan banyak hal, fungsi tersebut akan sulit disusun dan diuji. Fungsi yang melakukan banyak hal juga tidak memiliki tujuan yang jelas.
        bad => 
            ```
            function emailClients(clients) {
                clients.forEach((client) => {
                    const clientRecord = database.lookup(client);
                    if (clientRecord.isActive()) {
                    email(client);
                    }
                });
            }
            ```
        good => 
            ```
            function isActiveClient(client) {
                const clientRecord = database.lookup(client);
                return clientRecord.isActive();
            }
            
            function emailActiveClients(clients) {
                clients.filter(isActiveClient).forEach(email);
            }
            ```
    
    Nama fungsi harus merepresentasikan tujuannya
        bad =>
            ```
            const addToDate = (date, month) => {
                // ....
            };
            
            const date = new Date();
            addToDate(date, 1);
            ```
        good => 
            ```
            const addMonthToDate = (month, date) => {
                // ...
            };
            
            const date = new Date();
            addMonthToDate(1, date);
            ```
        
    Fungsi harus memiliki satu tingkatan abstraksi => Ketika fungsi memiliki kode dengan tingkatan abstraksi yang berbeda, hal tersebut berarti fungsi tidak melakukan satu hal. 
        Cobalah untuk memecah kembali fungsi tersebut sehingga fungsi dapat lebih optimal, digunakan kembali (improve reusability), dan mudah untuk testing.
        bad => 
            ```
            function sendNotification(payload) {
                const pushNotificationManager = new PushNotificationManager();
                const tokens = [];
                pushNotificationManager.getClients().forEach((client) => {
                    tokens.push(client.token);
            });
            
            const payloadFormatter = new PayloadFormatter();
            const formattedPayload = payloadFormatter.format(payload);
            
            const notificationBuilder = new NotificationBuilder(formattedPayload, tokens).build();
            notificationBuilder.sendNotification();
            }
            ```
        good => 
            ```
            function tokenize() {
                const pushNotificationManager = new PushNotificationManager();
                const tokens = [];
                
                pushNotificationManager.getClients().forEach((client) => {
                    tokens.push(client.token);
                });
                return tokens;
            }
            
            function formatPayload(payload) {
                const payloadFormatter = new PayloadFormatter();
                return payloadFormatter.format(payload);
            }
            
            function sendNotification(payload) {
                const tokens = tokenize();
                const formattedPayload = formatPayload(payload);
                const notificationBuilder = new NotificationBuilder(formattedPayload, tokens).build();
                
                notificationBuilder.sendNotification();
            }
            ```
        
    Usahakan functional programming daripada imperative programming
        bad => 
            ```
            const albums = [
                {
                    name: '25',
                    singer: 'Adele',
                    sold: 1500000,
                },
                {
                    name: 'Changes',
                    singer: 'Justin Biebier',
                    sold: 700000,
                },
                {
                    name: 'Songs About Jane',
                    singer: 'Maroon 5',
                    sold: 1250000,
                },
                {
                    name: 'Mylo Xyloto',
                    singer: 'Coldplay',
                    sold: 980000,
                },
                ];
                
                const SALES_TARGET = 1000000;
                const greatSingers = [];
                
                for (let i = 0; i < albums.length; i++) {
                if (albums[i].sold > SALES_TARGET) {
                    greatSingers.push(albums[i].singer);
                }
            }
            
            console.log(greatSingers); // -> [Adele, Maroon 5]
            ```
        good => 
            ```
            const albums = [
                {
                    name: '25',
                    singer: 'Adele',
                    sold: 1500000,
                },
                {
                    name: 'Changes',
                    singer: 'Justin Biebier',
                    sold: 700000,
                },
                {
                    name: 'Songs About Jane',
                    singer: 'Maroon 5',
                    sold: 1250000,
                },
                {
                    name: 'Mylo Xyloto',
                    singer: 'Coldplay',
                    sold: 980000,
                },
            ];
            
            const SALES_TARGET = 1000000;
            const greatSingers = albums.filter((album) => album.sold > SALES_TARGET)
                .map((filteredAlbum) => filteredAlbum.singer);
            
            console.log(greatSingers); // -> [Adele, Maroon 5]
            ```
    
    Enkapsulasikan Kondisional => Tak jarang ketika mengevaluasi sebuah kode menggunakan if, kita banyak menetapkan kondisi sehingga penulisan if terlalu panjang.
        bad => 
            ```
            if (response.state === 'loading' && isEmpty(listNode)) {
                // show spinner
            }
            ```
        good => 
            ```
            const shouldShowLoading = (response, listNode) => {
                return response.state === 'loading' && isEmpty(listNode);
            };
            
            if (shouldShowLoading(response, listNode)) {
                // show loading
            } 
            ```
    
    Hindari Negasi Kondisional =>  ketika membuat kondisional sebaiknya hindari negasi atau not. Contohnya seperti berikut ini.
        bad =>
            ```
            const shouldNotShowLoading = (response, listNode) => {
                return response.state !== 'loading' && !isEmpty(listNode);
            };
            
            if (!shouldNotShowLoading(response, listNode)) {
                // show loading
            }
            ```
        good => 
            ```
            const shouldShowLoading = (response, listNode) => {
                return response.state === 'loading' && isEmpty(listNode);
            };
            
            if (shouldShowLoading(response, listNode)) {
                // show loading
            }
            ```
        
    Minimalisir Kondisional => Dalam menuliskan kode, sulit rasanya untuk lepas dari kondisional. Namun,
        sebenarnya pada kasus tertentu kita dapat meminimalisir penggunaan kondisional. Salah satunya dengan mengikuti konsep polymorphism.
        bad => 
            ```
            class Car {
                // ....
                getActualMaxSpeed() {
                    switch (this.type) {
                    case 'sport':
                        return this.maximalSpeed + this.nitrosSpeed;
                    case 'freight':
                        return this.maximalSpeed - this.totalLoad;
                    default:
                        return this.maximalSpeed;
                    }
                }
            }
            ```
        good => 
            ```
            class Car {
                // .....
                getActualMaxSpeed() {
                    return this.maxSpeed;
                }
            }
                
            class SportCar extends Car {
                // ....
                getActualMaxSpeed() {
                    return this.maxSpeed + this.nitrosSpeed;
                }
            }
                
            class FreightCar extends Car {
                // ...
                getActualMaxSpeed() {
                    return this.maxSpeed - this.totalLoad;
                }
            }
            ```

impelemntasi function yang dihindari
    
XHR
```
const xhr = new XMLHttpRequest();
 
xhr.addEventListener('load', () => {
  console.log(this.responseText);
});
 
xhr.open('GET', '<URL_ENDPOINT>');
xhr.send();
```

Fetch Api
```
fetch('<URL_ENDPOINT>')
  .then((response) => response.json())
  .then((data) => console.log(data));
```

axios
```
axios('<URL_ENDPOINT>')
  .then((response) => console.log(response.data));
```

npm install axios@1.x.x

```
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
```

get method
```
axios('<URL_ENDPOINT>');
 
axios({
  url: '<URL_ENDPOINT>',
});
 
axios.get('<URL_ENDPOINT>');

axios({
  method: 'get',
  url: '<URL_ENDPOINT>',
});
 
axios.delete(<URL_ENDPOINT>);
```

base url
```
axios({
  method: 'delete',
  url: '<URL_ENDPOINT>',
  baseUrl: 'http://example.com/api/',
});
 
axios('<URL_ENDPOINT>', {
  baseUrl: 'http://example.com/api/',
});
 
axios.get('<URL_ENDPOINT>', {
  baseUrl: 'http://example.com/api/',
});
```

request params
```
axios({
  url: '/academies/list',
  baseUrl: 'https://www.dicoding.com/',
  params: {
    sc: 'course',
    price: 'free',
  },
});
 
axios.get('<URL_ENDPOINT>', {
  baseUrl: 'http://example.com/api/',
  params: {
    id: 12345,
  },
});
```

request body
```
axios(<URL_ENDPOINT>, {
  method: 'post',
  baseUrl: 'http://example.com/api/',
  data: {
    firstName: 'Nur Rizki',
    lastName: 'Adi Prasetyo',
  },
});
 
axios(<URL_ENDPOINT>, {
  method: 'put',
  baseUrl: 'http://example.com/api/',
  data: {
    username: 'nurrizkiadip',
    password: 'sangatrahasia',
  },
});
```

transform requewst and response (PUT, POST, PATCH, dan DELETE.)
```
axios(<URL_ENDPOINT>, {
  method: 'post',
  baseUrl: 'http://example.com/api/',
  data: {
    firstName: 'Nur Rizki',
    lastName: 'Adi Prasetyo',
  },
 
  transformRequest: [function (data, headers) {
    // Lakukan perubahan data request di sini
    return data;
  }],
 
  transformResponse: [function (data) {
    // Lakukan perubahan data response di sini
    // sebelum data diserahkan ke then/catch
    return data;
  }],
});
```

penanganan error
```
try {
  const response = await axios.get('<URL_ENDPOINT>');
} catch (error) {
  if (error.response) {
    // Request berhasil dikirimkan dan mendapatkan response dari web server.
    // Namun, terjadi error karena status code HTTP berada di luar jangkauan antara 200 hingga 299
    
    // Properti response berisi data error yang didapat dari server
    console.log(error.response);
  } else if (error.request) {
    // Request telah dikirimkan, tetapi tidak mendapatkan response dari server
 
    // Properti request berisi object XMLHttpRequest yang berisi request yang dikirimkan
    console.log(error.request);
  } else {
    // Terjadi suatu kesalahan saat mengirimkan request
    console.log('Error', error.message);
  }
 
  console.log(error);
}
```
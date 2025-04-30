class searchNotes extends HTMLElement{
    constructor(){
      super()
      this._shaddowRoot = this.attachShadow({mode:'open'})
      this._styles = document.createElement('style') 
    }

    _UpdateStyles(){
        this._styles.textContent = `
            .search_section input{
                margin-top: 1rem;
                padding: 0.6rem;
                border: none;
                outline: none;
                width: 10rem;
                border-radius: 15px;
                background-color: white;
                color: grey;
                font-family: 'poppins';
                font-size: 1rem;
                text-align: center;
            }
            
            input#searchNotes::-webkit-input-placeholder{
                color:  rgb(191, 172, 226);
            }
             
            input#searchNotes:-moz-input-placeholder{
                color:  rgb(191, 172, 226);
            }
             
            input#searchNotes:-ms-input-placeholder{
                color:  rgb(191, 172, 226);
            }

            @media screen and (max-width: 768px) {
                form input{
                    width: 100%;
                    box-sizing: border-box;

                }
            }
    `}
    
    connectedCallback(){
        this.render()
    }

    render(){
        const getnotes = () => {
            fetch(`https://notes-api.dicoding.dev/v2/notes`)
              .then((response) => {
              return response.json();
              })
              .then((response) => {  {
                      resultdata(response.data);
                  }
              })
              .catch((error) => {
              this._message.innerHTML = `data failed:` + error;
              })
          }; 
          getnotes()

          const resultdata = (data) =>{ 
            const search = document.querySelector("search-data")._shaddowRoot.querySelector('.formsearch')
            const inputdata = document.querySelector("search-data")._shaddowRoot.querySelector('#searchNotes')
                search.addEventListener('input', (e) => {
                    e.preventDefault();
                    const inputvalue= inputdata.value
                    const resultdata = data.filter(item => item.title.toLowerCase().includes(inputvalue.toLowerCase()));
                    console.log(resultdata)
            })
          }  

        this._UpdateStyles()
        this._shaddowRoot.appendChild(this._styles)
        this._shaddowRoot.innerHTML += `
        <div class="searhdata">
            <div class="search_section">
            <form class="formsearch">
                <input id="searchNotes" type="text" placeholder="search note title...">
            </form>
            <div class="displayData"></div>
                </div>
        </div>
        `
    }
}
customElements.define("search-data", searchNotes)
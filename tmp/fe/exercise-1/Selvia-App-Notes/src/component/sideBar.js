import IconPeople from '../assets/img/people-3.png'
import IconXmark from '../assets/img/circle-xmark-solid.png'
class sideBar extends HTMLElement{
    constructor(){
        super()
        this._shaddowRoot = this.attachShadow({mode:'open'})
        this._styles = document.createElement('style')
    }

    _UpdateStyles(){
        this._styles.textContent = `
        :host{
            display: flex;
            flex-direction: column;
            font-family: 'Poppins';
            height: 100vh;
            justify-content: space-between;
            align-items: center;
            background-color: rgb(100, 92, 187);
            overflow: hidden;
            position: fixed;  
            width: 25%;        
        }
        
        .side-bar-first{
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .side-bar-first h2{
            font-family: 'poppins';

            color: white;
            font-size: 2.5rem;
        }

        .side-bar-first h2:nth-child(2){
            display: none;
        }
        
        .side-bar-first .new-note p{
            font-family: 'calibri';
            font-weight: bold;
            font-size: 1.1rem;
            color: white;
        }
        
        .side-bar-first .new-note-plus{
            display: none;
        }
        .side-bar-first .new-note button{
            padding: 8px;
            border: none;
            background: white;
            border-radius: 15px;
            width: 10rem;
            font-weight: bold;
            cursor: pointer;
            font-family: 'calibri';
            color: rgb(100, 92, 187);
            font-size: 1rem;
        }

        .side-bar-second {
            display: flex;
            justify-content: center;
        }

        .side-bar-second img{
            width: 50%;
        }

        .input_newNotes{
            display: none;
        }

        .input_newNotes.active{
            display: inline-block;
            position: absolute;
            top: 15%;
            background-color: rgb(255, 255, 255, 0.9);
            padding: 1rem 1.8rem;
            border-radius: 2%;
        }

        .input_newNotes h4{
            text-align: center;
            margin-bottom: 1rem;
            color: rgb(100, 92, 187);
        }

        .input_newNotes .input{
            margin-top: 0.8rem;
            font-size: 0.9rem;
            color: rgb(100, 92, 187);
            font-weight: bold;
        }

        .input_newNotes input, .input_newNotes textarea{
            width: 100%;
            font-size: 0.8rem;
            font-family: 'Poppins';
            border: 1px solid rgb(217, 217, 217);
            border-radius: 5px;
            padding: 0.5rem;
            box-sizing: border-box; 
            background-color: rgb(255,255,255);
        }
        
        .input_newNotes button{
            width: 100%;
            border: none;
            padding: 0.5rem;
            border-radius: 1rem;
            cursor: pointer;
            background-color: rgb(100, 92, 187, 0.8);
            color: white;
            font-family: 'Poppins';
            font-weight: bold;
        }

        .input_newNotes .buttonForm{
            display: flex;
            justify-content: space-between;
        }

        .formNewNotes{
            display: flex;
            justify-content: center;
            position: relative;
        }

        .formNewNotes.active-bg{
            background-color: rgba(0, 0, 0, 0.5);
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
        }

        .formNewNotes.active-bg{
            background-color: rgba(0, 0, 0, 0.5);
            position: fixed;
        }

        .xmark img{
            display: inline-block;
            position: absolute;
            top: -10px;
            right: -10px;
            width: 2rem;
            cursor: pointer;
        }
        
        
        @media screen and (max-width: 768px) {
            :host{
                height: 4rem;
                width: 100%;
                top: 50%
                position: fixed;   
            }

            .side-bar-first h2{
                margin-block-start: 0.3rem;
                margin-block-end: 0;
            }

            .side-bar-first {
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                width: 100%; 
            }

            .side-bar-first h2:nth-child(2){
                display: inline-block;
                cursor: pointer;
            }

            .side-bar-first .new-note, .side-bar-second{
                display: none;
            }

            .input_newNotes{
                position: fixed;
                top: 4.5rem;
            }
        }
    `}
    
    connectedCallback(){
        this.render()

        this._shaddowRoot.querySelector(".btn-new-note").addEventListener("click", function () {
            document.querySelector("side-bar")._shaddowRoot.querySelector('#inputNewNotes').classList.toggle('active');
            document.querySelector("side-bar")._shaddowRoot.querySelector('.formNewNotes').classList.toggle('active-bg');
        })

        this._shaddowRoot.querySelector(".btn-plus").addEventListener("click", function () {
            document.querySelector("side-bar")._shaddowRoot.querySelector('#inputNewNotes').classList.toggle('active');
            document.querySelector("side-bar")._shaddowRoot.querySelector('.formNewNotes').classList.toggle('active-bg');
        })

        this._shaddowRoot.querySelector(".xmark").addEventListener("click", function () {
            document.querySelector("side-bar")._shaddowRoot.querySelector('#inputNewNotes').classList.remove("active");
            document.querySelector("side-bar")._shaddowRoot.querySelector('.formNewNotes').classList.remove("active-bg");
        })

        const form = document.querySelector("side-bar")._shaddowRoot.querySelector("#inputNote");      
        const inputTitle = document.querySelector("side-bar")._shaddowRoot.querySelector(".title");   
        const inputbody = document.querySelector("side-bar")._shaddowRoot.querySelector(".body");   

        form.addEventListener('submit', function (e) {
            e.preventDefault()
            const notes = {
            title: inputTitle.value,
            body: inputbody.value,
            };

            insertBook(notes);
        });
 
        const insertBook = (note) => {
            console.log(note)
            fetch(`https://notes-api.dicoding.dev/v2/notes`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(note),
              })
              .then((response) => {
                return response.json();
              })
              .then((responseJson) => {
                window.location.reload();
                return responseJson;
              })
              .catch((e) => {
                showResponseMessage(e)
              });
          };  

          const showResponseMessage = (message = 'Check your internet connection') => {
            alert(message);
          };
          
    }

    render(){
        this._UpdateStyles()
        this._shaddowRoot.appendChild(this._styles)
        this._shaddowRoot.innerHTML += `
        <div class="side-bar-first">
            <h2>.Notes.</h2>
            <h2 class="btn-plus">+</h2>
            <div class="new-note" >
               <p>create a new note!</p>
                <button class="btn-new-note">+new note</button>
            </div>
        </div>
        
        <div class="formNewNotes">
            <div id="inputNewNotes" class="input_newNotes">
                <div class="xmark"><img src="${IconXmark}" alt=""></div>
                <h4 id="input_notes">Masukan Catatan Baru</h4>
                    <form id="inputNote">
                        <div class="input">
                        <input class="id" name="id" type="text" placeholder="Id.." hidden> 
                        </div>  

                        <div class="input">
                        <label for="inputtitle">Judul</label> <br>
                            <input
                            type="text"
                            id="title"
                            class="title"
                            name="inputtitle"
                            required
                            maxlength="35"
                            autocomplete="off"
                            placeholder="Judul.."
                        />
                        </div>

                        <div class="input">
                            <label for="inputbody">Isi Catatan</label><br>
                        <textarea  placeholder="ketik catatan.." placeholder="catatan.." class="body" name="body" id="inputbody" cols="30" rows="10"></textarea>
                        </div>
                        
                        <div class="buttonForm">
                            <button class="bookSubmit" type="submit">Simpan</button>
                            </div>
                    </form>
            </div>
        </div>

        <div class="side-bar-second">
                <img src="${IconPeople}" alt="">
        </div>
        ` 
          
    }
}
customElements.define("side-bar", sideBar)
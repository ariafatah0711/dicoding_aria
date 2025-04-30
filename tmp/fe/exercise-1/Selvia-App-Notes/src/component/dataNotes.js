import iconTrash from "../assets/img/trash-solid.png";
import iconSpinner from "../assets/img/spinner-solid.png";
class dataNotes extends HTMLElement {
  constructor() {
    super();
    this._shaddowRoot = this.attachShadow({ mode: "open" });
    this._styles = document.createElement("style");

    this._shaddowRoot.innerHTML = `
        <div class="info" hidden >nothing notes</div>
        <img class="loader" src="${iconSpinner}">
        `;
    this._loader = this._shaddowRoot.querySelector("img.loader");
    this._info = this._shaddowRoot.querySelector(".info");
  }

  _UpdateStyles() {
    this._styles.textContent = `
        :host{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            grid-gap: 1rem;
        }  

        .notes{
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 1.5rem;
            background-color: rgb(247, 250, 253);
            border-radius: 1rem;
            box-shadow: 0.2px 0.2px 8px 2px rgb(224, 224, 224); 
            font-family: 'Poppins';
            gap: 15px;
        }
        
        .notes .title{
          font-size: 1.3rem;
          font-weight: bold;
          color: rgb(100, 92, 187);
        }

        .notes .body{
            font-size: 0.8rem;
            color: rgb(100, 92, 187);
          }
        
        .notes .underNotes{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .notes .underNotes .time{
            font-size: 0.8rem;
            // color: rgb(160, 132, 220);
            color: grey;
        }
        
        .notes .underNotes .feature{
            display: flex;
            gap: 0.3rem;
        }
        
        .notes .underNotes .feature .featureIcon{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 2rem;
            height: 2rem;
            border-radius: 25px;
            cursor: pointer;
        }
        
        .notes .underNotes .feature .featureIcon.delete{
          background-color: rgb(191, 172, 226);
        }
        
        .notes .underNotes .feature .featureIcon.edit{
            background-color: rgb(235, 199, 230);
        }
        
        .notes .underNotes .feature img{
            width: 1rem;
            height: 1rem;
        }

        img.loader{
            width: 5%;
            position: absolute;
            top: 50%;
            bottom: 50%;
            left: 50%;
            animation: spinner 3s infinite;
        }
        
        @keyframes spinner {
            100% {transform: rotate(360deg);}
          }
        
    `;
  }

  connectedCallback() {
    this.render();
  }

  removenotes(noteId) {
    fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        window.location.reload();
        return response.json();
      })
      .catch((error) => {
        this._message.innerHTML = `error:` + error;
      });
  }

  render() {
    const getnotes = () => {
      this._loader.style.display = "block";
      fetch(`https://notes-api.dicoding.dev/v2/notes`)
        .then((response) => {
          return new Promise((resolve) =>
            setTimeout(() => {
              resolve(response);
              this._loader.style.display = "none";
            }, 3000)
          );
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response.error) {
            response.message(showResponseMessage);
          } else if (response.data.length === 0) {
            this._info.removeAttribute("hidden");
          } else if (response.data.length > 0) {
            templateCharItem(response.data);
          }
        })
        .catch((error) => {
          this._message.innerHTML = `data failed:` + error;
        });
    };
    getnotes();

    const showResponseMessage = (message = "Check your internet connection") => {
      alert(message);
    };

    this._UpdateStyles();
    this._shaddowRoot.appendChild(this._styles);
    const templateCharItem = (notesData) => {
      notesData.forEach((notes) => {
        this._shaddowRoot.innerHTML += `
            <div class="notes" >
               <div>
                    <div class="title">${notes.title}</div>
                    <div class="body">${notes.body}</div>
                </div>

                <div class="underNotes">
                    <div class="time"> ${notes.createdAt.substring(0, 10)} |  ${notes.createdAt.substring(11, 16)} WIB</div>
                    <div class="feature">
                        <div class="featureIcon delete">
                            <img class="btnDelete" src="${iconTrash}" alt="">
                        </div>
                    </div>
                </div>
            </div>
            `;

        this._shaddowRoot.querySelectorAll(".btnDelete").forEach((button) => {
          button.addEventListener("click", () => this.removenotes(notes.id));
        });
        this._shaddowRoot.querySelectorAll(".btnEdit").forEach((button) => {
          button.addEventListener("click", () => this.editnotes(notes.id, notes.title, notes.body));
        });
      });
    };
  }
}
customElements.define("data-notes", dataNotes);

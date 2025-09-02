// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. 
// Aquí deberás desarrollar la lógica para resolver el problema.

    const listaAmigos = [];

// Función que agrega los nombres de las personas e una lista
    function agregarAmigo(){

        let nombre = document.getElementById('amigo').value.trim();;

        // Verificamos que el texto ingresado corresponde a un nombre válido
        if(validarStringAmigo(nombre)){
            
            console.log(verificaExisteNombre(nombre));

            if(verificaExisteNombre(nombre)){
                listaAmigos.push(nombre);
                enviarMensajeUsuario('h2',`Digite el nombre del siguiente amigo`);
            }
        
            // Limpia la última entrada de la caja "Input" del HTML
            limpiarCaja();

            // muestra la lista de amigos actualizada en la pantalla
            mostrarListaEnHTML(listaAmigos);


        }
        
            
    }
   
 
     

// Función de determina el nombre de la persona que será el amigo secreto  
    function sortearAmigo(){

    }

// Verifica que el nombre ingresado ya existe en la lista de amigos (evita repetir nombre)
    function verificaExisteNombre(nuevoNombre) {
        if (listaAmigos.includes(nuevoNombre)) {
            enviarMensajeUsuario('h2',elegirMensajeError(4));
            return false;
        } else {
            return true;
        }
        
    }




// Verifica que el string ingresado como nombre de amigo sea válido. Se aceptan letras, acentos y espacios 
    function validarStringAmigo(textoString) {

        // Validar que no esté vacío
        if (textoString === '') {
            enviarMensajeUsuario('h2', elegirMensajeError(0));  // Error (0): El campo está vacío. Por favor, ingrese un nombre
            return false;
        }

        // Validar que solo contenga letras (incluyendo acentos) y espacios
        const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
        
        if (!regex.test(textoString)) {
            
            // Detectar qué tipo de caracteres inválidos contiene
            enviarMensajeUsuario('h2', elegirMensajeError(1));   // Error (1): Solo se permiten letras y espacios
            
            if (/\d/.test(textoString)) {
                enviarMensajeUsuario('h2', elegirMensajeError(2));   // Error (2): No se permiten números

            } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(textoString)) {
                enviarMensajeUsuario('h2', elegirMensajeError(3));   // Error (3): No se permiten símbolos especiales
            }
            
            return false;
         }

         return textoString;
    }   
         

// Función auxiliar para cambiar el texto al elemento <h2>
    function enviarMensajeUsuario(elemento,texto){

        let elementoHTML = document.querySelector(elemento);
        elementoHTML.innerHTML = texto;
        return;
    }

// Función auxiliar para seleccionar de la lista el mensaje correspondiente según el tipo de acción que realiza el usuario
    function elegirMensajeError(indice) {
       /*
        let listaMensajes = [{id: "error", mensaje: "Error (0): El campo está vacío. Por favor, ingrese un nombre"}, 
                             {id: "error", mensaje: "Error (1): Solo se permiten letras y espacios"},
                             {id: "error", mensaje: "Error (2): No se permiten números"},
                             {id: "error", mensaje: "Error (3): No se permiten símbolos especiales"}
                            ];
        */
        
        let listaMensajes = ["Error (0): El campo está vacío. Por favor, ingrese un nombre", 
                             "Error (1): Solo se permiten letras y espacios",
                             "Error (2): No se permiten números",
                             "Error (3): No se permiten símbolos especiales",
                             "Error (4): El nombre ingresado ya existe"
                           ];

        return listaMensajes[indice];
    }


// Función auxiliar para limpiar la última entrada de la caja (Input)
    function limpiarCaja() {
    
        document.querySelector('#amigo').value = ''; 

    }


// Función para mostrar la lista de amigos en la pantalla
    function mostrarListaEnHTML(listaAmigos) {
        const ulElement = document.getElementById('listaAmigos');
        
        // Limpiar lista existente
        ulElement.innerHTML = '';
        
        // Agregar cada amigo como <li>
            listaAmigos.forEach(amigo => {
            const li = document.createElement('li');
            li.textContent = amigo;
            li.className = 'name-list';
            li.setAttribute('role', 'listitem');
            ulElement.appendChild(li);
        });
    }
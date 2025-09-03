// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. 
// Aquí deberás desarrollar la lógica para resolver el problema.

    const listaAmigos = [];
    let flagSortear = 0;
    let flagMinimoAmigos = false;


// Función que agrega los nombres de las personas e una lista
    function agregarAmigo(){

        let nombre = document.getElementById('amigo').value.trim();;

        // Verifica que el texto ingresado corresponde a un nombre válido
        if(validarStringAmigo(nombre)){
            
            // Verifica si el nombre ya existe en la lista
            if(verificaExisteNombre(nombre)){
                listaAmigos.push(nombre);
                enviarMensajeUsuario('h2',`Digite el nombre del siguiente amigo`);
            }
        
            // Limpia la última entrada de la caja "Input" del HTML
            limpiarCaja();

            // Muestra la lista de amigos actualizada en la pantalla
            mostrarListaEnHTML(listaAmigos,true);

        }                    
    }
       

// Función de determina el nombre de la persona que será el amigo secreto  
    function sortearAmigo(){
        // Verifica que existan 3 amigos como mínimo para iniciar el sorteo de amigos   
        if (listaAmigos.length < 3 && flagMinimoAmigos == false){
            alert('Necesitamos un mínimo de 3 amigos para iniciar el sorteo'); 
            return null;  

        } else {
            
            // Verifica si aún hay amigos en la lista para volver a sortear
            if (listaAmigos.length === 0) {     
                alert('Ups! Creo que no hay nombres en la lista de amigos');     
                return null; 

            } else {
                flagMinimoAmigos = true;

                // Confirma que el usuario desea iniciar el sorteo de amigo secreto
                if (flagSortear == 0){
                    confirmaSortear();

                } else {
                    // Oculta lista de amigos creada
                    mostrarListaEnHTML(listaAmigos,false);
                    
                    // Elige índice aleatorio para determinar el amigo sorteado
                    let indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
                    
                    // Obtiene el nombre del amigo sorteado
                    let nombreAmigoElegido = listaAmigos[indiceAleatorio];
                    
                    // Elimina el nombre sorteado de la lista de amigos
                    listaAmigos.splice(indiceAleatorio, 1);

                    // Muestra en pantalla el nombre del amigo sorteado y la lista de amigos actualizada
                    enviarMensajeUsuario('#resultado',`Felicitades! Tu amigo secreto es: ${nombreAmigoElegido}`);
                    
                    // Muestra en pantalla la cantidad de amigos que quedan por sortear
                    if (listaAmigos.length === 0){
                        enviarMensajeUsuario('h2','El sorteo ha finalizado. [F5] para reiniar');
                    } else {
                        enviarMensajeUsuario('h2',`Vamos! aún ${(listaAmigos.length === 1) ? 'queda' : 'quedan'} ${listaAmigos.length} ${(listaAmigos.length === 1) ? 'amigo' : 'amigos'} por sortear`);
                    }
                    
                }
            }
        }   
    }


// Función auxiliar para que el usuario confirme que lista de amigos esta completa antes de comenzar a sortear

    function confirmaSortear() {     
        let confirmacion = confirm('¿Quiere iniciar el sorteo del amigo secreto? Ya no se podrán ingresar más amigos'); 
        
        if(confirmacion){
            flagSortear = 1; 
            document.getElementById('anadir').disabled = true;
            enviarMensajeUsuario('h2','Presione "Sortear amigo" para comenzar');
            return confirmacion;
 
        } else {
            flagSortear = 0;
            return confirmacion;
        }
    
    }


// Función que verifica si el nombre ingresado ya existe en la lista de amigos (evita repetir nombre)
    function verificaExisteNombre(nuevoNombre) {
        if (listaAmigos.includes(nuevoNombre)) {
            enviarMensajeUsuario('h2',elegirMensajeError(4));   // Error (4): El nombre ingresado ya existe
            return false;
        } else {
            return true;
        }
        
    }


// Función que verifica que el string ingresado como nombre de amigo sea válido. Se aceptan letras, acentos y espacios 
    function validarStringAmigo(textoString) {
        // Valida que el string no esté vacío
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
        let listaMensajes = ["Error (0): El campo está vacío. Por favor, ingrese un nombre", 
                             "Error (1): Solo se permiten letras y espacios",
                             "Error (2): No se permiten números",
                             "Error (3): No se permiten símbolos especiales",
                             "Error (4): El nombre ingresado ya existe",
                           ];

        return listaMensajes[indice];
    }


// Función para mostrar la lista de amigos en la pantalla
    function mostrarListaEnHTML(listaAmigos,mostrar) {
        const ulElement = document.getElementById('listaAmigos');
        
        if (mostrar){
            // Limpia lista existente
            ulElement.innerHTML = '';
            
            // Agrega cada amigo como <li>
            listaAmigos.forEach(amigo => {
            const li = document.createElement('li');
            li.textContent = amigo;
            li.className = 'name-list';
            li.setAttribute('role', 'listitem');
            ulElement.appendChild(li);
            });
        } else {
            // Limpia lista existente
            ulElement.innerHTML = '';
        }

    }


// Función auxiliar para limpiar la última entrada de la caja (Input)
    function limpiarCaja() {  
        document.querySelector('#amigo').value = ''; 

    }
    
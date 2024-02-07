 import "./Navbar.style.css"

 const Navbar = ({handleChange,handleSubmit}) => { 
  return ( // utilizo a mis funciones en mi form y mi button
    <div className="searchbar"> 
        <form onChange= {handleChange} className="formulario"> {/*  Este evento se dispara cuando el contenido del formulario cambia,cuando el usuario escribe en el campo de búsqueda */}
            <input placeholder="Busqueda" type="search" className="campo"/>
            <button onClick= {handleSubmit} className="boton">Bucar</button>{/* handleSubmit: Despacha la acción getByName con la searchString actual cuando el usuario envía el formulario de búsqueda. */}
        </form>
    </div>
  )

} 

export default Navbar 

 



/* Dentro de este contenedor, hay un formulario (<form>) que escucha el evento onChange y ejecuta la función handleChange cuando hay cambios en el formulario. Esto sugiere que la función handleChange maneja la actualización del estado del componente en respuesta a cambios en el formulario de búsqueda.
Dentro del formulario, hay un campo de entrada (<input>) de tipo "search" con un marcador de posición (placeholder) que dice "Busqueda". Este campo de entrada permite al usuario escribir su consulta de búsqueda.
También dentro del formulario, hay un botón (<button>) con el texto "Buscar". Este botón ejecuta la función handleSubmit cuando se hace clic. La función handleSubmit se utiliza para enviar la consulta de búsqueda o realizar alguna acción relacionada con la búsqueda. 
*/
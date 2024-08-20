import { TbBrandNetflix } from "react-icons/tb";

const NotFound = () => {
  return (
    <div style={{textAlign:'center'}}>
        <h1 style={{color: 'white', padding:"1em", fontSize:'5em'}}>
          Eieiei! ta tudo bem?</h1>
        <p style={{color: 'white', padding:"1em", fontSize:'3em'}}>
          404 - Essa pagina que o você entrou não existe!</p>
          <TbBrandNetflix color="white" size={300}/><br/>
        <a href='/' style={{textDecoration:"none", color:'white', fontSize:'2em'}}>Clique aqui para voltar a pagina inicial!</a>

    </div>
  )
}

export default NotFound

import Menu from "../Menu/index"
function Inicial() {
    return (
        <>
         <Menu />
         <div className="container">
            <form>
                <div className="form-group col-6">
                    <label>Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group col-6">
                    <label>Senha</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="mt-3">
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                
            </form>


        </div>

        </>
       
        
    )
}
export default Inicial
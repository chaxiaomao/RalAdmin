import React from 'react';

function LoginPage() {
    return (

        <div className="column is-4">
            <article className="message is-info">
                <div className="message-header ">
                    <h2>Editar Usuario</h2>
                </div>
                <div className="message-body field">
                    <form action="">
                        <div className="columns">
                            <div className="column">
                                <label htmlFor="nombre" className="label">Nombre: </label>
                                <div className="control">
                                    <input type="text" className="input" placeholder="Nombre completo"/>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <label htmlFor="usuario" className="label">Usuario: </label>
                                <div className="control has-icons-left">
                                    <input type="text" className="input"/>
                                    <span className="icon is-small is-left">
								 <i className="fa fa-user"></i>
							  </span>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Contraseña</label>
                                    <div className="control has-icons-right has-icons-left">
                                        <input className="input" type="password" id="pass"/>
                                        <span className="icon is-small is-left">
							      <i className="fa fa-refresh"></i>
							    </span>
                                        <span className="icon is-small is-right">
							      <i className="fa fa-eye" id="show-pass"></i>
							    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <label htmlFor="email" className="label">Email: </label>
                                <div className="control">
                                    <input type="email" className="input" placeholder="Correo electrónico"/>
                                </div>
                            </div>
                            <div className="column">
                                <label htmlFor="tel" className="label">Teléfono: </label>
                                <div className="control">
                                    <input type="tel" className="input"/>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <label htmlFor="hInicio" className="label">Hora de Llegada: </label>
                                <div className="control">
                                    <input type="text" className="input" placeholder="00:00:00"/>
                                </div>
                            </div>
                            <div className="column">
                                <label htmlFor="hFinal" className="label">Hora de Salida: </label>
                                <div className="control">
                                    <input type="text" className="input" placeholder="00:00:00"/>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <label htmlFor="fechaExp" className="label">Fecha de Expiración: </label>
                                <div className="control">
                                    <input type="date" className="input" placeholder="aaaa-mm-dd"/>
                                </div>
                            </div>
                            <div className="column">
                                <label htmlFor="perfil" className="label">Perfil (Vista): </label>
                                <div className="control has-icons-left">
                                    <div className="select"><select>
                                        <option>Usuario</option>
                                        <option>With options</option>
                                    </select></div>
                                    <div className="icon is-small is-left">
                                        <i className="fa fa-user"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <label htmlFor="acceso" className="label">Días de acceso: </label>
                                <div className="control">
                                    <input type="checkbox" name="domingo" value="Domingo"/> Domingo<br/>
                                    <input type="checkbox" name="lunes" value="Lunes"/> Lunes<br/>
                                    <input type="checkbox" name="martes" value="Martes"/> Martes<br/>
                                    <input type="checkbox" name="miercoles" value="Miercoles"/> Miércoles<br/>
                                    <input type="checkbox" name="jueves" value="Jueves"/> Jueves<br/>
                                    <input type="checkbox" name="viernes"
                                           value="Viernes"/> Viernes<br/>
                                    <input type="checkbox" name="sabado"
                                           value="Sabado"/> Sábado<br/>
                                </div>
                            </div>
                        </div>
                        <a href="#" className="button is-info" id="save">
					  <span className="icon">
						  <i className="fa fa-save"></i>
					  </span>
                            <span>Guardar</span>
                        </a>
                    </form>
                </div>
            </article>
        </div>
)
}

export default LoginPage;
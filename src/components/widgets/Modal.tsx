

function model() {
    return (
        <div id="modal-ter" className="modal">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Modal title</p>
                    <button className="delete"></button>
                </header>
                <section className="modal-card-body">
                    xxx
                </section>
                <footer className="modal-card-foot">
                    <a href='#' className="button is-success">Save changes</a>
                    <a href='#' className="button">Cancel</a>
                </footer>
            </div>
        </div>
    );
}

export default model;
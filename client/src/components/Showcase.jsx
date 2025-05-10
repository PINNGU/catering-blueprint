import "./Showcase.css"

function Showcase(){
    const showcaseItems = [];
    return(
        <div className="showcase">
            <h2>Nešto sa današnjeg menija...</h2>
            <div className="sneakpeak">
                    {showcaseItems.length === 0 ? (  
                    <p>Trenutno nismo otvoreni 😢. Svratite posle!</p>
                        ) : (
                    <ul>
                    {showcaseItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                    </ul>
                )}
            </div>
            <h3><a href="#">..ili pogledajte celi meni.</a></h3>
        </div>

        

    )
}

export default Showcase;
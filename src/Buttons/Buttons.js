import "./Buttons.css";

function Buttons(props) {

    const numPages = Math.ceil(props.countries.length / props.resultsPerPage);

    if(props.pageNumber === 1 && numPages > 1) {
        return (
            <div className="button-container">
                    
                <button className={props.theme === "light" ? "btn btn-previous btn-hidden" : "btn btn-previous btn-dark btn-hidden"} data-goto={props.pageNumber-1} onClick={props.pageChange}>
                &larr; Previous Page
                </button>

                <button className={props.theme === "light" ? "btn btn-next" : "btn btn-next btn-dark"} data-goto={props.pageNumber+1} onClick={props.pageChange}>
                Next Page &rarr;
                </button>
                
            </div>
        );

    } else if (props.pageNumber === 1 && numPages === 1) {
        return '';
    } else if (props.pageNumber === numPages) {

        return(

        <div className="button-container">
                    
            <button className={props.theme === "light" ? "btn btn-previous" : "btn btn-previous btn-dark"} data-goto={props.pageNumber-1} onClick={props.pageChange}>
            &larr; Previous Page
            </button>

            <button className={props.theme === "light" ? "btn btn-next btn-hidden" : "btn btn-next btn-dark btn-hidden"} data-goto={props.pageNumber+1} onClick={props.pageChange}>
            Next Page &rarr;
            </button>
            
        </div>

        );

    } else if (props.pageNumber < numPages) {

        return(

        <div className="button-container">
                        
            <button className={props.theme === "light" ? "btn btn-previous" : "btn btn-previous btn-dark"} data-goto={props.pageNumber-1} onClick={props.pageChange}>
            &larr; Previous Page
            </button>

            <button className={props.theme === "light" ? "btn btn-next" : "btn btn-next btn-dark"} data-goto={props.pageNumber+1} onClick={props.pageChange}>
            Next Page &rarr;
            </button>
            
        </div>
        );

    }

    return('');

}

export default Buttons;

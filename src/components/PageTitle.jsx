import './PageTitle.css'

export function PageTitle(props){
    return (
        <>
            <div className="page-title">
                <h1>{props.title}</h1>
            </div>
        </>
    )
}
import React,{Fragment} from 'react'
import { Spinner } from 'reactstrap';

const FormSpinner = ({color,size}) => {
    return (
        <Fragment>
            <Spinner size={size} color={color} />
        </Fragment>
    )
}




FormSpinner.defaultProps = {

        color: "dark",
        size:"sm"
}

export default FormSpinner

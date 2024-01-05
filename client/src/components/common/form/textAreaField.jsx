import React from 'react'
import PropTypes from 'prop-types'

const TextAreaField = ({ label, type, name, value, rows, onChange, error }) => {
    // const [showPassword, setShowPassword] = useState(false)
    //
    // const toggleShowPassword = () => {
    //     setShowPassword((prevState) => !prevState)
    // }

    const handleChange = ({ target }) => {
        // console.log('target', target)
        // console.log('target.name', target.name)
        // console.log('target.value', target.value)
        onChange({ name: target.name, value: target.value })
    }

    const getInputClasses = () => {
        return 'form-control mb-3 mt-2' + (error ? ' is-invalid' : '')
    }
    return (
        <div className='mb-4'>
            {/* <label htmlFor={name}>{label}</label>*/}
            <div className='form-group has-validation'>
                {/* <div className="form-group">*/}
                <label htmlFor="comment">{label}</label>
                <textarea
                    className={getInputClasses()}
                    id={name}
                    rows={rows}
                    name={name}
                    value={value}
                    onChange={handleChange}
                >
                </textarea>
                {error && <div className='invalid-feedback'>{error}</div>}
                {/* </div>*/}
                {/* <input*/}
                {/*    type={showPassword ? 'text' : type}*/}
                {/*    id={name}*/}
                {/*    name={name}*/}
                {/*    value={value}*/}
                {/*    // onChange={onChange}*/}
                {/*    onChange={handleChange}*/}
                {/*    className={getInputClasses()}*/}
                {/*    placeholder={(type === 'search') ? 'Search...' : ''}*/}
                {/* />*/}
                {/* {type === 'password' &&*/}
                {/*    <button className='btn btn-outline-secondary' type='button'*/}
                {/*            onClick={toggleShowPassword}*/}
                {/*    >*/}
                {/*        <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>*/}
                {/*    </button>*/}
                {/* }*/}
            </div>
        </div>
    )
}

TextAreaField.defaultProps = {
    type: 'text'
}

TextAreaField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    rows: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
}

export default TextAreaField

import React from 'react'
import PropTypes, { node } from 'prop-types'

const CheckBoxField = ({ name, label, onChange, value, children, error }) => {
    const handleChange = () => {
        onChange({ name, value: !value })
    }
    // console.log('error', error)

    const getInputClasses = () => {
        return 'form-check-input' + (error ? ' is-invalid' : '')
    }

    return (
        <div className="form-check mb-4">
            <input className={getInputClasses()} type="checkbox" value="" id={name} onChange={handleChange} checked={value} />
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
            { error && <div className="invalid-feedback">
                { error }
            </div>}
        </div>)
}

CheckBoxField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.arrayOf(node), PropTypes.node]),
    error: PropTypes.string
}

export default CheckBoxField

import React from 'react'
import PropTypes from 'prop-types'

const RadioField = ({ options, name, onChange, value, label }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value })
    }
    return (
        <div className='mb-4'>
            <label className="form-label">{label}</label>
            <div>
                {options.map(option => {
                    return (
                        <div key={option.name + '_' + option.value} className="form-check form-check-inline">
                            <input
                                className='form-check-input'
                                type='radio'
                                name={name}
                                id={option.name + '_' + option.value}
                                checked={option.value === value}
                                value={option.value}
                                // onChange={onChange}
                                onChange={handleChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={option.name + '_' + option.value}
                            >
                                {option.name}
                            </label>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

RadioField.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string
}

export default RadioField

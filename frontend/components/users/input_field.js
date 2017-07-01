import React from 'react';


const InputField = ({fieldId, attribute, emptyFieldInstructions, focused, updateFocusedElement, update, tabIndex}) => {
	
	if(focused){
		return <div className="input-container">
					 		<input  autoFocus 
											value={attribute} 
											onChange={update(fieldId)} 
											id={fieldId} 
											className="profile-input-field" 
											tabIndex={tabIndex}
											type="text"/>
							<i className="fa fa-times" aria-hidden="true" style={{float: "right", fontSize: "14px", verticalAlign:"top"}} onClick={update(fieldId)}></i>
					 </div>
	} else {
		if(attribute){
			return <p tabIndex={tabIndex} onFocus={updateFocusedElement} onClick={updateFocusedElement} id={fieldId}>{attribute}</p>;
		} else {
			return <p tabIndex={tabIndex} onFocus={updateFocusedElement} onClick={updateFocusedElement} id={fieldId} className="unfilled">{emptyFieldInstructions}</p>;
		} 
	}
}

export default InputField;